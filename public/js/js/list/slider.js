class Slider {
    constructor() {
        this.aLi = $(".slider>ul>li");
    }
    init() {
        this.sliderEach();
        this.handleSliderClick(1);
        this.Signout();
        this.Username();
    }
    sliderEach() {
        $.each(this.aLi, this.handleSliderEachCb.bind(this))
    }
    handleSliderEachCb(index) {
        this.aLi.eq(index).on("click", this.handleSliderClick.bind(this, index))
    }
    handleSliderClick(index) {
        this.aLi.eq(index).addClass("active").siblings().removeClass("active");
        switch (index) {
            case 0:
                new Home();
                break;
            case 1:
                new BooksList();
                break;
            case 2:
                new AddBooks();
                break;
            case 3:
                new ArticleBooks();
                break;
            case 4:
                new ArticleList();
                break;    
            case 5:
                new User();
                break;
            default:
                new Home();
        }
    }
    Signout(){
        $(".dropdown-menu li").eq(1).on("click",this.handleSignoutClick.bind(this))
    }
    handleSignoutClick(){
        Cookies.remove('token');
        Cookies.remove('username');
        window.location =  "http://localhost:3000";
    }
    Username(){
        let username=Cookies.get('username');
        $(".usname").html(username);
    }
}

new Slider().init();