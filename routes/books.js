const express=require("express");
const router=express.Router();
const booksController=require("../controller/books");
const authUtils = require("../utils/token")


router.post("/addbooks",booksController.addbooks)

router.get("/bookslist",authUtils.tokenVerfiy,booksController.booksList)

router.get("/bookSerializa",authUtils.tokenVerfiy,booksController.bookSerializa)

router.get("/booksEnd",authUtils.tokenVerfiy,booksController.bookEnd)

router.get("/booksSort",authUtils.tokenVerfiy,booksController.booksSort)

router.post("/modify",booksController.booksModify)

router.get("/delete",booksController.booksDelete)

router.post("/bookQuery",booksController.booksQuery)


module.exports=router;