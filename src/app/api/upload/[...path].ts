import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path: filePathArray } = req.query;
  const filePath = path.join(process.cwd(), "public", "uploads", ...filePathArray as string[]);

  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "image/png"); // Adjust based on file type
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.status(404).json({ error: "File not found" });
  }
}
