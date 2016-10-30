/* #####################################################################
 #
 #   Project       : Modal Login with jQuery Effects
 #   Author        : Rodrigo Amarante (rodrigockamarante)
 #   Version       : 1.0
 #   Created       : 07/29/2015
 #   Last Change   : 08/04/2015
 #
 ##################################################################### */

$(function () {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;


    $("#login_submit").click(function () {
        var lg_username = $('#login_username').val();
        var lg_password = $('#login_password').val();
        $.post("about_handler.php", {
            section: "login",
            login_username: lg_username,
            login_password: lg_password
        }, function (result) {
            if (result == "-1") {
                $('#login-error').show();
            }
            else {
                $('#login_top ').html(result);
                $('.glyphicon').click();
            }
        });
        return false;
    });
    $("#find_meal_button").click(function () {
        var section = $("input[name=section]").val();
        var xaddress = $("input[name=xaddress]").val();
        var yaddress = $("input[name=yaddress]").val();
        var start_time = $("input[name=start_time]").val();
        var end_time = $("input[name=end_time]").val();
        food_type = []
        $.each($("input[name='food_type[]']:checked"), function () {
            food_type.push($(this).val());
        });
        interests = [];
        $.each($("input[name='interests[]']:checked"), function () {
            interests.push($(this).val());
        });

        $.post("about_handler.php", {
            section: section,
            xaddress: xaddress,
            yaddress: yaddress,
            start_time: start_time,
            end_time: end_time,
            food_type: food_type,
            interests: interests
        }, function (result) {
            $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBJ-4qkk1ERXu7kd9bkOIqAOkTit-VUo-k", function () {
                var lat = window.something.geometry.location.lat;
                var lon = window.something.geometry.location.lng;
                var title = window.something.name;
                initMap(lat, lon, title);
            });
            $('#meal').modal('hide');
            $('#mealModal1').modal('show');

        });
        return false;
    });

    $("#lost-form").submit(function () {
        var $ls_email = $('#lost_email').val();
        if ($ls_email == "ERROR") {
            msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
        } else {
            msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
        }
        return false;
    });
    $("#register-form").submit(function () {
        var rg_username = $('#register_username').val();
        var rg_email = $('#register_email').val();
        var rg_password = $('#register_password').val();
        $.post("about_handler.php", {
            section: "register",
            register_username: rg_username,
            register_password: rg_password,
            register_email: rg_email
        }, function (result) {
            if (result == "-1") {
                $('#register-error').show();
            }
            else {
                console.log("here");
                $('#register-good').show();
            }
        });
        return false;
    });

    $('#login_register_btn').click(function () {
        modalAnimate($formLogin, $formRegister)
    });
    $('#register_login_btn').click(function () {
        modalAnimate($formRegister, $formLogin);
    });
    $('#login_lost_btn').click(function () {
        modalAnimate($formLogin, $formLost);
    });
    $('#lost_login_btn').click(function () {
        modalAnimate($formLost, $formLogin);
    });
    $('#lost_register_btn').click(function () {
        modalAnimate($formLost, $formRegister);
    });
    $('#register_lost_btn').click(function () {
        modalAnimate($formRegister, $formLost);
    });

    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({height: $newH}, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function () {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }
})
;