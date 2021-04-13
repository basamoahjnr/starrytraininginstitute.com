$(function () {

    window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change');
    }

    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change');
    }

    var contactForm = '#admission-form';

    $(contactForm).validator();

    $(contactForm).on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "admissions.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.program;

                    var alertBox = '<div class="alert '
                        + messageAlert
                        + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'
                        + messageText + '</div>';

                    if (messageAlert && messageText) {
                        $(contactForm).find('.messages').html(alertBox);
                        $(contactForm)[0].reset();
                        grecaptcha.reset();
                    }
                }
            });
            return false;
        }
    })
});