$(function () {
    $('.ui.basic.modal')
        .modal('show');
    $('#loadBar').progress();
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    $("#sideBar").load('sideBar.html');
    var url = "";
    var param = window.location.search.substr(1);
    if (param) {
        url = "http://www.qhiehome.com:8080/web/api/estate/" + param + "/parking";
    }
    $.getJSON( url, function( data ) {
        var tempData = data.data;
        console.log(tempData);
        tempData = tempData.parkingList;
        var items = [];
        for (var i =0,len=tempData.length;i<len;i++) {
            var num = i+1;
            var itemStr1 =num;
            var itemStr2 =tempData[i].name;
            var itemStr3 = tempData[i].contact;
            var itemStr4 = tempData[i].phone;
            var itemStr5 = tempData[i].gatewayId;
            var itemStr6 = tempData[i].lockMac;
            if (tempData[i].state == '12') {
                var itemStr7 = "<span class='label label-success' data-state="+tempData[i].state+">已开放</span>";
            }
            var itemStr8 = "<a class='positive small ui button' href='parking_detail.html?"+tempData[i].id+"'>查看详情</a>";

            var item = {
                "序号":itemStr1,
                "车位名称":itemStr2,
                "业主":itemStr3,
                "联系电话":itemStr4,
                "网关ID":itemStr5,
                "锁地址":itemStr6,
                "状态":itemStr7,
                "操作":itemStr8
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
            destroy:true,
            data: dataOfTable.data,
            columns: [
                { data: "序号"},
                { data: "车位名称"},
                { data: "业主"},
                { data: "联系电话"},
                { data: "网关ID"},
                { data: "锁地址"},
                { data: "状态"},
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
    $('#back').on('click',function () {
        window.location = 'estate.html';
    });
});