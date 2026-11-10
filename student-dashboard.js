// Great with time of day
console.log("Greeting file loaded");

const hour = new Date().getHours();
let greeting;

if (hour < 12) {
    greeting = "Good morning";
} else if (hour < 18) {
    greeting = "Good afternoon";    
} else {
    greeting = "Good evening";
}

document.getElementById("greeting").textContent = greeting;

// Find elements used to display requests
const emptyMessage = document.getElementById("requests-empty");
const requestsList = document.getElementById("requests-list");

// Track which group of requests is displayed
const requestsPerPage = 4;
let currentPage = 1;

const pagination = document.getElementById("requests-pagination");
const previousButton = document.getElementById("previous-page");
const nextButton = document.getElementById("next-page");
const pageNumber = document.getElementById("page-number");

// Display the requests for the current page
function displayRequests() {
    requestsList.replaceChildren();

    if (requests.length === 0) {
        emptyMessage.hidden = false;
        requestsList.hidden = true;
        pagination.hidden = true;
        return;
    }

    emptyMessage.hidden = true;
    requestsList.hidden = false;

    const totalPages = Math.ceil(requests.length / requestsPerPage);
    const startIndex = (currentPage - 1) * requestsPerPage;
    const pageRequests = requests.slice(
        startIndex,
        startIndex + requestsPerPage
    );

    pageRequests.forEach(function (request) {
        const listItem = document.createElement("li");

        listItem.textContent =
            request.id + " " + request.category + "\n" +
            request.description + "\n" +
            request.campus + " " + request.building + " " + request.specific_location + "\n" +
            request.status;

        // Adds link to each request
        const detailsLink = document.createElement("a");
        detailsLink.href = "request-details.html?id=" + request.id;
        detailsLink.textContent = "View details";
        listItem.append(document.createElement("br"), detailsLink);

        requestsList.appendChild(listItem);
    });

    pagination.hidden = totalPages <= 1;
    pageNumber.textContent = "Page " + currentPage + " of " + totalPages;

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

// Put completed requests last, then sort each group newest first
requests.sort(function (a, b) {
    const aCompleted = a.status === "Completed";
    const bCompleted = b.status === "Completed";

    if (aCompleted && !bCompleted) {
        return 1;
    }

    if (!aCompleted && bCompleted) {
        return -1;
    }

    return new Date(b.createdTime) - new Date(a.createdTime);
});

// Show the first page when the dashboard loads
displayRequests();

// Go to previous page
previousButton.addEventListener("click", function(){
    currentPage--;
    displayRequests();
});

// Go to next page
nextButton.addEventListener("click", function(){
    currentPage++;
    displayRequests();
});

