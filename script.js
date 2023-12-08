// Add this JavaScript file to your project folder and link it in your HTML files.

// Function to determine the current page URL
function getCurrentPageUrl() {
  return window.location.href.split("/").pop();
}

// Function to update the active link in the navigation
function updateActiveLink() {
  const currentPageUrl = getCurrentPageUrl();
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkUrl = link.getAttribute("href");
    if (currentPageUrl === linkUrl) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Call the function to update the active link when the page loads
updateActiveLink();

const words = [
  "Full Stack Developer",
  "Python Master",
  "Front-End Web Dev",
  "NextJS Web Dev",
  "Backend Developer",
];
let wordIndex = 0;
let isDeleting = false;
let text = "";
let typingSpeed = 160;
let pauseTime = 1000; // pause time in milliseconds

function typeWriter() {
  const current = words[wordIndex];
  const endOfWord = text.length === current.length;
  const deletedAll = text.length === 0;

  if (endOfWord && !isDeleting) {
    isDeleting = true;
    setTimeout(typeWriter, pauseTime); // pause at the end of the word
  } else if (deletedAll && isDeleting) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeWriter, pauseTime); // pause at the beginning of the word
  } else {
    if (isDeleting) {
      text = current.substring(0, text.length - 1);
    } else {
      text = current.substring(0, text.length + 1);
    }

    document.getElementById("title-text").innerText = text;
    setTimeout(typeWriter, typingSpeed);
  }
}

typeWriter(); // start the typewriter

const discordCard = document.getElementById("discModal-content");

fetch("https://api.lanyard.rest/v1/users/870936028108705803")
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      const avatarURL = data.data.discord_user.avatar;
      const username = data.data.discord_user.username;
      const currentActivity =
        data.data.activities.length > 0
          ? data.data.activities[0].name
          : "Not doing anything";

      const avatarImage = new Image();
      avatarImage.src = `https://cdn.discordapp.com/avatars/${data.data.discord_user.id}/${avatarURL}`;
      avatarImage.alt = `${username}'s Discord avatar`;

      discordCard.textContent = ""; // Clear the existing content
      discordCard.appendChild(avatarImage);
      discordCard.appendChild(document.createElement("br")); // Add a line break
      discordCard.appendChild(
        document.createTextNode(`${username} - ${currentActivity}`),
      );

      console.log(username, avatarURL, currentActivity);
    } else {
      console.error("Error fetching Discord status:", data.error);
    }
  });

function openModal() {
  document.getElementById("discModal").style.display = "block";
}

document.getElementsByClassName("close")[0].onclick = function () {
  document.getElementById("discModal").style.display = "none";
};
