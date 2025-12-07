import connect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  await connect();

  const { userName, password, password2 } = req.body;

  if (!userName || !password || !password2)
    return res.status(400).json({ message: "Missing fields" });

  if (password !== password2)
    return res.status(400).json({ message: "Passwords do not match" });

  const existing = await User.findOne({ userName });

  if (existing)
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    userName,
    password: hashed,
    favourites: []
  });

  res.status(200).json({ message: "Registered successfully" });
}
