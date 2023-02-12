//function for the search and displays all data for the user
function search(event) {
    event.preventDefault();
    //search-filter and search-input will be needed in handlebars
    //-> /search/
    const shelia = $('.search-filter').val().trim();
    let search = $('search-input').val().trim();
    search = search.split(' ').join('+');
    document.location.replace('/search/' + shelia + '/' + search);
}
document.querySelector('#search-form').addEventListener('submit', search);