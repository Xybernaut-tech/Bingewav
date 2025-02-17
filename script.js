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
