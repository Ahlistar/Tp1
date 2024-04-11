// Event listener for form submission
document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the search query
    const query = event.target.elements['query'].value;

    // Redirect the user to the /search endpoint with the query
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
});
