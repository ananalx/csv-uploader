import express from "express";
import AppController from "./controllers/AppController";
import { upload } from "./middlewares/multerCsv.middleware";

const router = express.Router();

router.get("/records", AppController.records);
router.post(
  "/upload",
  upload.single("file"),
  (req, res, next) => {
	Promise.resolve(AppController.upload(req, res, next)).catch(next);
  }
);
router.delete("/delete/:id", (req, res, next) => {
  Promise.resolve(AppController.delete(req, res, next)).catch(next);
});

export default router;
