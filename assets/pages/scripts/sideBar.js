$(function () {
    console.log($(document).width())
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    var url = window.location + '';
    var idx1 = url. lastIndexOf('/');
    var idx2 = url. indexOf('.html');
    idx1 = idx1 + 1;
    var num = idx2 - idx1;
    var urlName = url.substr(idx1,num);
    if ( $('.item').hasClass('active')) {
        $('.item').removeClass('active');
        console.log(urlName);
        urlName = '.' + urlName;
        $(urlName).addClass('active');
    }
    if (localStorage.user !== "admin") {
        $('#estateManage').addClass('hidden');
        $('#districtManage').addClass('hidden');
        $('#parkingManage').addClass('hidden');
    } else {
        $('#estateManage').removeClass('hidden');
        $('#districtManage').removeClass('hidden');
        $('#parkingManage').removeClass('hidden');
    }
});