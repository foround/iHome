$(function () {
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    $("#sideBar").load('sideBar.html');
    $.getJSON( 'http://www.qhiehome.com:8080/web/api/admin/estate', function( data ) {
        var tempData = data.data;
        tempData = tempData.estateList;
        console.log(tempData);
        var itemStr = '';
        for (var i =0,len=tempData.length;i<len;i++) {
            itemStr +="<option value="+tempData[i].estate.id+">"+tempData[i].estate.name + "</option>";
        }
        $('#prov').append(itemStr);
    });

    $("input:text").click(function() {
        $(this).parent().find("input:file").click();
    });

    $('input:file', '.ui.action.input')
        .on('change', function(e) {
            var name = e.target.files[0].name;
            $('input:text', $(e.target).parent()).val(name);
        });
    $('#navigationOfUpload').on('click', function () {
        var estateIdOfAdd = $("#prov").find("option:selected").val();
        var formData = new FormData();
        formData.append('filename', $('#navigation')[0].files[0]);
        formData.append('estateId', estateIdOfAdd);
        console.log(formData.get('name'));
        console.log(formData.get('estateId'));
        $('#navigationOfUpload').addClass('loading');
        $.ajax({
            url: 'http://www.qhiehome.com:8080/web/api/estate/pic/nav',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        }).done(function(res) {
            $('#navigationOfUpload').removeClass('loading');
            if (res.errcode == 1) {
                $('.message')
                    .modal('show');
            } else {
                $('.error')
                    .modal('show');
            }
        }).fail(function(res) {
            $('#navigationOfUpload').removeClass('loading');
            $('.error')
                .modal('show');
        });
    });
    $('#passOfUpload').on('click', function () {
        var formData = new FormData();
        formData.append('file', $('#pass')[0].files[0]);
        formData.append('pass', '');
        console.log(formData.get('name'));
        console.log(formData.get('estateId'));
        $('#passOfUpload').addClass('loading');
        $.ajax({
            url: 'http://www.qhiehome.com:8080/web/api/admin/pic/pass',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        }).done(function(res) {
            $('#passOfUpload').removeClass('loading');
            if (res.errcode == 1) {
                $('.pass')
                    .modal('show');
            } else {
                $('.error')
                    .modal('show');
            }
        }).fail(function(res) {
            $('#passOfUpload').removeClass('loading');
            $('.error')
                .modal('show');
        });
    });
});