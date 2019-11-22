class Register {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init(){
        this.createForm();
    }
    createForm(){
        this.container.html(Register.template);
        this.toggleClick();
        this.formSubmit();
    }
    toggleClick(){
        this.container.find(".toggle").on("click",this.handleToggleClickCb.bind(this))
    }
    handleToggleClickCb(){
        new Page().createForm(true)
    }
    formSubmit(){
        this.container.find("#user_form").on("submit",this.handleFormSubmitCb.bind(this))
    }
    handleFormSubmitCb(e){
        e.preventDefault();
        let username = this.container.find("#register_username").val();
        let password = this.container.find("#register_password").val();

       
        $.ajax({
            type:"POST",
            url:"/users/register",
            data:{
                username,
                password
            },
            success:this.handleFormSubmitSucc.bind(this)
        })
    }
    handleFormSubmitSucc(data){
       if(data.data.status == 1){
           alert(data.data.info);
           new Page().createForm(true)
       }else{
            alert(data.data.info);
       }
    }
}

Register.template = `
<div class="form_logo">
<img src="https://cas.1000phone.net/cas/images/login/logo.png"/>
</div>
<form id="user_form">
<div class="form-group">
    <label for="register_username">用户名</label>
    <input type="text" class="form-control" id="register_username" placeholder="请输入用户名">
</div>
<div class="form-group">
    <label for="register_password">密码</label>
    <input type="password" class="form-control" id="register_password" placeholder="请输入密码">
</div>
<p class="bg-info toggle">已有账号,立即登陆</p>
<button type="submit" class="btn btn-primary form_btn">立即注册</button>
</form>
`