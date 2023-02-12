function cardClickHandler(event) {
    event.preventDefault();

    // gets the movie card when the button is clicked on the card,  id in db will pull from attr.
    const card = $(this).closest('.content-card');
    const id = card.attr('data-watchlist-id');
    // if the button was a remove-button, then it will call the function to delete the item
    // or it will just update status
    if ($(this).hasClass('remove-button')) {
        removeFromWatchlist(card, id);
    } else {
        const newStatus = $(this).attr('data-watch-status');
        changeWatchStatus(card, id, newStatus);
    }
}
// function to update status of movie watchlist either currently watching, will watch, or completed. 
async function changeWatchStatus(card, id, status) {
    try {
        const response = await fetch('/api/watchlist/' + id, {
            method: 'PUT',
            body: JSON.stringify({
                status
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            // if the api call was successful, the card will be moved to the appropriate container
            //handlebars look here for this 
            card.appendTo($('ul.card-container[data-status-list="' + status + '"]'));
        } else {
            updateAlertBox();
        }
    } catch (err) {
        updateAlertBox();
    }
}
//here is our delete from the watchlist function 
async function removeFromWatchlist(card, id) {
    try {
        const response = await fetch('/api/watchlist' + id, {
            method: 'DELETE',
        });
        if(!response.ok) {
            card.slideUP(100, function () {
                $(this).remove();
            })
        }else{
            updateAlertBox();
        }
    } catch (err) {
        updateAlertBox();
        console.log(err);
    }
}
//Event Listener for click on the card
$('.watchlist-container').on('click', cardClickHandler);
