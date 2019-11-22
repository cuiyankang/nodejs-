const booksModel=require("../model/books");

const addbooks=async (req,res)=>{
    let {booksAuth,booksName,booksStatus,booksPrice,booksLogo}=req.body;
    let booksData=await booksModel.booksSave({booksAuth,booksName,booksStatus,booksPrice,booksLogo});
    if(booksData){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"添加成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"服务器错误",
                status:0
            }
        })
    }
}

const booksList= async(req,res)=>{
    let {page,limit} = req.query;
    
    let data = await booksModel.booksPage(page,limit);
    if(data.length>0){

        res.json({
            code:200,
            errMsg:"",
            data:{
                list:data,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:[],
                status:0
            }
        })
    }

}

const bookSerializa = async (req,res)=>{
    let {page,limit} = req.query;
    
    let data = await booksModel.booksliza(page,limit);
    if(data.length>0){

        res.json({
            code:200,
            errMsg:"",
            data:{
                list:data,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:[],
                status:0
            }
        })
    }
}

const bookEnd = async (req,res)=>{
    let {page,limit} = req.query;
    
    let data = await booksModel.booksEnd(page,limit);
    if(data.length>0){

        res.json({
            code:200,
            errMsg:"",
            data:{
                list:data,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:[],
                status:0
            }
        })
    }
}

const booksSort = async (req,res)=>{
    let {page,limit,booksPrice,text} = req.query;
    let data = await booksModel.booksSort(page,limit,booksPrice,text);
    if(data.length>0){

        res.json({
            code:200,
            errMsg:"",
            data:{
                list:data,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:[],
                status:0
            }
        })
    }
}

const booksModify= async (req,res)=>{
    let{booksAuth,booksName,booksStatus,booksPrice,booksLogo,id} = req.body;
    let data = await booksModel.booksUpdate(id,{booksAuth,booksName,booksStatus,booksPrice,booksLogo});
    if(data.ok==1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"修改成功",
                status:1
            }
        })
    }else{
        res.json({
            code: 200,
            errMsg: "",
            data: {
                info: "修改失败",
                status: 0
            }
        })
    }
}

const booksDelete= async (req,res)=>{
    let {id} = req.query;
    let data = await booksModel.booksDelete(id);
    if(data.ok==1){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"删除失败",
                status:0
            }
        })
    }

}

const booksQuery = async (req,res)=>{
    let { page,limit,bookQuery} = req.body;
    bookQuery = decodeURI(bookQuery)
    let data = await booksModel.booksQuery( page,limit,bookQuery);
    if(data.length>0){
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:data,
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:[],
                status:0
            }
        })
    }
}
module.exports={
    addbooks,
    booksList,
    booksModify,
    booksDelete,
    bookSerializa,
    bookEnd,
    booksSort,
    booksQuery
}