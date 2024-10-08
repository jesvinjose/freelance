const express = require("express");
const branchRoute = express.Router();
const upload = require("../uploadConfig.js");
const branchController = require("../controllers/branchController");

branchRoute.post(
  "/addbranch",
  upload.single("image"),
  branchController .addBranch
);

branchRoute.get("/getbranch", branchController.getBranch);

branchRoute.delete(
  "/deletebranch/:id",
  branchController.deleteBranch
);

branchRoute.put(
  "/updatebranch/:id",
  upload.single("image"),
  branchController.updateBranch
);

module.exports = branchRoute;
