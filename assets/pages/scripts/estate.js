$(function () {
    $('.ui.basic.modal')
        .modal('show');
    $('#loadBar').progress();
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    $("#sideBar").load('sideBar.html');
    $.getJSON( "http://www.qhiehome.com:8080/web/api/estate", function( data ) {
        var tempData = data.data;
        tempData = tempData.estateList;
        console.log(tempData);
        var items = [];
        for (var i =0,len=tempData.length;i<len;i++) {
            var num = i+1;
            var itemStr1 = "<div class='ui slider checkbox' data-value="+tempData[i].estate.id+" data-tooltip='禁用' data-position='top left'><input type='checkbox'><label></label></div>";
            var itemStr2 =num;
            var itemStr3 =tempData[i].estate.name;
            var itemStr4 =tempData[i].districtList[0].name+" "+tempData[i].districtList[1].name+" "+tempData[i].districtList[2].name;
            var itemStr5 ="<i class='yen icon'></i>"+ tempData[i].estate.unitPrice+"元/小时";
            var itemStr6 ="<i class='yen icon'></i>"+ tempData[i].estate.guaranteeFee+"元";
            var itemStr7 = "";
            if (localStorage.user="admin") {
                itemStr7 =tempData[i].estate.platformSettle + "%";
            } else {
                itemStr7 =tempData[i].estate.estateSettle + "%";
            }

            var itemStr8 ="<span class='label label-success' data-state="+tempData[i].estate.state+">已开放</span>";
            var itemStr9 ="<a class='positive small ui button' href='estate_detail.html?"+tempData[i].estate.id+"'>查看详情</a><button class='negative ui button hidden' data-value="+tempData[i].estate.id+">删除</button>";
            var item = {
                "禁用":itemStr1,
                "序号":itemStr2,
                "小区名称":itemStr3,
                "小区地址":itemStr4,
                "标准收费":itemStr5,
                "担保费":itemStr6,
                "结算比例":itemStr7,
                "状态":itemStr8,
                "操作":itemStr9
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
                { data: "禁用"},
                { data: "序号"},
                { data: "小区名称"},
                { data: "小区地址"},
                { data: "标准收费"},
                { data: "担保费"},
                { data: "结算比例"},
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

        $('.checkbox').on('change',function () {
            var $this = $(this);
            var estateId = $this.data('value');
            $.ajax({
                url: 'http://www.qhiehome.com:8080/web/api/estate/shift/'+ estateId,
                dataType: 'JSON',
                type: 'GET',
                success: function(data) {
                    if(data.errcode == 1) {
                        var state = $this.parents('td').siblings('td').children('span').data('state');
                        if (state == '1') {
                            $this.parents('td').siblings('td').children('span').data('state','0');
                            $this.parents('td').siblings('td').children('span').html('未开放');
                            $this.parents('td').siblings('td').children('span').removeClass('label-success');
                            $this.parents('td').siblings('td').children('span').addClass('label-danger');
                        } else {
                            $this.parents('td').siblings('td').children('span').data('state','1');
                            $this.parents('td').siblings('td').children('span').html('已开放');
                            $this.parents('td').siblings('td').children('span').addClass('label-success');
                            $this.parents('td').siblings('td').children('span').removeClass('label-danger');
                        }
                    } else {
                        $('.message').modal('show');
                        $('.message').children('.content').find('p').html(data.errmsg);
                    }
                }
            });

        });

        $('.negative').on('click',function () {
            var $this = $(this);
            $('.delete').modal('show');
            var estateId = $this.data('value');
            $('.confirm').on('click',function () {
                $.ajax({
                    url: 'http://www.qhiehome.com:8080/web/estate/removeAction',
                    data: 'id=' + estateId,
                    dataType: 'json',
                    type: 'POST',
                    success: function(data) {
                        if(data.errcode == 1) {
                            $this.parents('td').parents('tr').remove();
                        } else {
                            $('.message').modal('show');
                            $('.message').children('.content').find('p').html(data.errmsg);
                        }
                    }
                });
            })
        });
    });
    $('#estate_add').on('click',function () {
        window.location = "estate_add.html"
    })
});