import { useMessages } from "../context/MessagesContext";

export const useMessages = () => {
  const context = useMessages();

  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }

  return context;
};

export default useMessages;
