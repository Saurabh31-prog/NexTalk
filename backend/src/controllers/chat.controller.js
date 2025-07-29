
// import { generateStreamToken } from "../lib/stream.js";


// export async function getStreamToken(req, res) {
//   try {
//     const token = generateStreamToken(req.user.id);
//   } catch (error) {
//     console.log("Errror in getStreamToken controller: ", error.message);
//     res.status(500).json({ message: "Internal server error" });
//   }
// }


import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = generateStreamToken(req.user.id);

    if (!token) {
      return res.status(500).json({ message: "Failed to generate token" });
    }

    // ✅ Send token back to frontend
    res.json({ token });
  } catch (error) {
    console.error("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
