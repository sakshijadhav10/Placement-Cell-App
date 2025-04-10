const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Create GridFSBucket instance once the connection is ready
let gridFSBucket;
mongoose.connection.once("open", () => {
  gridFSBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
});

// Using memory storage so the file is accessible via file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Resume upload endpoint using GridFS
router.post("/resume", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    if (file.mimetype !== "application/pdf") {
      return res.status(400).json({ message: "Only PDFs are allowed" });
    }
    const filename = `${uuidv4()}.pdf`;

    const uploadStream = gridFSBucket.openUploadStream(filename, {
      contentType: file.mimetype,
    });
    uploadStream.end(file.buffer);

    uploadStream.on("finish", (uploadedFile) => {
      // Save uploadedFile._id.toString() in your user document
      res.json({ message: "File uploaded", fileId: uploadedFile._id.toString() });
    });

    uploadStream.on("error", (error) => {
      res.status(500).json({ message: "Error uploading file", error });
    });
  } catch (error) {
    res.status(500).json({ message: "Upload error", error });
  }
});

// Profile upload endpoint using GridFS
router.post("/profile", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    // For profile picture, you might allow images only (jpeg, png)
    if (!file.mimetype.startsWith("image/")) {
      return res.status(400).json({ message: "Only images allowed" });
    }
    const filename = `${uuidv4()}-${file.originalname}`;

    const uploadStream = gridFSBucket.openUploadStream(filename, {
      contentType: file.mimetype,
    });
    uploadStream.end(file.buffer);

    uploadStream.on("finish", (uploadedFile) => {
      // Save uploadedFile._id.toString() in your user document
      res.json({ message: "Profile uploaded", fileId: uploadedFile._id.toString() });
    });

    uploadStream.on("error", (error) => {
      res.status(500).json({ message: "Error uploading profile", error });
    });
  } catch (error) {
    res.status(500).json({ message: "Upload error", error });
  }
});

// Endpoint to retrieve file from GridFS using file id
router.get("/file/:id", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const downloadStream = gridFSBucket.openDownloadStream(fileId);
    downloadStream.on("error", (err) => {
      res.status(404).json({ message: "File not found", err });
    });
    res.set("Content-Type", "application/octet-stream");
    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving file", error });
  }
});

module.exports = router;
