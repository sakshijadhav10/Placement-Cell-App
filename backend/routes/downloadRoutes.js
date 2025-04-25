const express = require("express");
const mongoose = require("mongoose");
const { GridFSBucket } = require("mongodb");

const router = express.Router();

let gridFSBucket;
mongoose.connection.once("open", () => {
  gridFSBucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "uploads",
  });
});
router.get("/file/:id", async (req, res) => {
  if (!gridFSBucket) {
    return res.status(503).json({ message: "File storage not initialized" });
  }

  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const downloadStream = gridFSBucket.openDownloadStream(fileId);

    downloadStream.on("file", (file) => {
      res.set("Content-Type", file.contentType || "application/octet-stream");

     // ?download=true to force download
const disposition = req.query.download === "true" ? "attachment" : "inline";
res.set("Content-Disposition", `${disposition}; filename="${file.filename}"`);

    });

    downloadStream.on("error", (err) => {
      return res.status(404).json({ message: "File not found", error: err });
    });

    downloadStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving file", error });
  }
});


module.exports = router;
