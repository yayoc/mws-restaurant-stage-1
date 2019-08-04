window.addEventListener('load', function() {

    async function updateOnlineStatus(event) {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
           // post stored review if needed.
           const review = await DBHelper.getReviewRequestFromIDB();
           if (review) {
               await DBHelper.createRestaurantReview(review, (res, error) => {
                   if (error) {
                       console.error(error);
                   } else {
                       window.alert(`Your review ${review.comments} was registered.`);
                       // Delete review requests from IDB.
                       DBHelper.deleteReviewRequestFromIDB();
                   }
               })
           }
        }
    }

    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});