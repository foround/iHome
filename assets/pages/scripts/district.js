$(function () {
    $('.ui.basic.modal')
        .modal('show');
    $('#loadBar').progress();
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    $("#sideBar").load('sideBar.html');
    var url = "http://www.qhiehome.com:8080/web/api/district/0";
    var param = window.location.search.substr(1);
    if (param) {
        url = "http://www.qhiehome.com:8080/web/api/district/" + param;
    }
    $.getJSON( url, function( data ) {
        var tempData = data.data;
        console.log(tempData);
        tempData = tempData.districtList;
        var items = [];
        for (var i =0,len=tempData.length;i<len;i++) {
            var num = i+1;
            var itemStr1 = "<td class='collapsing'><div class='ui buttons' data-value="+tempData[i].parentId+"><button class='ui button active shutdown'>关闭</button> <div class='or'></div><button class='ui positive button disabled shutdown'>开放</button></div></td>";
            var itemStr2 =num;
            var itemStr3 ="<a href='district.html?"+tempData[i].id+"'>"+tempData[i].name+"</a>";
            var itemStr4 ="<span class='label label-success' data-state="+tempData[i].state+">已开放</span>";
            var itemStr5 ="<td><button class='positive small ui button editName'>编辑名称</button><button class='negative ui button hidden'>删除地区</button></td>";
            var item = {
                "关闭":itemStr1,
                "序号":itemStr2,
                "地区名称":itemStr3,
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
                { data: "关闭"},
                { data: "序号"},
                { data: "地区名称"},
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

        $("body").delegate(".shutdown","click",function(){
            var thisBtn = $(this);
            if (thisBtn.hasClass('positive')) {
                $('.closeOfArea').find('.header').html('开放该地区');
                $('.closeOfArea').find('.content').html('你确定开放该地区吗');
                $('.closeOfArea').modal('show');
            } else {
                $('.closeOfArea').find('.header').html('关闭该地区');
                $('.closeOfArea').find('.content').html('你关闭开放该地区吗');
                $('.closeOfArea').modal('show');
            }
            $('.actions > .positive').on('click', function () {
                thisBtn.removeClass('active')
                    .addClass('disabled');
                thisBtn.siblings('.button').removeClass('disabled')
                    .addClass('active');
                if (thisBtn.hasClass('positive')) {
                    thisBtn.parents('.sorting_1').siblings('td').children('span').removeClass('label-danger').addClass('label-success').html('已开放');
                } else {
                    thisBtn.parents('.sorting_1').siblings('td').children('span').removeClass('label-success').addClass('label-danger').html('未开放')
                }
            });
        });

        /*$('.shutdown').on('click',function () {
            var thisBtn = $(this);
            if (thisBtn.hasClass('positive')) {
                $('.closeOfArea').find('.header').html('开放该地区');
                $('.closeOfArea').find('.content').html('你确定开放该地区吗');
                $('.closeOfArea').modal('show');
            } else {
                $('.closeOfArea').find('.header').html('关闭该地区');
                $('.closeOfArea').find('.content').html('你关闭开放该地区吗');
                $('.closeOfArea').modal('show');
            }
            $('.actions > .positive').on('click', function () {
                thisBtn.removeClass('active')
                    .addClass('disabled');
                thisBtn.siblings('.button').removeClass('disabled')
                    .addClass('active');
                if (thisBtn.hasClass('positive')) {
                    thisBtn.parents('.sorting_1').siblings('td').children('span').removeClass('label-danger').addClass('label-success').html('已开放');
                } else {
                    thisBtn.parents('.sorting_1').siblings('td').children('span').removeClass('label-success').addClass('label-danger').html('未开放')
                }
            });
        });*/

        /*$('.editName').on('click',function () {
            var thisBtn = $(this);
            if (thisBtn.hasClass('positive')) {
                $('.closeOfArea').find('.header').html('开放该地区');
                $('.closeOfArea').find('.content').html('你确定开放该地区吗');
                $('.closeOfArea').modal('show');
            } else {
                $('.closeOfArea').find('.header').html('关闭该地区');
                $('.closeOfArea').find('.content').html('你关闭开放该地区吗');
                $('.closeOfArea').modal('show');
            }
            $('.actions > .positive').on('click', function () {
                thisBtn.removeClass('active')
                    .addClass('disabled');
                thisBtn.siblings('.button').removeClass('disabled')
                    .addClass('active');
                if (thisBtn.hasClass('positive')) {
                    thisBtn.parents('.sorting_1').siblings('td').children('span').removeClass('label-danger').addClass('label-success').html('已开放');
                } else {
                    thisBtn.parents('.sorting_1').siblings('td').children('span').removeClass('label-success').addClass('label-danger').html('未开放')
                }
            });
        });*/
    });
    $('#district_add').on('click',function () {
        $('.addOfArea').modal('show');
    });
    $('#districtName_submit').on('click',function () {
        var districtName = $('#districtName_add').val();
        $('.addOfArea').modal('hide');
        $.ajax({
            url: '/web/district/saveAction',
            data: 'parentId=0&name=' + districtName,
            dataType: 'json',
            type: 'POST',
            success: function(data) {
                if(data.errcode == 1) {
                    window.location.reload();
                } else {
                    toastr.error(data.errmsg);
                }
            }
        });
    })
});