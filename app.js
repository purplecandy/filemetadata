const express = require("express");
const multer = require("multer");
const app = express();

let upload = multer({ dest: "uploads/", limits: { fileSize: 1e6 } }).single(
  "formfile"
);

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

app.post("/upload", (req, res, next) => {
  //   console.log(req.file);
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      res.status(404).json({ message: err.message });
    } else if (err) {
      res.status(500).json({ message: "Unexpected error" });
    } else {
      res.status(200).json({
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      });
    }
  });
});
module.exports = app;
