function index() {
    // remerror()
    $.ajax({
        type : "GET",
        url : "http://120.79.187.63:5701/catoption/topics?appToken=catpen",
        data : {
            //page:page
        },
        dataType : "json",
        success : function(data) {
            data = data['data']
            var str = '';
            var i = 0
            var tips = '爱猫生活小组今日帖子';
            if (data != null){
                $.each(data, function(key,value) {
                    if(key==0){
                        str = '<thead><tr bgcolor="#D9EDF7"><td colspan="4">'+tips+'</td></tr>'
                            +'<tr>'
                            +'<th class="text-center">#'+data.length+'</th>'
                            +'<th class="">讨论</th>'
                            +'<th class="">作者</th>'
                            +'<th class="">发帖时间</th>'
                            +'</tr></thead>'
                        $('#table').append(str);
                    }
                    str = '<tbody><tr>'
                        +'<th class="text-center">'+(data.length-i)+'</th>'
                        +'<td class=""><a href="javascript:void(0);" onclick="javascript:window.location.href='+"'"+value.shareUrl+"'"+'">' + value.title + '</a></td>'
                        +'<td class="">' + value.author + '</td>'
                        +'<td class="">' + value.createdTime + '</td>'
                        +'</tr></tbody>'
                    $('#table').append(str);
                    i+=1
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

$(document).ready(index());
