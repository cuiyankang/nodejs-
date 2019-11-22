class User{
    constructor(){
        this.container = $(".content");
        this.init();
    }
    init(){
        this.createPage();
    }
    createPage(){
        this.container.html(User.template);
        this.postUserList();
    }
    postUserList(){
        $.ajax({
            type:"post",
            url:"/users/usersList",
            data:{
                page:1,
                limit:10
            },
            success:this.handlePostListSucc.bind(this)
        })
    }
    handlePostListSucc(data){
        this.data = data.data.list;
        let state;
        let str = "";

        for(var i=0;i<this.data.length;i++){
            let time = this.data[i].registerTime;
            let Time = this.formatDate(new Date(time));


            if(this.data[i].status===true){
                state="未冻结";
            }else{
                state="冻结中";
            }



            str += `
            <tr>
                <td>${this.data[i].name}</td>
                <td style="width:90px">
                    <img class="user-img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572361450132&di=d130a10ca982138b09ed6f51ab6a049c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01460b57e4a6fa0000012e7ed75e83.png%401280w_1l_2o_100sh.png"/>
                </td>
                <td>${this.data[i].username}</td>
                <td>${Time}</td>
                <td>${state}</td>
            </tr>
            `
        }
        this.container.find("tbody").html(str);

    }
    formatDate(now) { 
        var year=now.getFullYear();  //取得4位数的年份
        var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
        var date=now.getDate();      //返回日期月份中的天数（1到31）
        var hour=now.getHours();     //返回日期中的小时数（0到23）
        var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
        var second=now.getSeconds(); //返回日期中的秒数（0到59）
        return year+"-"+month+"-"+date; 
    } 
       


}

User.template = `
    
<div class="user">
<table class="table table-striped">
<thead>
    <tr>
        <th>用户昵称</th>
        <th>用户头像</th>
        <th>用户账号</th>
        <th>注册时间</th>
        <th>用户状态</th>
    </tr>
</thead>
<tbody class="user-tbody">
    <tr>
        <td>Alley</td>
        <td style="width:90px">
            <img  src="https://bookcover.yuewen.com/qdbimg/349573/1016433659/90"/>
        </td>
        <td>alley1990</td>
        <td>2019-01-02</td>
        <td>未冻结</td>
    </tr>
</tbody>
</table>
</div>
`