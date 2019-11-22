class ArticleList{
    constructor(){
        this.container = $(".content");
        this.init();
    }
    init(){
        this.createPage();
    }
    createPage(){
        this.container.html(ArticleList.template);
        this.getBooksList();
    }
    getBooksList(){
        $.ajax({
            type:"get",
            url:"/article/articleList",
            data:{
                page:1,
                limit:20
            },
            success:this.handleGetarticleListSucc.bind(this)
        })
    }
    handleGetarticleListSucc(data){
        this.data = data.data.list;
        console.log(this.data);
        let str = "";
        for (var i = 0; i<this.data.length; i++) {
            str +=`
                <div class="texts" data-id="${this.data[i]._id}" style="cursor: pointer;">${this.data[i].booksTitle}</div>
            `
        }
        this.container.find(".articleList").html(str);
        this.titleClick();
    }
    titleClick(){
        $.each(this.container.find(".articleList div"),this.handleTitleClickCb.bind(this));
    }
    handleTitleClickCb(index){
        this.container.find(".articleList div").eq(index).on("click",this.handleTitleEvent.bind(this,index));
    }
    handleTitleEvent(index){
        let id = this.container.find(".articleList div").eq(index).attr("data-id");
        window.location.href="http://localhost:3000/html/article.html?id="+id;
    }
}

ArticleList.template = `
    <div class="articleList">ArticleList</div>`