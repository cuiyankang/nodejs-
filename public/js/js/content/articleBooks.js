class ArticleBooks{
    constructor(){
        this.container = $(".content");
        this.init();
    }
    init(){
        this.createPage();
        this.createeditor();
        this.booksFormSubmit();
    }
    createPage(){
        this.container.html(ArticleBooks.template);
    }
    createeditor(){
        this.text=$('#summernote').summernote({
            height: 300,                 // set editor height
            minHeight: null,             // set minimum height of editor
            maxHeight: null,             // set maximum height of editor
            focus: true                  // set focus to editable area after initializing summernote
          });
    }
    booksFormSubmit(){
        this.container.find("#books_form").on("submit",this.handleBooksFormSubmitCb.bind(this));
    }
    handleBooksFormSubmitCb(e){
        e.preventDefault();
      

        let booksTitle = this.container.find("#booksTitle").val();
        let content = $('#summernote').summernote('code');
        $.ajax({
            type:"post",
            url:"/article/addArticle",
            data:{
                booksTitle,
                content
            },
            success:this.handlePublicArticle.bind(this)
        })
    }
    handlePublicArticle(data){
        if(data.data.status==1){
            alert(data.data.info);
            new Slider().handleSliderClick(4);
        }else{
            alert(data.data.info);
        }
    }
}

ArticleBooks.template = `
    <div class="articleBooks">
        <form id="books_form">
            <div class="form-group">
                <label for="booksTitle">文章标题</label>
                <input type="text" class="form-control" id="booksTitle" placeholder="请输入文章标题">
            </div>
            <div id="summernote"></div>
            <button type="submit" class="btn btn-default">提交</button>
        </form>
    </div>
`