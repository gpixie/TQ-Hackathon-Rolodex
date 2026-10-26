let data = [];
let filtered = [];
let index = 0;

// DOM elements
const photo = document.getElementById("photo");
const nameEl = document.getElementById("name");
const instEl = document.getElementById("inst");
const blurbEl = document.getElementById("blurb");
const status = document.getElementById("status");

// Load JSON data
async function loadData() {
  try {
    const res = await fetch("data.json");
    data = await res.json();
    filtered = [...data];
    index = 0;
    render();
  } catch (err) {
    console.error("Error loading JSON:", err);
  }
}

// Render the current card
function render() {
  if (!filtered.length) {
    nameEl.textContent = "No results";
    instEl.textContent = "";
    blurbEl.textContent = "";
    photo.src = "";
    status.textContent = "0 of 0";
    return;
  }

  const p = filtered[index];

  // Match YOUR JSON keys exactly
  photo.src = p.Image || "";
  nameEl.textContent = p.Name || "";
  instEl.textContent = p.Institute || "";

  // Prefer Bio, fallback to survey
  blurbEl.textContent = p.Bio || p.survey || "";

  status.textContent = `${index + 1} of ${filtered.length}`;
}

// Next button
document.getElementById("next").onclick = () => {
  if (index < filtered.length - 1) {
    index++;
    render();
  }
};

// Previous button
document.getElementById("prev").onclick = () => {
  if (index > 0) {
    index--;
    render();
  }
};

// Search bar
document.getElementById("search").oninput = (e) => {
  const q = e.target.value.toLowerCase();

  filtered = data.filter(p =>
    (p.Name || "").toLowerCase().includes(q) ||
    (p.Institute || "").toLowerCase().includes(q)
  );

  index = 0;
  render();
};

// Swipe gestures
let startX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].screenX;

  if (endX < startX - 50) {
    document.getElementById("next").click();
  } else if (endX > startX + 50) {
    document.getElementById("prev").click();
  }
});

// Initialize
loadData();
