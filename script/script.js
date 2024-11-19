function loadSection(section) {
  const content = document.getElementById("main-content");

  switch (section) {
    case "ghazal":
      content.innerHTML = `
        <h2>Bengali Ghazals</h2>
        <ul>
          <li>Ghazal 1: <button onclick="playAudio('ghazal1')">Play</button></li>
          <li>Ghazal 2: <button onclick="playAudio('ghazal2')">Play</button></li>
        </ul>`;
      break;

    case "quran":
      content.innerHTML = `
        <h2>30 Al-Quran Paragraphs</h2>
        <ul>
          <li>Paragraph 1: <button onclick="playAudio('quran1')">Play</button></li>
          <li>Paragraph 2: <button onclick="playAudio('quran2')">Play</button></li>
        </ul>`;
      break;

    case "prayer":
      content.innerHTML = `
        <h2>Prayer Times</h2>
        <input type="text" id="location" placeholder="Enter location">
        <button onclick="fetchPrayerTimes()">Get Times</button>
        <div id="prayer-times"></div>`;
      break;

    case "hadith":
      content.innerHTML = `
        <h2>Hadith</h2>
        <p>Collection of Hadiths will appear here.</p>`;
      break;

    case "azan":
      content.innerHTML = `
        <h2>Azan Notifications</h2>
        <p>Enable notifications to receive Azan reminders.</p>`;
      break;

    default:
      content.innerHTML = `<p>Section not found!</p>`;
  }
}

function playAudio(file) {
  const audio = new Audio(`assets/audio/${file}.mp3`);
  audio.play();
}

function fetchPrayerTimes() {
  const location = document.getElementById("location").value;
  const prayerContainer = document.getElementById("prayer-times");

  if (location) {
    prayerContainer.innerHTML = `<p>Fetching prayer times for ${location}...</p>`;
    // Integrate a prayer time API (e.g., Aladhan) for real data
  } else {
    prayerContainer.innerHTML = `<p>Please enter a location!</p>`;
  }
}
