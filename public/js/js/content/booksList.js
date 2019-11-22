class BooksList{
    constructor(){
        this.container = $(".content");
        this.num = -1;
        this.has=0;
        this.init();
    }
    init(){
        this.createPage();
    }
    createPage(){
        this.container.html(BooksList.template);
        this.getBooksList();
    }
    getBooksList() {
        $.ajax({
            type:"get",
            url:"/books/bookslist",
            data:{
                page:1,
                limit:10
            },
            success:this.handleGetBooksListSucc.bind(this)
        })
    }
    handleGetBooksListSucc(data){
        this.data=data.data.list;
        let str="";
        for(var i = 0;i < data.data.list.length;i++){
            str+=`<tr>
            <td>${i}</td>
            <td>${data.data.list[i].booksAuth}</td>
            <td>${data.data.list[i].booksName}</td>
            <td>${data.data.list[i].booksStatus}</td>
            <td style="width:90px">
                <img src="${data.data.list[i].booksLogo}"/>
            </td>
            <td>${data.data.list[i].booksPrice}</td>
            <td data-id="${data.data.list[i]._id}">
                <button type="button"
                class="btn btn-link modify" 
                data-toggle="modal" 
                data-target="#booksModify">修改</button>
                <button type="button" class="btn btn-link delete">删除</button>
            </td>
        </tr>`
        }
        this.container.find(".booksList tbody").html(str);
        this.container.find(".booksList tbody tr td img").css({
            width:90,
            height:120,
            display:'inline'
        });
        this.has=1;
        this.modifyEach();
        this.fileChange();
        this.saveDataClick();
        this.deleteEach();
        this.flag=true;
        this.select();
        this.sort();
        this.query();
    }


    

    //增加
    modifyEach(){
        $.each(this.container.find(".modify"),this.handleModifyEachCb.bind(this));
    }
    handleModifyEachCb(index){
        this.container.find(".modify").eq(index).on("click",this.handleModifyClick.bind(this,index));
    }
    handleModifyClick(index){
        let id=this.container.find(".modify").eq(index).parent().attr("data-id");
        for(var i=0;i<this.data.length;i++){
            if(this.data[i]._id==id){
                this.container.find("#booksAuth").val(this.data[i].booksAuth);
                this.container.find("#booksName").val(this.data[i].booksName);
                this.container.find("#booksStatus").val(this.data[i].booksStatus);
                this.container.find("#booksPrice").val(this.data[i].booksPrice);
                this.container.find("#booksLogo").attr("data-url",this.data[i].booksLogo);
                var img = $("<img/>");
                img.attr("src",this.data[i].booksLogo);
                img.css({
                    width:90,
                    height:120
                });
                this.container.find(".upload>div").html(img);
                this.container.find("#books_form").attr("data-id",this.data[i]._id);
                break;
            }
        }
    }
    fileChange(){
        this.container.find("#booksLogo").on("change",this.handleFileChange.bind(this));
    }
    handleFileChange(){
        let file=this.container.find("#booksLogo")[0].files[0];
       
        let formData=new FormData();
        formData.append("booksLogo",file);
        
        $.ajax({
            type:"post",
            url:"/upload/urlImage",
            data:formData,
            contentType:false,//清空content type类型
            processData:false,//停止jq对数据的解析
            cache:false,//清除缓存
            success:this.handleUploadSucc.bind(this)
        })
    }
    handleUploadSucc(data){
        if(data.data.urlImage){
            let img=$("<img/>");
            img.attr("src",data.data.urlImage);
            img.css({
                width:90,
                height:120
            })
            this.container.find(".upload>div").html(img);
            this.container.find("#booksLogo").attr("data-url",data.data.urlImage);
        }
    
    }
    saveDataClick(){
        this.container.find("#saveData").on("click",this.handleSaveDataClickCb.bind(this));
    }
    handleSaveDataClickCb(){
        let booksAuth = this.container.find("#booksAuth").val();
        let booksName = this.container.find("#booksName").val();
        let booksStatus = this.container.find("#booksStatus").val();
        let booksPrice = this.container.find("#booksPrice").val();
        let booksLogo = this.container.find("#booksLogo").attr("data-url");
        let id = this.container.find("#books_form").attr("data-id");
        // console.log(booksAuth,booksName,booksStatus,booksPrice,booksLogo,id);
        $.ajax({
            type:"post",
            url:"/books/modify",
            data:{
                booksAuth,booksName,booksStatus,booksPrice,booksLogo,id
            },
            success:this.hadleModifySucc.bind(this)
        })
    }
    hadleModifySucc(data){
        if(data.data.status==1){
            if(this.flag==true){
                alert(data.data.info);
                this.flag=false;
            }
            $('#booksModify').modal('hide');
            this.getBooksList();
           
        }else{
            alert(data.data.info);
        }
    }

    //删除
    deleteEach(){
        $.each(this.container.find(".delete"),this.handleDeleteEachCb.bind(this));
    }
    handleDeleteEachCb(index){
        this.container.find(".delete").eq(index).on("click",this.handleDeleteClick.bind(this,index));
    }
    handleDeleteClick(index){
        let id = this.container.find(".delete").eq(index).parent().attr("data-id");
        $.ajax({
            type:"get",
            url:"/books/delete",
            data:{
                id:id
            },
            success:this.handleDeleteSucc.bind(this)
        })
    }
    handleDeleteSucc(data){
        if(data){
            alert(data.data.info);
            this.getBooksList();
        }else{
            alert(data.data.info);
        }
    }


// 条件查询
    select(){
        this.container.find("#slt").on("change",this.handleSelectChange.bind(this))
    }
    handleSelectChange(){
        let text = $('#slt option:selected').text();
        if(text === "全部"){
            this.getBooksList();
        }else if(text === "连载中"){
             $.ajax({
                type:"get",
                url:"/books/bookSerializa",
                data:{
                    page:1,
                    limit:10
                },
                success:this.handleGetBooksListSucc.bind(this)
            })
        }else if(text === "已完结"){
            $.ajax({
                type:"get",
                url:"/books/booksEnd",
                data:{
                    page:1,
                    limit:10
                },
                success:this.handleGetBooksListSucc.bind(this)
            })
        }
    }


//排序
    sort(){
        this.container.find("#sort").on("click",this.hadleSortClick.bind(this));
    }
    hadleSortClick(e){
        e.preventDefault();

        let text = $('#slt option:selected').text();
        let texts = {booksStatus:text}
        if(this.has===1){
            this.has=0;
            this.num*=-1;
            $.ajax({
                type:"get",
                url:"/books/booksSort",
                data:{
                    page:1,
                    limit:10,
                    booksPrice:this.num,
                    text:texts
                },
                success:this.handleGetBooksListSucc.bind(this)
            })
        }
    }
   


//模糊查询  db.books.find({booksName:/大/})
    query(){
        this.container.find("#query").on("input",this.handlequery.bind(this))
    }
    handlequery(){
        let value = this.container.find("#query").val(); 
        
        if(/^[\u4e00-\u9fa5]+$/gi.test(value)){
                $.ajax({
                    type:"post",
                    url:"/books/bookQuery",
                    data:{
                        page:1,
                        limit:10,
                        bookQuery:encodeURI(value)
                    },
                    success:this.handleGetBooksListSucc.bind(this)
                })
        }
        
        
        if(value === ""){
            this.getBooksList();
        }


        
    }
   
    
}

BooksList.template = `
    <div class="booksList">
        <form class="form-inline">
            <div class="form-group">
            <select class="form-control" id="slt">
                <option>全部</option>
                <option>连载中</option>
                <option>已完结</option>
            </select>
            </div>
            <div class="form-group">
                <input type="text" id="query" class="form-control" placeholder="请输入关键字"/>
            </div>
            <button class="btn btn-primary" id="sort">排序</button>
        </form>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>书籍ID</th>
                    <th>书籍作者</th>
                    <th>书籍名称</th>
                    <th>书籍状态</th>
                    <th>书籍Logo</th>
                    <th>书籍价格</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>001</td>
                    <td>辰东</td>
                    <td>完美世界</td>
                    <td>连载中</td>
                    <td style="width:90px">
                        <img src="https://bookcover.yuewen.com/qdbimg/349573/1016433659/90"/>
                    </td>
                    <td>
                        <button type="button" class="btn btn-link">修改</button>
                        <button type="button" class="btn btn-link">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" tabindex="-1" role="dialog" id="booksModify">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">书籍修改</h4>
            </div>
            <div class="modal-body">
                <form id="books_form">
                    <div class="form-group">
                        <label for="booksAuth">书籍作者</label>
                        <input type="text" class="form-control" id="booksAuth" placeholder="请输入书籍作者">
                    </div>
                    <div class="form-group">
                        <label for="booksName">书籍名称</label>
                        <input type="text" class="form-control" id="booksName" placeholder="请输入书籍名称">
                    </div>
                    <div class="form-group">
                        <label for="booksStatus">书籍状态</label>
                        <select class="form-control" id="booksStatus">
                            <option>连载中</option>
                            <option>已完结</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="booksPrice">书籍价格</label>
                        <input type="number" class="form-control" id="booksPrice" placeholder="请输入书籍价格">
                    </div>
                    <div class="form-group upload">
                        <div>上传图片</div>
                        <input type="file" id="booksLogo">
                    </div>
                
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="saveData">保存数据</button>
            </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
`