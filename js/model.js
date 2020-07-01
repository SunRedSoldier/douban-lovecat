function loadKey() {
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
            if (data != null){
                $.each(data, function(key,value) {
                    if(key != 'ID'){
                        $("#"+key).val(value);
                    }
                });
                $("#updateKeyModalLabel").text("当前关键词")
            }else{
                $("#updateKeyModalLabel").text("当前没有关键词！");
            }
            
        },
        error : function(data) {
            $("#updateKeyModalLabel").text("获取当前关键词失败！");
        }
    });	

}

function checkNull(t){
    if(t==''){
        return null
    }else{
        return t
    }
}
function updateKey(){
    var key1 = $.trim($("#key1").val());
    var key2 = $.trim($("#key2").val());
    var key3 = $.trim($("#key3").val());
    var key4 = $.trim($("#key4").val());
    key1 = checkNull(key1)
    key2 = checkNull(key2)
    key3 = checkNull(key3)
    key4 = checkNull(key4)
    var rule = $("#rule").val();
    if (rule == ''){
        rule = '0';
    }
    var da = {"key1":key1,"key2":key2,"key3":key3,"key4":key4,"rulecode":rule };
    $.ajax({
        type : "POST",
        url : "http://120.79.187.63:5701/catoption/upkeyword",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(da),
        dataType : "json",
        success : function(data) {
            if(data['code']=='200'){
                $("#updateKeyModalLabel").text("修改成功！")
                hide();
            }else{
                $("#updateKeyModalLabel").text("修改失败！")
            }
        },
        error : function(data) {
            $("#updateKeyModalLabel").text("出现错误！")
        }
    });
}

function hide(){
    $('#updateKeyModal').modal('hide')
}

$('[name="status"]').bootstrapSwitch({
    onText: "交集",  // 设置ON文本  
    offText: "并集",  // 设置OFF文本
    onColor: "success",  // 设置ON文本颜色     (info/success/warning/danger/primary)  
    offColor: "info",  // 设置OFF文本颜色        (info/success/warning/danger/primary)  
    size: "small",   // 设置控件大小,从小到大  (mini/small/normal/large)  
    handleWidth: "28",//设置控件宽度
    onSwitchChange: function (event, state) {
        if (state == true) {
            $('#rule').val('1');
        } else {
            $('#rule').val('0');
        }
    }

})

$('#updateKeyModal').on('show.bs.modal', function (e) {
    $("#updateKeyModalLabel").text("正在获取当前关键词...")
    loadKey();
})



