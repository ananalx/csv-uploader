import { NextFunction, Request, Response } from "express";
import fs from "fs";
import csv from "csv-parser";

import User from "../../schemas/UserSchema";
import { console } from "inspector";

export default class AppController {
  public static async records(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({});
      console.log("users", users);

      res.json({ result: users });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  public static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.file);
      if (!req.file || !req.file.path) {
        return res.status(400).send("No file uploaded or file path missing.");
      }
      const results: Record<string, string>[] = [];
      const stream = fs
        .createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => {
          console.log(data);

          const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

          if (emailRegex.test(data.email)) {
            results.push(data);
          } else return res.json({ result: "invalid email" });
        })
        .on("end", async () => {
          const result = await User.insertMany(results);
          console.log("results", result);
          res.json({ result });
          if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
                return res.status(500).send("Error cleaning up uploaded file.");
              }
            });
          } else {
            res.status(500).send("Uploaded file information is missing.");
          }
        })
        .on("error", (err) => {
          console.error("Error processing file:", err);
          if (req.file && req.file.path) {
            fs.unlink(req.file.path, () => {
              res.status(500).send("Error processing file.");
            });
          } else {
            res
              .status(500)
              .send("Error processing file: file information missing.");
          }
        });

      // Handle any additional stream errors
      stream.on("error", (err) => {
        console.error("Stream error:", err);
        if (req.file && req.file.path) {
          fs.unlink(req.file.path, () => {
            res.status(500).send("Error reading file stream.");
          });
        } else {
          res
            .status(500)
            .send("Error reading file stream: file information missing.");
        }
      });
    } catch (e) {
      console.log(e);
      res.json({ result: "something went wrong" });
      next(e);
    }
  }
  public static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedRecord = await User.findByIdAndDelete(id);
      console.log("deletedRecord", deletedRecord);

      if (!deletedRecord) {
        return res.status(404).json({ message: "Record not found" });
      }

      res
        .status(200)
        .json({ message: "Record deleted successfully", deletedRecord });
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
}
