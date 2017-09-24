$(function () {
    $('#logout').on('click',function () {
        localStorage.clear();
        window.location = 'login.html';
    });
    $("#sideBar").load('sideBar.html');
    $.getJSON( 'http://www.qhiehome.com:8080/web/api/admin/district/0', function( data ) {
        var tempData = data.data;
        tempData = tempData.districtList;
        console.log(tempData);
        var itemStr = '';
        for (var i =0,len=tempData.length;i<len;i++) {
            itemStr +="<option value="+tempData[i].id+">"+tempData[i].name + "</option>";
        }
        $('#prov').append(itemStr);
    });

    $('#prov').on('click',function () {
        $('#city').empty();
        var valOfProv = $('#prov').find("option:selected").val();
        var url = 'http://www.qhiehome.com:8080/web/api/admin/district/' + valOfProv;
        $.getJSON(url, function( data ) {
            var tempData = data.data;
            tempData = tempData.districtList;
            console.log(tempData);
            var itemStr = '<option>=请选择城市=</option>';
            for (var i =0,len=tempData.length;i<len;i++) {
                itemStr +="<option value="+tempData[i].id+">"+tempData[i].name + "</option>";
            }
            $('#city').append(itemStr);
            $('#city').removeClass('disabled');
        });
    });

    $('#city').on('click',function () {
        $('#country').empty();
        var valOfCity = $('#city').find("option:selected").val();
        var url = 'http://www.qhiehome.com:8080/web/api/admin/district/' + valOfCity;
        $.getJSON(url, function( data ) {
            var tempData = data.data;
            tempData = tempData.districtList;
            console.log(tempData);
            var itemStr = '<option>=请选择县区=</option>';
            for (var i =0,len=tempData.length;i<len;i++) {
                itemStr +="<option value="+tempData[i].id+">"+tempData[i].name + "</option>";
            }
            $('#country').append(itemStr);
            $('#country').removeClass('disabled');
        });
    });

    $('#estateOfSubmit').on('click',function () {
        var districtIdOfEstate = $("#country").find("option:selected").val();
        var nameOfEstate = $('#name').val();
        var aliasNameOfEstate = $('#aliasName').val();
        var addressOfEstate = $('#address').val();
        var longitudeOfEstate = $('#longitude').val();
        var latitudeOfEstate = $('#latitude').val();
        var introductionOfEstate = $('#introduction').val();
        var usernameOfEstate = $('#username').val();
        var passwordOfEstate = $('#password').val();
        var contactOfEstate = $('#contact').val();
        var phoneOfEstate = $('#phone').val();
        var unitPriceOfEstate = $('#unitPrice').val();
        var guaranteeFeeOfEstate = $('#guaranteeFee').val();
        var ownerSettleOfEstate = $('#ownerSettle').val();
        var estateSettleOfEstate = $('#estateSettle').val();
        var platformSettleOfEstate = $('#platformSettle').val();
        passwordOfEstate = CryptoJS.SHA256(passwordOfEstate).toString(CryptoJS.enc.Hex);

        $.ajax({
            type: "POST",
            url: "../../../measure/2.php",
            data: {
                districtId: districtIdOfEstate,
                name: nameOfEstate,
                aliasName: aliasNameOfEstate,
                address: addressOfEstate,
                x: longitudeOfEstate,
                y: latitudeOfEstate,
                introduction: introductionOfEstate,
                username: usernameOfEstate,
                password: passwordOfEstate,
                contact: contactOfEstate,
                phone: phoneOfEstate,
                unitPrice: unitPriceOfEstate,
                guaranteeFee: guaranteeFeeOfEstate,
                ownerSettle: ownerSettleOfEstate,
                estateSettle: estateSettleOfEstate,
                platformSettle: platformSettleOfEstate,
                balance: 0,
                state: 1
            },
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
    });
});