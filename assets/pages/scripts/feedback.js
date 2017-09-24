$(function () {
    $('.ui.basic.modal')
        .modal('show');
    $('#loadBar').progress();
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    $("#sideBar").load('sideBar.html');
    $.getJSON( 'http://www.qhiehome.com:8080/web/api/feedback', function( data ) {
        var tempData = data.data;
        console.log(tempData);
        tempData = tempData.feedbackList;
        var items = [];
        for (var i =0,len=tempData.length;i<len;i++) {
            var num = i+1;
            var itemStr1 =num;
            var itemStr2 ="<div class='ui teal message'><div class='header'>"+tempData[i].id+"</div><ul class='list'>" +
                "<p>"+tempData[i].advice+"</p> </ul></div>";

            var item = {
                "序号":itemStr1,
                "反馈意见":itemStr2
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
                { data: "序号"},
                { data: "反馈意见"}
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