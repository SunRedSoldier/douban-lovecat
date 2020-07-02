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
                $('#updateKeyModal').modal('hide')
            }else{
                $("#updateKeyModalLabel").text("修改失败！")
            }
        },
        error : function(data) {
            $("#updateKeyModalLabel").text("出现错误！")
        }
    });
}

$('#updateKeyModal').on('show.bs.modal', function (e) {
    $("#updateKeyModalLabel").text("正在获取当前关键词...")
    loadKey();
})



/* pushStatusModal */
function loadStatus() {
    $.ajax({
        type : "GET",
        url : "http://120.79.187.63:5701/catoption/qpushstatus",
        data : {
            //page:page
        },
        dataType : "json",
        success : function(data) {
            data = data['data'][0]
            $.each(data, function(key,value) {
                if(key!='ID'){
                    if(value == 1){
                        $('[id="'+key+'"]').bootstrapSwitch("state", true);
                    }else{
                        $('[id="'+key+'"]').bootstrapSwitch("state", false);
                    }
                }
            });
            $("#pushStatusModalLabel").text("当前推送通道状态")
            
        },
        error : function(data) {
            $("#pushStatusModalLabel").text("获取当前推送通道状态失败！");
        }
    });	

}

function updatePushStatus(){
    var status_qq = $('[name="status-qq"]').val();
    var status_jsd = $('[name="status-jsd"]').val();
    var status_wx = $('[name="status-wx"]').val();
    var da = { "qq":status_qq,"jsd":status_jsd,"wx":status_wx };
    $.ajax({
        type : "POST",
        url : "http://120.79.187.63:5701/catoption/uppushstatus",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(da),
        dataType : "json",
        success : function(data) {
            if(data['code']=='200'){
                $("#pushStatusModalLabel").text("修改成功！")
                $('#pushStatusModal').modal('hide')
            }else{
                $("#pushStatusModalLabel").text("修改失败！")
            }
        },
        error : function(data) {
            $("#pushStatusModalLabel").text("出现错误！")
        }
    });
}

$('#pushStatusModal').on('show.bs.modal', function (e) {
    $("#pushStatusModalLabel").text("正在获取当前推送通道状态...")
    loadStatus();
})



// 关键词规则Switch
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
// qq推送Switch
$('[id="status_qq"]').bootstrapSwitch({
    onText: "开启",  // 设置ON文本  
    offText: "关闭",  // 设置OFF文本
    onColor: "success",  // 设置ON文本颜色     (info/success/warning/danger/primary)  
    offColor: "danger",  // 设置OFF文本颜色        (info/success/warning/danger/primary)  
    size: "small",   // 设置控件大小,从小到大  (mini/small/normal/large)  
    handleWidth: "28",//设置控件宽度
    onSwitchChange: function (event, state) {
        if (state == true) {
            $('[name="status-qq"]').val(1);
        } else {
            $('[name="status-qq"]').val(0);
        }
    }
})
// WXPusher推送Switch
$('[id="status_wx"]').bootstrapSwitch({
    onText: "开启",  // 设置ON文本  
    offText: "关闭",  // 设置OFF文本
    onColor: "success",  // 设置ON文本颜色     (info/success/warning/danger/primary)  
    offColor: "danger",  // 设置OFF文本颜色        (info/success/warning/danger/primary)  
    size: "small",   // 设置控件大小,从小到大  (mini/small/normal/large)  
    handleWidth: "28",//设置控件宽度
    onSwitchChange: function (event, state) {
        if (state == true) {
            $('[name="status-wx"]').val(1);
        } else {
            $('[name="status-wx"]').val(0);
        }
    }
})
// jsd推送Switch
$('[id="status_jsd"]').bootstrapSwitch({
    onText: "开启",  // 设置ON文本  
    offText: "关闭",  // 设置OFF文本
    onColor: "success",  // 设置ON文本颜色     (info/success/warning/danger/primary)  
    offColor: "danger",  // 设置OFF文本颜色        (info/success/warning/danger/primary)  
    size: "small",   // 设置控件大小,从小到大  (mini/small/normal/large)  
    handleWidth: "28",//设置控件宽度
    onSwitchChange: function (event, state) {
        if (state == true) {
            $('[name="status-jsd"]').val(1);
        } else {
            $('[name="status-jsd"]').val(0);
        }
    }
})
