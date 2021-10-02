const express = require("express");
const multer = require("multer");

const checkAuth = require('../middleware/check-auth');

const User = require("../models/user");
const Transaction = require("../models/transaction");
const Member = require("../models/member");

const router = express.Router();

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.get("/dashboard", checkAuth, (req, res, next) => {
  const userid = req.userData.userid;
  User.findOne({ userid : userid }).then(user => {
    if (user) {
      const name = user.name;
      const balance = user.balance;
      const last_login = user.last_login;
      Transaction.find({ userid: userid}).then(transaction => {
        res.status(200).json({
          name: name,
          balance: balance,
          last_login: last_login,
          transaction: transaction
        });
      });
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  });
});

router.get(
  "/members",
  checkAuth,
  (req, res, next) => {
    Member.find({}).then(members => {
      if (members) {
          res.status(200).json({
            members : members
          });
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    });
  }
);

module.exports = router;
