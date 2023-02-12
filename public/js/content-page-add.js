$(document).ready(function () {
    $("#add-list-dropdown-btn").click(function () {
        $(".dropdown").toggleClass("is-active")
    });
  });
  //function addToWatchlist 
  async function addToWatchlist(event) {
    event.preventDefault();
  
    const loc = window.location.toString().split('/');
    const type = loc[loc.length - 2];
    const id = loc[loc.length - 1];
    const title = $('h2.title').text().trim();
    const poster = document.querySelector('img.poster').getAttribute('src');
    const year = document.querySelector('span.release-date').textContent.split('/')[2];
    const status = $(this).attr('data-watch-status');
    try {
        const response = await fetch('/api/watchlist', {
            method: 'POST',
            body: JSON.stringify({
                type,
                id,
                title,
                poster,
                year,
                status
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            updateAlertBox(`This is already in your watchlist.`);
        }
    } catch (err) {
        console.log(err);
    }
  }
  //Event listen for on.click
  $('.watchlist-dropdown-menu').on('click', '.watch-status-btn', addToWatchlist);
  