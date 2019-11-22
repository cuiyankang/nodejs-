const mongoose=require("../utils/database");

const Books=mongoose.model("book",{
    booksAuth:String,
    booksName:String,
    booksStatus:String,
    booksPrice:Number,
    booksLogo:String
})

const booksSave = (booksInfo)=>{
    let books=new Books(booksInfo);
    return books.save();
}

const booksPage = (page,limit) =>{
    page=Number(page);
    limit=Number(limit);

    return Books.find().skip((page-1)*limit).limit(limit);
}

const booksliza = (page,limit) =>{
    page=Number(page);
    limit=Number(limit);

    return Books.find({booksStatus:"连载中"}).skip((page-1)*limit).limit(limit);
}


const booksEnd = (page,limit) =>{
    page=Number(page);
    limit=Number(limit);

    return Books.find({booksStatus:"已完结"}).skip((page-1)*limit).limit(limit);
}

const booksSort = (page,limit,booksPrice,text) =>{
    page=Number(page);
    limit=Number(limit);
    booksPrice = Number(booksPrice);
    if(text.booksStatus==="全部"){
        return Books.find().skip((page-1)*limit).limit(limit).sort({booksPrice:booksPrice}) ;
    }
    return Books.find(text).skip((page-1)*limit).limit(limit).sort({booksPrice:booksPrice}) ;
}

const booksUpdate = (id,booksInfo)=>{
    return Books.update({_id:id},booksInfo);
}

const booksDelete = (id)=>{
    return Books.remove({_id:id});
}

const booksQuery = ( page,limit,bookQuery) =>{
    page=Number(page);
    limit=Number(limit);
    let reg =new RegExp(bookQuery);
    return Books.find({booksName:reg}).skip((page-1)*limit).limit(limit);
}

module.exports={
    booksSave,
    booksPage,
    booksUpdate,
    booksDelete,
    booksliza,
    booksEnd,
    booksSort,
    booksQuery
}