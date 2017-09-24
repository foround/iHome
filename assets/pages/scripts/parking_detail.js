$(function () {
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    $("#sideBar").load('sideBar.html');
    //补0操作
    var getzf = function(num){
        if(parseInt(num) < 10){
            num = '0'+num;
        }
        return num;
    };
    var  getMyDate = function(str){
        var oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
        return oTime;
    };

    $('.ui.basic.modal')
        .modal('show');
    $('#loadBar').progress();
    var url = "";
    var param = window.location.search.substr(1);
    if (param) {
        url = "http://www.qhiehome.com:8080/web/api/parking/" + param + "/publish";
    }
    $.getJSON( url, function( data ) {
        var tempData = data.data;
        console.log(tempData);
        tempData = tempData.share;
        var items = [];
        for (var i =0,len=tempData.length;i<len;i++) {
            var num = i+1;
            var itemStr1 =num;
            var itemStr2 = getMyDate(tempData[i].startTime);
            var itemStr3 = getMyDate(tempData[i].endTime);
            if (tempData[i].state == '29') {
                var itemStr4 = "<span class='label label-danger' data-state="+tempData[i].state+">已删除</span>";
            } else {
                var itemStr4 = "<span class='label label-success' data-state="+tempData[i].state+">	正常可预约</span>";
            }

            var item = {
                "序号":itemStr1,
                "开始时间":itemStr2,
                "结束时间":itemStr3,
                "状态":itemStr4
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
                { data: "开始时间"},
                { data: "结束时间"},
                { data: "状态"}
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
        window.location = 'estate_detail.html?'+ param;
    });
});