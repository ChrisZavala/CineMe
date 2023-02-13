const alertBox = $('.alert-box');
const alertText = $('.alert-text');

let alertTimeout;

// displays the alert
function updateAlertBox(message) {
    if (!message) {
        message = 'An error has occurred. Please try again.';
    }
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    alertText.text(message);
    alertBox.removeClass('is-hidden');
    alertTimeout = setTimeout(function () {
        alertBox.addClass('is-hidden');
    }, 5000);
}

// listener shela
$('#dismiss-notification-btn').on('click', function () {
    if (alertTimeout) {
        clearTimeout(alertTimeout);
    }
    alertBox.addClass('is-hidden');
});