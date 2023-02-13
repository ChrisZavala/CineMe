//function goToLogin all this does is send user to the login or signup if they try to rate a movie or add a watchlist
function goToLogin() {
    document.location.replace('/login');
}
$('.content-buttons, .star-container').on('click', 'button,.fa-star', goToLogin);