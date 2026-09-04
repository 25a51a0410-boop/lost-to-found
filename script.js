let reports = JSON.parse(localStorage.getItem("lostToFoundReports")) || [];

let currentType = "lost";

document.addEventListener("DOMContentLoaded", () => {
  renderReports();
  updateStats();

  const form = document.getElementById("itemForm");

  if (form) {
    form.addEventListener("submit", submitReport);
  }
});


/* =========================
   OPEN REPORT FORM
========================= */

function openForm(type) {

  currentType = type;

  const section = document.getElementById("reportSection");
  const title = document.getElementById("formTitle");
  const subtitle = document.getElementById("formSubtitle");

  section.style.display = "block";

  if (type === "lost") {

    title.textContent = "🔴 Report Lost Item";

    subtitle.textContent =
      "Tell us about the item you lost.";

  } else {

    title.textContent = "🟢 Report Found Item";

    subtitle.textContent =
      "Tell us about the item you found.";
  }

  section.scrollIntoView({
    behavior: "smooth"
  });
}


/* =========================
   CLOSE FORM
========================= */

function closeForm() {

  document.getElementById("reportSection").style.display = "none";

}


/* =========================
   SUBMIT REPORT
========================= */

function submitReport(event) {

  event.preventDefault();

  const itemName =
    document.getElementById("itemName").value.trim();

  const category =
    document.getElementById("itemCategory").value;

  const date =
    document.getElementById("itemDate").value;

  const location =
    document.getElementById("itemLocation").value.trim();

  const description =
    document.getElementById("itemDescription").value.trim();

  const contactName =
    document.getElementById("contactName").value.trim();


  const report = {

    id: Date.now(),

    type: currentType,

    itemName: itemName,

    category: category,

    date: date,

    location: location,

    description: description,

    contactName: contactName,

    createdAt: new Date().toLocaleString()
  };


  reports.unshift(report);

  localStorage.setItem(
    "lostToFoundReports",
    JSON.stringify(reports)
  );


  document.getElementById("itemForm").reset();

  closeForm();

  renderReports();

  updateStats();


  alert(
    currentType === "lost"
      ? "🔴 Lost item reported successfully!"
      : "🟢 Found item reported successfully!"
  );


  document.getElementById("resultsSection")
    .scrollIntoView({
      behavior: "smooth"
    });
}


/* =========================
   DISPLAY REPORTS
========================= */

function renderReports(list = reports) {

  const container =
    document.getElementById("itemsContainer");

  if (!container) return;


  if (list.length === 0) {

    container.innerHTML = `

      <div class="empty-state">

        <div>🔍</div>

        <p>
          No matching reports found.
        </p>

        <small>
          Try another search or report an item.
        </small>

      </div>
    `;

    return;
  }


  container.innerHTML = list.map(item => {

    const typeLabel =
      item.type === "lost"
        ? "🔴 LOST"
        : "🟢 FOUND";


    return `

      <div class="feature-card">

        <div class="feature-icon">
          ${item.type === "lost" ? "🔴" : "🟢"}
        </div>

        <h3>
          ${escapeHTML(item.itemName)}
        </h3>

        <p>
          <strong>${typeLabel}</strong>
        </p>

        <p>
          📂 ${escapeHTML(item.category)}
        </p>

        <p>
          📍 ${escapeHTML(item.location)}
        </p>

        <p>
          📅 ${escapeHTML(item.date)}
        </p>

        <p>
          ${escapeHTML(item.description)}
        </p>

        <br>

        <small>
          Reported by ${escapeHTML(item.contactName)}
        </small>

      </div>

    `;

  }).join("");
}


/* =========================
   SEARCH
========================= */

function searchItems() {

  const search =
    document.getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();


  const category =
    document.getElementById("categoryFilter")
      .value;


  const filtered =
    reports.filter(item => {

      const matchesText =
        item.itemName.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.location.toLowerCase().includes(search);


      const matchesCategory =
        category === "all" ||
        item.category === category;


      return matchesText && matchesCategory;

    });


  renderReports(filtered);


  document.getElementById("resultsSection")
    .scrollIntoView({
      behavior: "smooth"
    });
}


/* =========================
   STATISTICS
========================= */

function updateStats() {

  const lost =
    reports.filter(
      item => item.type === "lost"
    ).length;


  const found =
    reports.filter(
      item => item.type === "found"
    ).length;


  const lostCount =
    document.getElementById("lostCount");

  const foundCount =
    document.getElementById("foundCount");


  if (lostCount) {
    lostCount.textContent = lost;
  }

  if (foundCount) {
    foundCount.textContent = found;
  }

}


/* =========================
   PROFILE
========================= */

function openProfile() {

  alert(
    "👤 Profile feature is coming next!"
  );

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}
