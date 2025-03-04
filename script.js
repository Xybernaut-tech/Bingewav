    function openDisclaimer() {
        document.getElementById('popupOverlay').style.display = 'flex';
    }
    function closeDisclaimer() {
        document.getElementById('popupOverlay').style.display = 'none';
    }
document.addEventListener('contextmenu', function (e) {
    e.preventDefault(); // Disable right-click menu
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault(); // Disable text selection
});
    // Function to open the popup and update the display
    function openPopup() {
        document.getElementById('profilePopup').style.display = 'block';
        // Ensure we update the displayed username in the popup if it exists in storage
        let storedName = localStorage.getItem('username');
        if (storedName) {
            document.getElementById('usernameText').innerText = storedName;
        } else {
            document.getElementById('usernameText').innerText = "Wavr"; // Default display name
        }
    }

    // Function to close the popup
    function closePopup() {
        document.getElementById('profilePopup').style.display = 'none';
    }

    // Function to turn the username display into an editable input field
    function editUsername() {
        let currentName = document.getElementById('usernameText').innerText;
        document.getElementById('usernameText').innerHTML = `<input type="text" id="usernameInput" value="${currentName}" />`;
        // Focus the input field for immediate editing
        document.getElementById('usernameInput').focus();
    }

    // Function to save the username to local storage and update the greeting
    function saveUsername() {
        let input = document.getElementById('usernameInput');
        if (input && input.value.trim() !== "") { // Check if input exists and is not just whitespace
            let newName = input.value;
            localStorage.setItem('username', newName);
            document.getElementById('usernameText').innerText = newName; // Update the username display immediately
            updateGreetingMessage(); // Update greeting immediately after saving
            closePopup();
        } else {
            alert("Username cannot be empty!"); // Alert if the input is empty
        }
    }

    // Function to update the greeting message based on stored username or default
    function updateGreetingMessage() {
        let storedName = localStorage.getItem('username');
        if (storedName) {
            document.getElementById('greetingMessage').innerText = `Hi, ${storedName}!`;
        } else {
            document.getElementById('greetingMessage').innerText = 'Hi, Wavr!';
        }
    }

    // Initial call to update the greeting message when the page loads
    window.onload = function() {
        updateGreetingMessage();
    };



 

    const navLinks = document.querySelectorAll('.footer-nav a');

    // Manage active link state
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active')); // Remove active from all
        link.classList.add('active'); // Add active to clicked item
      });
    });




        async function getISTTime() {
            try {
                const response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
                const data = await response.json();
                return new Date(data.datetime);
            } catch (error) {
                console.error('Error fetching IST time:', error);
                return new Date();
            }
        }

        async function fetchUpdates() {
            try {
                const response = await fetch('https://app-bingewave.vercel.app/updates/data.json');
                const data = await response.json();
                const updates = data.updates;
                const currentTime = await getISTTime();

                let latestUpdate = null;
                let latestTimeDiff = -Infinity;

                updates.forEach(update => {
                    const [day, month, year] = update.date.split('/');
                    const [hours, minutes] = update.time.split(':');
                    const updateTime = new Date(year, month - 1, day, hours, minutes);
                    const timeDifference = (currentTime - updateTime) / (1000 * 60 * 60); // Convert to hours

                    // Check if the update is within the 3-hour window
                    if (timeDifference >= 0 && timeDifference <= 3) {
                        // Find the latest update by comparing the time difference
                        if (timeDifference > latestTimeDiff) {
                            latestTimeDiff = timeDifference;
                            latestUpdate = update;
                        }
                    }
                });

                if (latestUpdate) {
                    showNotification(latestUpdate);
                }
            } catch (error) {
                console.error('Error fetching updates:', error);
            }
        }

        function showNotification(update) {
            const popup = document.createElement('div');
            popup.className = 'notification-popup';
            popup.onclick = () => window.location.href = 'https://app-bingewave.vercel.app/updates';

            popup.innerHTML = `
                <img src="${update.poster}" alt="Update Image">
                <div class="content">
                    <h4>${update.title}</h4>
                    <p>Click for more details</p>
                </div>
            `;

            document.body.appendChild(popup);

            setTimeout(() => {
                popup.remove();
            }, 3000);
        }

        // Run function after everything loads
        window.onload = fetchUpdates;
