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
    // Show the status and give CSS a way to style the badge.
    const statusBadge = document.getElementById("detail-status");
    statusBadge.textContent = request.status;
    statusBadge.dataset.status = request.status;
        
    document.getElementById("detail-category").textContent =
        request.category || "Not assigned yet";
    document.getElementById("detail-observed").textContent =
        request.observedTime || "Not recorded";
    document.getElementById("detail-last-update").textContent =
        request.updatedTime || request.createdTime || "Not recorded";
    document.getElementById("detail-comments").textContent =
        request.additionalComments?.trim() || "No additional comments provided.";
    
    // Define steps and find request's current status
    const statuses = [
        "Submitted",
        "Pending",
        "Assigned",
        "In Progress",
        "Closed"
    ];

    const currentStatusIndex = statuses.indexOf(request.status);
    const progressList = document.getElementById("status-progress");  

    // Create progress step for each status
    statuses.forEach(function (status, index) {
        const step = document.createElement("li");
        const marker = document.createElement("span");
        const text = document.createElement("div");
        const title = document.createElement("strong");
        const caption = document.createElement("p");

        marker.className = "status-marker";
        title.textContent = status;

    if (currentStatusIndex === -1) {
        marker.textContent = index + 1;
        caption.textContent = "Status unavailable";
    } else if (index < currentStatusIndex) {
        step.className = "is-complete";
        marker.textContent = "✓";
        caption.textContent = "Completed";
    } else if (index === currentStatusIndex) {
        step.className = "is-current";
        step.setAttribute("aria-current", "step");
        marker.textContent = index + 1;
        caption.textContent = "Current status";
    } else {
        marker.textContent = index + 1;
        caption.textContent = "Upcoming";
    }

    text.append(title, caption);
    step.append(marker, text);
    progressList.appendChild(step);
});
    // Unhide details
    document.getElementById("request-details").hidden = false;
} else {
    document.getElementById("request-not-found").hidden = false;
}