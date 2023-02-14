function goToLogin() {
    document.location.replace('/login');
}
// this listener is for when the user tries to click on the at watchlist or pickles and sends them to the login. 
$('.content-buttons, .star-container').on('click', 'button,.fa-star', goToLogin);