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



   const tvBtn = document.getElementById('tv-btn');
    const tvList = document.getElementById('tv-list');
    const homeBtn = document.getElementById('home-btn');
    const navLinks = document.querySelectorAll('.footer-nav a');

    // Open TV list and make TV button active
    tvBtn.addEventListener('click', function() {
      tvList.style.display = 'flex';  // Show the TV list
      tvBtn.classList.add('active');  // Make the TV button active

      // Remove active class from all other links except TV
      navLinks.forEach(link => {
        if (link.id !== 'tv-btn') {
          link.classList.remove('active');
        }
      });
    });

    // Close TV list and make Home active when Home button is clicked
    homeBtn.addEventListener('click', function() {
      tvList.style.display = 'none';  // Hide the TV list
      homeBtn.classList.add('active');  // Make Home button active
      tvBtn.classList.remove('active');  // Make TV button inactive
    });
 
