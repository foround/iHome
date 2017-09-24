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
        $('#estate').append(itemStr);
    });
    $('#parkingOfSubmit').on('click',function () {
        var estateOfParking = $("#estate").find("option:selected").val();
        var contactOfParking = $('#contact').val();
        var phoneOfParking = $('#phone').val();
        var nameOfParking = $('#name').val();
        var gatewayIdOfParking = $('#gatewayId').val();
        var lockMacOfParking = $('#lockMac').val();
        var passwordOfParking = $('#password').val();
        passwordOfParking = CryptoJS.SHA256(passwordOfParking).toString(CryptoJS.enc.Hex);

        $.ajax({
            type: "POST",
            url: "http://www.qhiehome.com:8080/web/api/parking/add",
            data: { estateId: estateOfParking, contact: contactOfParking, phone: phoneOfParking, name: nameOfParking, gatewayId: gatewayIdOfParking, lockMac: lockMacOfParking, password: passwordOfParking, state: 1},
            dataType: "json",
            success: function (data) {
                var code = data.errcode;
                if (code == 1) {
                    $('.message').modal('show');
                } else {
                    console.log(data)
                }
            },
            error: function () {
                
            }
        });
    })
});