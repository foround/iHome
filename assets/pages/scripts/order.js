$(function () {
    $('.ui.basic.modal')
        .modal('show');
    $('#loadBar').progress();
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    $("#sideBar").load('sideBar.html');
    $.getJSON( '/web/api/order', function( data ) {
        var tempData = data.data;
        console.log(tempData);
        tempData = tempData.order;
        var items = [];
        for (var i =0,len=tempData.length;i<len;i++) {
            var num = i+1;
            var itemStr1 =tempData[i].id;
            var itemStr2 =tempData[i].parkingId;
            var itemStr5 ="<i class='yen icon'></i>"+tempData[i].payFee+"元";
            var estateFee = tempData[i].estateFee == undefined ? 0 : tempData[i].estateFee;
            var ownerFee = tempData[i].ownerFee == undefined ? 0 : tempData[i].ownerFee;
            var platformFee = tempData[i].platformFee == undefined ? 0 : tempData[i].platformFee;
            var itemStr7 =estateFee+"元/"+ownerFee+"元/"+platformFee+"元";
            if (tempData[i].state == 38) {
                var itemStr6 ="<span class='label label-danger'>超时已取消</span>";
                var itemStr3 = "<i class='wait icon'></i>超时无记录";
                var itemStr4 = "<i class='wait icon'></i>超时无记录";
            } else if (tempData[i].state == 39) {
                var itemStr6 ="<span class='label label-danger'>用户已取消</span>";
                var itemStr3 = "<i class='undo icon'></i>取消无记录";
                var itemStr4 = "<i class='undo icon'></i>取消无记录";
            } else {
                var itemStr6 ="<span class='label label-success'>已支付</span>";
                var itemStr3 = "<i class='upload icon'></i>等待上传";
                var itemStr4 = "<i class='upload icon'></i>等待上传";
            }
            var item = {
                "关闭":itemStr1,
                "停车位":itemStr2,
                "停车时间":itemStr3,
                "离开时间":itemStr4,
                "应收费用":itemStr5,
                "结算分成(物业/业主/平台)":itemStr7,
                "操作":itemStr6
            };
            items.push(item);
        }
        var dataOfTable={
            "data":items
        };
        $('table').dataTable({
            "language" : {
                "sProcessing":   "处理中...",
                "sLengthMenu":   "显示 _MENU_ 项结果",
                "sZeroRecords":  "没有匹配结果",
                "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix":  "",
                "sSearch":       "搜索:",
                "sUrl":          "",
                "sEmptyTable":     "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands":  ",",
                "oPaginate": {
                    "sFirst":    "首页",
                    "sPrevious": "上页",
                    "sNext":     "下页",
                    "sLast":     "末页"
                },
                "oAria": {
                    "sSortAscending":  ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },
            data: dataOfTable.data,
            columns: [
                { data: "关闭"},
                { data: "停车位"},
                { data: "停车时间"},
                { data: "离开时间"},
                { data: "应收费用"},
                { data: "结算分成(物业/业主/平台)"},
                { data: "操作"}
            ]
        });
        $('#loadBar').data('percent',100);
        setTimeout(function () {
            $('#loadBar').progress();
            $('#loadBar').children('.label').html('100% 已加载');
        },1000);
        setTimeout(function () {
            $('.ui.basic.modal')
                .modal('hide');
        },2000);
    });
});