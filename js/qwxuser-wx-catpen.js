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

function qWXuser(){
    // remerror()

    $.ajax({
        type : "GET",
        url : "http://120.79.187.63:5701/wxoption/qwxuser?appToken=catpen",
        data : {
            //page:page
        },
        dataType : "json",
        success : function(data) {
            var str = '';
            records  = data.data.records
            var i = 0
            total = data.data.total+1
            var tips = '爱猫生活WxPusher订阅者(WX)';
            if (total != 0){
                
                $.each(records , function(key,value) {
                    nickName=value.nickName
                    uid = value.uid
                    createTime= formatTimestamp(value.createTime)
                    headImg = value.headImg
                    enable = value.enable
                    if(key==0){
                        str = '<thead><tr bgcolor="#D9EDF7"><td colspan="6">'+tips+'</td></tr>'
                            +'<tr>'
                            +'<th class="text-center">#'+total+'</th>'
                            +'<th class="">头像</th>'
                            +'<th class="">UID</th>'
                            +'<th class="">微信昵称</th>'
                            +'<th class="">Enable</th>'
                            +'<th class="">关注时间</th>'
                            +'</tr></thead>'
                        $('#table').append(str);
                    }
                    str = '<tbody><tr>'
                        +'<td class="text-center" style="vertical-align: middle;">'+(total-i)+'</td>'
                        +'<td class="" style="vertical-align: middle;"><img src="'+headImg+'" width="32" height="32" /></td>'
                        +'<td class="" style="vertical-align: middle;">'+uid+'</td>'
                        +'<td class="" style="vertical-align: middle;">'+nickName+'</td>'
                        +'<td class="" style="vertical-align: middle;">'+enable+'</td>'
                        +'<td class="" style="vertical-align: middle;">'+createTime+'</td>'						
                        +'</tr></tbody>'
                    $('#table').append(str);
                    i += 1
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


$(document).ready(qWXuser());
