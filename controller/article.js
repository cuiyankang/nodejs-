const articleModel=require("../model/article")
const addArticle =async (req,res)=>{
    let {booksTitle,content}=req.body;
    let data=await articleModel.articleSave({booksTitle,content});
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"发布成功",
                status:1
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"发布失败",
                status:0
            }
        })
    }
}

const articleList = async(req,res)=>{
    let { page,limit } = req.query;
    let data =await articleModel.articleSelect( page,limit );
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:{
                list:data,
                info:"查询成功"
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                info:"查询失败"
            }
        })
    }
}

const articleContent = async (req,res) =>{
    let {id} = req.query;
    
    let data = await articleModel.articleFind(id);
    if(data){
        res.json({
            code:200,
            errMsg:"",
            data:{
                data
            }
        })
    }else{
        res.json({
            code:200,
            errMsg:"",
            data:{
                data:"",
                info:"该章节不存在"
            }
        })
    }
}

module.exports={
    addArticle,
    articleList,
    articleContent
}