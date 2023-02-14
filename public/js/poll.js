//declare variables. Bulma really like giving stars but we want pickles. 
const pollAwards = $('div.control.star');
let rated = false;
let pickleDefault;

//function to start the ratings, polling the user what they like for given stars, thumbs up, pickles, don't know what we are choosing. Front end hasn't decided.  
//we originally want to use Rotten Tomatoes but they are nice about giving them out for api reasons
function pollRating(event) {
  var id = $(this).attr("id");
  removeAllRatings();
  
  let stars = id ? id : pickleDefault;
  addPoll(stars);
}
//function to add stars from rating on movie card
function addPoll(int) {
    for (let i = 1; i <= int; i++) {
      $('#' + i).addClass('checked');
    }
  }
//function to remove stars from rating on movie card
function removeAllRatings() {
  $('.fa-star').removeClass('checked');
}
//function to remove star from rating on movie card
function pollRemove(event) {
    removeAllRatings();
    if (pickleDefault) {
      addPoll(pickleDefault);
    }
  }
// function to handle the ratings 
async function ratingHandler(event) {
  var rating = $(this).attr("id");
  const loc = window.location.toString().split("/");
  const content_id = loc[loc.length - 1];
  const content_type = loc[loc.length - 2];
  let method = rated ? 'PUT' : 'POST';
  try {
    //try not to write this response at 2am in the morning a typo here really messed you up to be able to keep the pickles up. 
    const response = await fetch('/api/poll', {
      method,
      body: JSON.stringify({
        content_type,
        content_id,
        rating
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (response.ok) {
      document.location.reload();
    } else {
      updateAlertBox();
    }
  } catch (err) {
    console.log(err);
  }
}
$(".fa-star").on("mouseover", pollRating);
$(".fa-star").on("mouseout", pollRemove);
$(".fa-star").on("click", ratingHandler);

if (pollAwards.attr('data-user-rated')) {
  pickleDefault = parseInt(pollAwards.attr('data-user-rating'));
  rated = true;
  pollRating();
}