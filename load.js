document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader-container');
    const button = document.querySelector('button');

    function showLoader() {
        loader.style.display = 'flex';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    button.addEventListener('click', function() {
        showLoader();
        
        // Simulate an operation, like a fetch request
        setTimeout(function() {
            hideLoader();
        }, 3000); // Hide loader after 2 seconds
    });
});
