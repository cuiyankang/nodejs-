class Page{
    constructor(){
        this.container = $(".form_container");
    }
    init(){
        this.createForm()
    }
    createForm(flag){
        if(flag){
            this.login = new Login(this.container);
        }else{
            this.register = new Register(this.container);
        }
        
        
    }
}

new Page().init();