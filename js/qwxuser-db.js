function formatTimestamp(timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = (date.getMinutes() < 10 ? '0'  + date.getMinutes() : date.getMinutes()) + ':';
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
}
// function remerror(){
//     $("#table thead").remove();
//     $("#table tbody").remove();
//     $('#error').remove();
//     return true
// }


function qDBuser() {

    $.ajax({
        type : "GET",
        url : "http://120.79.187.63:5701/wxoption/qdbuser?appToken=lovecat",
        data : {
            //page:page
        },
        dataType : "json",
        success : function(data) {
            data = data['data']
            var str = '';
            var tips = '爱猫生活WxPusher订阅者(DB)，在数据库中的用户才会收到推送'
            if(data != null){
                $.each(data, function(key,value) {
                    if(key==0){
                        str = '<thead><tr bgcolor="#D9EDF7"><td colspan="6">'+tips+'</td></tr>'
                            +'<tr>'
                            +'<th class="text-center">#'+data.length+'</th>'
                            +'<th class="">头像</th>'
                            +'<th class="">UID</th>'
                            +'<th class="">微信昵称</th>'
                            +'<th class="">关注时间</th>'
                            +'<th class="">操作</th>'
                            +'</tr></thead>'
                        $('#table').append(str);
                    }

                    str = '<tbody><tr>'
                        +'<td class="text-center" style="vertical-align: middle;">'+(key+1)+'</td>'
                        +'<td class="" style="vertical-align: middle;"><img src="'+value.userHeadImg+'" width="32" height="32" /></td>'
                        +'<td class="" id="uid'+(key+1)+'" style="vertical-align: middle;">'+value.uid+'</td>'
                        +'<td class="" id="userName'+(key+1)+'" style="vertical-align: middle;">'+value.userName+'</td>'
                        +'<td class="" style="vertical-align: middle;">'+formatTimestamp(value.dyTime)+'</td>'					
                        +'<td class="" style="vertical-align: middle;"><button type="button" id="btn_del" class="btn btn-danger btn-sm" onclick="showText('+(key+1)+')">Delete</button></td>'
                        +'</tr></tbody>'
                    $('#table').append(str);
                });
            }else{
                var str = '<div id="error" class="form-group text-center"><h1 style="color:#000000;">暂无数据</h1></div>';
                $('#table').append(str);
            }
            
        },
        error : function(data) {
            var str = '<div id="error" class="form-group text-center"><h1 style="color:red;">ERROR！</h1></div>';
            $('#table').append(str);
        }
    });	
} 
function showText(col){
    userName = $("#userName"+col).text()
    var msg = "确定要删除 "+userName+" 吗？\n请确认！";
    uid = $("#uid"+col).text()
    if (confirm(msg)==true){
        $.ajax({
            type : "GET",
            url : "http://120.79.187.63:5701/wxoption/deldbuser?appToken=lovecat&uid="+uid,
            data : {
                //page:page
            },
            dataType : "json",
            success : function(data) {
                var code = data.code
                if(code=='200'){
                    qDBuser()
                    alert('已删除')
                }else{
                    alert('删除失败')
                }
                    
            },
            error : function(data) {
                alert('出现异常')
            }
        });	

    } 
}


$(document).ready(qDBuser());
