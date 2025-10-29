import React, { createContext, useContext, useEffect, useState } from "react";
import { openDB } from "idb";

const DB_NAME = "sast-chat";
const STORE_NAME = "messages";
const DB_VERSION = 1;
const MAX_STORE_ITEMS = 20;
const SEND_HISTORY_COUNT = 10;

const MessagesContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useMessages = () => useContext(MessagesContext);

export const MessagesProvider = ({ children }) => {
  const [dbPromise, setDbPromise] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const init = async () => {
      const db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(upgradeDb) {
          if (!upgradeDb.objectStoreNames.contains(STORE_NAME)) {
            upgradeDb.createObjectStore(STORE_NAME, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        },
      });
      setDbPromise(db);
      const all = await db.getAll(STORE_NAME);
      all.sort((a, b) => (a.id || 0) - (b.id || 0));
      setMessages(all);
    };
    init();
  }, []);

  // helper: trim DB to MAX_STORE_ITEMS
  const trimStoreIfNeeded = async (db) => {
    const all = await db.getAll(STORE_NAME);
    if (all.length <= MAX_STORE_ITEMS) return;
    all.sort((a, b) => (a.id || 0) - (b.id || 0));
    const toRemove = all.slice(0, all.length - MAX_STORE_ITEMS);
    for (const item of toRemove) {
      await db.delete(STORE_NAME, item.id);
    }
  };

  const loadHistory = async () => {
    if (!dbPromise) return;
    const all = await dbPromise.getAll(STORE_NAME);
    all.sort((a, b) => (a.id || 0) - (b.id || 0));
    setMessages(all);
    return all;
  };

  // add a single message object { role, parts: [{ text }] }
  const addMessage = async (messageObj) => {
    if (!dbPromise) return;
    const entry = { ...messageObj, createdAt: Date.now() };
    await dbPromise.add(STORE_NAME, entry);
    await trimStoreIfNeeded(dbPromise);
    await loadHistory();
  };

  // send user message to backend; history contains last SEND_HISTORY_COUNT messages (most recent first -> oldest)
  const sendMessage = async (userText) => {
    if (!dbPromise) throw new Error("DB not initialized");
    const userMsg = { role: "user", parts: [{ text: userText }] };

    // store user message locally first
    await addMessage(userMsg);

    // prepare history to send: last SEND_HISTORY_COUNT messages in required format
    const all = await dbPromise.getAll(STORE_NAME);
    all.sort((a, b) => (a.id || 0) - (b.id || 0));
    const lastMessages = all.slice(-SEND_HISTORY_COUNT).map((m) => {
      // Ensure the stored object matches the specified format (strip DB fields)
      return {
        role: m.role,
        parts: Array.isArray(m.parts)
          ? m.parts
          : [{ text: String(m.parts || "") }],
      };
    });

    // POST to backend
    try {
      const res = await fetch(
        `${backendUrl}/bot` || "http://localhost:3000/bot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ msg: userText, history: lastMessages }),
        }
      );
      const data = await res.json();
      // backend returns { msg: <string> } per your controller
      const responseText = data?.msg ?? "";
      const modelMsg = {
        role: "model",
        parts: [{ text: String(responseText) }],
      };
      await addMessage(modelMsg);
      return modelMsg;
    } catch (err) {
      console.error("sendMessage error:", err);
      // Optionally store an error model message
      const errorMsg = {
        role: "model",
        parts: [{ text: "Error: failed to fetch response" }],
      };
      await addMessage(errorMsg);
      return errorMsg;
    }
  };

  const resetHistory = async () => {
    if (!dbPromise) return;
    const tx = dbPromise.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    // get all keys and delete
    const all = await store.getAllKeys();
    for (const key of all) {
      await store.delete(key);
    }
    await tx.done;
    setMessages([]);
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        loadHistory,
        addMessage,
        sendMessage,
        resetHistory,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};
