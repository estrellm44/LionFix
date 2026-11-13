// Display the selected request's details, status progress, and messages.
// Keep each staff question and its replies together in a dropdown.

// Read the request ID from the URL and find the matching request.
const requestId = new URLSearchParams(window.location.search).get("id");
const request = requests.find(function (item) {
    return String(item.id) === requestId;
});

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

    // Define the progress steps and find the request's current step.
    const statuses = ["Submitted", "Pending", "Assigned", "In Progress", "Closed"];
    const currentStatusIndex = statuses.indexOf(request.status);
    const progressList = document.getElementById("status-progress");

    // Create one progress step for each status.
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

    // Find the most recent posting time for an update or inquiry.
function latestActivity(message) {
    let latest = new Date(message.postedAt).getTime();

    for (const reply of message.replies ?? []) {
        latest = Math.max(latest, new Date(reply.postedAt).getTime());
    }

    return latest;
}

// Sort a copy so the original request data stays in its original order.
const messages = [...(request.messages ?? [])].sort(function (a, b) {
    return latestActivity(b) - latestActivity(a);
});


    const messagesList = document.getElementById("messages-list");
    const messagesEmpty = document.getElementById("messages-empty");

    messagesEmpty.hidden = messages.length > 0;
    messagesList.hidden = messages.length === 0;

    messages.forEach(function (message) {
        const item = document.createElement("li");
        item.className = "message";

        const heading = document.createElement("strong");
        heading.textContent = `${message.author} · ${message.postedAt}`;

        // General updates appear on their own.
        if (message.type !== "inquiry") {
            const body = document.createElement("p");
            body.textContent = message.text;
            item.append(heading, body);
            messagesList.appendChild(item);
            return;
        }

        // Use the staff question as the clickable title of its dropdown.
        const thread = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = message.needsReply
            ? `${message.text} — Response needed`
            : message.text;

        const replies = document.createElement("ul");
        replies.className = "inquiry-replies";
        thread.append(summary, heading, replies);

        // Add a reply to this question's list.
        function showReply(reply) {
            const entry = document.createElement("li");
            entry.className = "message message-reply";

            const byline = document.createElement("strong");
            byline.textContent = `${reply.author} · ${reply.postedAt}`;

            const body = document.createElement("p");
            body.textContent = reply.text;

            entry.append(byline, body);
            replies.appendChild(entry);
        }

        (message.replies ?? []).forEach(showReply);

        // Add a reply box only if this question needs an answer.
        if (message.needsReply) {
            const form = document.createElement("form");
            const label = document.createElement("label");
            const input = document.createElement("textarea");
            const button = document.createElement("button");

            label.textContent = "Your reply";
            input.rows = 4;
            input.required = true;
            label.appendChild(input);

            button.type = "submit";
            button.textContent = "Send reply";

            form.append(label, button);
            thread.appendChild(form);

            form.addEventListener("submit", function (event) {
                event.preventDefault();

                const replyText = input.value.trim();
                if (!replyText) {
                    return;
                }

                showReply({
                    author: "You",
                    postedAt: new Date().toLocaleString(),
                    text: replyText
                });

                messagesList.prepend(item);
                thread.open = true;

                // Keep the conversation open and remove the answered prompt.
                summary.textContent = message.text;
                form.remove();
                summary.focus();
            });
        }

        item.appendChild(thread);
        messagesList.appendChild(item);
    });

    // Show the details after filling in the page.
    document.getElementById("request-details").hidden = false;
} else {
    document.getElementById("request-not-found").hidden = false;
}