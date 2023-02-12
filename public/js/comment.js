async function commentFormHandler(event) {
    event.preventDefault();
    const shelia = window.location.toString().split('/');
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const post_id = shelia[shelia.length - 1];
    const type = shelia[shelia.length - 2];
  
    if (comment_text) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ post_id, comment_text, type}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          updateAlertBox();
        }
      }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);