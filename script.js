// Function to show details for each box
function showDetails(boxNumber) {
  const detailsContent = document.getElementById("details-content");
  const detailsTitle = document.getElementById("details-title");

  detailsTitle.innerText = `Box ${boxNumber} Details`;

  if (boxNumber === 1) {
    detailsContent.innerHTML = `
      <p>কোরআন শরীফ (PDF):</p>
      <a href="quran.pdf" target="_blank">Download PDF</a>
    `;
  } else if (boxNumber === 2) {
    detailsContent.innerHTML = `
      <p>আল হাদিস (PDF):</p>
      <a href="hadith.pdf" target="_blank">Download PDF</a>
    `;
  } else if (boxNumber === 3) {
    detailsContent.innerHTML = `
      <p>ইসলামিক গজল (ভিডিও):</p>
      <video controls>
        <source src="gojol.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  } else if (boxNumber === 4) {
    fetchPrayerTimes()
      .then((prayerTimes) => {
        detailsContent.innerHTML = `
          <p>নামাজের সময়সূচি:</p>
          <ul>
            <li>ফজর: ${prayerTimes.Fajr}</li>
            <li>যোহর: ${prayerTimes.Dhuhr}</li>
            <li>আসর: ${prayerTimes.Asr}</li>
            <li>মাগরিব: ${prayerTimes.Maghrib}</li>
            <li>এশা: ${prayerTimes.Isha}</li>
          </ul>
          <p>আপনার বর্তমান লোকেশন থেকে হিসাব করা হয়েছে।</p>
        `;
      })
      .catch((error) => {
        detailsContent.innerHTML = `
          <p>নামাজের সময়সূচি লোড করতে ব্যর্থ হয়েছে।</p>
          <p>${error.message}</p>
        `;
      });
  }

  document.getElementById("details").classList.remove("hidden");
}

// Function to fetch prayer times using Aladhan API
function fetchPrayerTimes() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Aladhan API URL
          const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

          fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
              if (data && data.data && data.data.timings) {
                resolve(data.data.timings);
              } else {
                reject(new Error("Invalid data received from API."));
              }
            })
            .catch((error) => {
              reject(new Error("Failed to fetch data from API."));
            });
        },
        function (error) {
          reject(new Error("Geolocation permission denied or unavailable."));
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

// Fetch prayer times dynamically when Box 4 is clicked
window.onload = () => {
  console.log("Page Loaded. Ready to fetch prayer times.");
};
