import connect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  await connect();

  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (!user)
    return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { _id: user._id, userName: user.userName },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
}
