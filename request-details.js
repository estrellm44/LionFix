// Read the request ID from the URL and look it up in the requests array.
const requestId = new URLSearchParams(window.location.search).get("id");
const request = requests.find(function (item) {
    return String(item.id) === requestId;
});

// Show the matching request's details, or "Request not found" if there's no match.
if (request) {
    document.getElementById("detail-id").textContent = request.id;
    document.getElementById("detail-description").textContent = request.description;
    document.getElementById("detail-location").textContent =
        request.campus + " — " + request.building + " — " + request.specific_location;
    document.getElementById("detail-status").textContent = request.status;
    document.getElementById("request-details").hidden = false;
} else {
    document.getElementById("request-not-found").hidden = false;
}