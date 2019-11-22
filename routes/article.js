const express=require("express");
const router=express.Router();
const articleController=require("../controller/article")

router.post("/addArticle",articleController.addArticle)

router.get("/articleList",articleController.articleList)

router.get("/content",articleController.articleContent)

module.exports=router;