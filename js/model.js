function qkeyword() {
    // remerror()
    $.ajax({
        type : "GET",
        url : "http://120.79.187.63:5701/catoption/qkeyword",
        data : {
            //page:page
        },
        dataType : "json",
        success : function(data) {
            data = data['data'][0]
            var str = '';
            var tips = '修改关键词';
            if (data != null){
                $.each(data, function(key,value) {
                    if(key != 'ID'){
                        $("#"+key).val(value);
                    }
                });
            }else{
                $("#updateKeyModalLabel").text("当前没有关键词！");
            }
            
        },
        error : function(data) {
            $("#updateKeyModalLabel").text("获取当前关键词失败！");
        }
    });	

}


$(document).ready(qkeyword());
