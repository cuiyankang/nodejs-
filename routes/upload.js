const express=require("express");
const router=express.Router();

const uploadController=require("../controller/upload");
router.post("/urlImage",uploadController.ImageUpload)


module.exports = router;