function fetchEvents() {
    fetch('/webhook/events')
        .then(response => response.json())
        .then(data => {
            const eventList = document.getElementById('event-list');
            eventList.innerHTML = '';
            data.forEach(event => {
                const li = document.createElement('li');
                if (event.type === 'PUSH') {
                    li.textContent = `${event.author} pushed to ${event.to_branch} on ${event.timestamp}`;
                } else if (event.type === 'PULL_REQUEST') {
                    li.textContent = `${event.author} submitted a pull request from ${event.from_branch} to ${event.to_branch} on ${event.timestamp}`;
                } else if (event.type === 'MERGE') {
                    li.textContent = `${event.author} merged branch ${event.from_branch} to ${event.to_branch} on ${event.timestamp}`;
                }
                eventList.appendChild(li);
            });
        });
}

setInterval(fetchEvents, 15000);
fetchEvents();