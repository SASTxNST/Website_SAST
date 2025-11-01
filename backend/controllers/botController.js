import { genRes } from "../utils/botService.js";

const returnResponse = async (req, res) => {
  try {
    const { msg, history } = req.body;
    const response = await genRes(msg, history);
    return res.status(200).json({ msg: response });
  } 
  catch (err) {
    console.error("Error generating response:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export default returnResponse;
