const surahs = {
  "Al-Fatihah": 7,
  "Al-Baqarah": 286,
  "Aali Imran": 200,
  "An-Nisa": 176,
  "Al-Ma'idah": 120,
  "Al-An'am": 165,
  "Al-A'raf": 206,
  "Al-Anfal": 75,
  "At-Tawbah": 129,
  "Yunus": 109,
  "Hud": 123,
  "Yusuf": 111,
  "Ar-Ra'd": 43,
  "Ibrahim": 52,
  "Al-Hijr": 99,
  "An-Nahl": 128,
  "Al-Isra": 111,
  "Al-Kahf": 110,
  "Maryam": 98,
  "Ta-Ha": 135,
  "Al-Anbiya": 112,
  "Al-Hajj": 78,
  "Al-Mu'minun": 118,
  "An-Nur": 64,
  "Al-Furqan": 77,
  "Ash-Shu'ara": 227,
  "An-Naml": 93,
  "Al-Qasas": 88,
  "Al-Ankabut": 69,
  "Ar-Rum": 60,
  "Luqman": 34,
  "As-Sajdah": 30,
  "Al-Ahzab": 73,
  "Saba": 54,
  "Fatir": 45,
  "Ya-Sin": 83,
  "As-Saffat": 182,
  "Sad": 88,
  "Az-Zumar": 75,
  "Ghafir": 85,
  "Fussilat": 54,
  "Ash-Shura": 53,
  "Az-Zukhruf": 89,
  "Ad-Dukhan": 59,
  "Al-Jathiyah": 37,
  "Al-Ahqaf": 35,
  "Muhammad": 38,
  "Al-Fath": 29,
  "Al-Hujurat": 18,
  "Qaf": 45,
  "Adh-Dhariyat": 60,
  "At-Tur": 49,
  "An-Najm": 62,
  "Al-Qamar": 55,
  "Ar-Rahman": 78,
  "Al-Waqi'ah": 96,
  "Al-Hadid": 29,
  "Al-Mujadila": 22,
  "Al-Hashr": 24,
  "Al-Mumtahanah": 13,
  "As-Saff": 14,
  "Al-Jumu'ah": 11,
  "Al-Munafiqun": 11,
  "At-Taghabun": 18,
  "At-Talaq": 12,
  "At-Tahrim": 12,
  "Al-Mulk": 30,
  "Al-Qalam": 52,
  "Al-Haqqah": 52,
  "Al-Ma'arij": 44,
  "Nuh": 28,
  "Al-Jinn": 28,
  "Al-Muzzammil": 20,
  "Al-Muddaththir": 56,
  "Al-Qiyamah": 40,
  "Al-Insan": 31,
  "Al-Mursalat": 50,
  "An-Naba": 40,
  "An-Nazi'at": 46,
  "Abasa": 42,
  "At-Takwir": 29,
  "Al-Infitar": 19,
  "Al-Mutaffifin": 36,
  "Al-Inshiqaq": 25,
  "Al-Buruj": 22,
  "At-Tariq": 17,
  "Al-A'la": 19,
  "Al-Ghashiyah": 26,
  "Al-Fajr": 30,
  "Al-Balad": 20,
  "Ash-Shams": 15,
  "Al-Layl": 21,
  "Ad-Duhaa": 11,
  "Ash-Sharh": 8,
  "At-Tin": 8,
  "Al-Alaq": 19,
  "Al-Qadr": 5,
  "Al-Bayyinah": 8,
  "Az-Zalzalah": 8,
  "Al-Adiyat": 11,
  "Al-Qari'ah": 11,
  "At-Takathur": 8,
  "Al-Asr": 3,
  "Al-Humazah": 9,
  "Al-Fil": 5,
  "Quraysh": 4,
  "Al-Ma'un": 7,
  "Al-Kawthar": 3,
  "Al-Kafirun": 6,
  "An-Nasr": 3,
  "Al-Masad": 5,
  "Al-Ikhlas": 4,
  "Al-Falaq": 5,
  "An-Nas": 6
};

const form = document.getElementById("progressForm");
const studentsList = document.getElementById("studentsList");
const surahSelect = document.getElementById("surah");

for (let surah in surahs) {
  const option = document.createElement("option");
  option.value = surah;
  option.textContent = surah;
  surahSelect.appendChild(option);
}

let students = JSON.parse(localStorage.getItem("quranStudents")) || [];

function saveToLocal() {
  localStorage.setItem("quranStudents", JSON.stringify(students));
}

function renderStudents() {
  studentsList.innerHTML = '';
  students.forEach((s) => {
    const percent = ((s.ayahMemorized / surahs[s.surah]) * 100).toFixed(2);
    const goalStatus = s.weeklyGoal
      ? `Weekly Goal: ${s.weeklyGoal} ayahs - ${s.ayahMemorized >= s.weeklyGoal ? '✅' : '❌'}`
      : '';

    const div = document.createElement("div");
    div.className = "student-card";
    div.innerHTML = `
      <strong>${s.name}</strong> memorized from <strong>${s.surah}</strong>, Ayah <strong>${s.fromAyah}</strong> to <strong>${s.toAyah}</strong> (${s.ayahMemorized} ayahs)<br>
      Grade: <span class="grade ${s.grade}">${s.grade}</span><br>
      Progress: ${percent}%
      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%">${percent}%</div>
      </div>
      <p>${goalStatus}</p>
    `;
    studentsList.appendChild(div);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const surah = document.getElementById("surah").value;
  const fromAyah = parseInt(document.getElementById("fromAyah").value);
  const toAyah = parseInt(document.getElementById("toAyah").value);
  const grade = document.getElementById("grade").value;
  const weeklyGoal = parseInt(document.getElementById("weeklyGoal").value) || null;

  if (!name || !surah || !fromAyah || !toAyah || fromAyah > toAyah || toAyah > surahs[surah] || !grade) {
    alert("Please fill the form correctly.");
    return;
  }

  const ayahMemorized = toAyah - fromAyah + 1;
  students.push({ name, surah, fromAyah, toAyah, ayahMemorized, grade, weeklyGoal });
  saveToLocal();
  renderStudents();
  form.reset();
});

renderStudents();

function generatePDF() {
  const teacherName = document.getElementById("teacherName").value.trim();
  if (!teacherName) {
    alert("Please enter the teacher's name.");
    return;
  }

  const doc = new jsPDF();
  const logoUrl = "https://i.ibb.co/Xrv6hSRQ/dastia-logo.jpg";
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = logoUrl;

  img.onload = function () {
    // Header
    doc.addImage(img, "JPEG", 10, 10, 30, 30); // X, Y, Width, Height
    doc.setFontSize(16);
    doc.text("Weekly Progress Report", 50, 20);
    doc.setFontSize(12);
    doc.text("Daarusalam Academy", 50, 28);
    doc.text(`Teacher: ${teacherName}`, 50, 36);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 50, 44);

    let y = 60;

    students.forEach((s, index) => {
      const percent = ((s.ayahMemorized / surahs[s.surah]) * 100).toFixed(2);
      const goalStatus = s.weeklyGoal
        ? `Goal: ${s.weeklyGoal} ayahs - ${s.ayahMemorized >= s.weeklyGoal ? "✅" : "❌"}`
        : "No Goal Set";

      doc.setFontSize(11);
      doc.text(
        `${index + 1}. ${s.name} | ${s.surah}: Ayah ${s.fromAyah} - ${s.toAyah} (${s.ayahMemorized} ayahs)`,
        10,
        y
      );
      y += 6;
      doc.text(`   Grade: ${s.grade} | Progress: ${percent}% | ${goalStatus}`, 10, y);
      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("progress_report.pdf");
  };

  img.onerror = function () {
    alert("Logo failed to load. Please check the URL or try another image.");
  };
}

document.getElementById("clearProgressBtn").addEventListener("click", () => {
  const confirmClear = confirm("Are you sure you want to clear all students' progress for a new week?");
  if (!confirmClear) return;

  students = [];
  saveToLocal();
  renderStudents();
});



