const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzUhhjfYSbzMTpXMU7TkZmKV4p9FTgX3NV5cALDCqUeFjXVuyX0XYqX930vMSR1VXwb/exec";
let hasilHolland = "";
let tipeDominan = "";
let hasilLengkap = {};
const questions = [
  "Saya senang memperbaiki peralatan, barang, atau alat-alat yang rusak.",
  "Saya tertarik bekerja menggunakan alat teknis, mesin, atau perangkat keras komputer.",
  "Saya lebih suka melakukan aktivitas praktik langsung atau lapangan daripada hanya mempelajari teori di kelas.",
  "Saya menikmati kegiatan di luar ruangan (outdoor) yang melibatkan aktivitas fisik.",
  "Saya merasa puas ketika berhasil merakit atau membangun sesuatu dengan keterampilan tangan saya sendiri.",
  "Saya senang menganalisis suatu masalah secara mendalam untuk menemukan akar penyebabnya.",
  "Saya tertarik pada kegiatan riset, penelitian, atau eksperimen ilmiah.",
  "Saya suka mencari solusi dari masalah-masalah yang rumit dan menantang secara intelektual.",
  "Saya menikmati proses mempelajari konsep, teori, atau jurnal ilmiah baru.",
  "Saya tertarik pada aktivitas yang membutuhkan logika berpikir sistematis dalam mengolah informasi.",

  "Saya senang mengungkapkan ide-ide atau perasaan saya secara kreatif dan orisinal.",
  "Saya tertarik pada dunia seni, desain, musik, atau sastra.",
  "Saya suka membuat sesuatu yang unik, berbeda, dan tidak mengikuti aturan baku.",
  "Saya menikmati kegiatan ekspresif seperti menggambar, menulis, atau mendesain.",
  "Saya lebih menyukai lingkungan kerja yang fleksibel, bebas, dan tidak monoton.",

  "Saya merasa senang dan puas ketika bisa membantu orang lain menyelesaikan masalah mereka.",
  "Saya merasa nyaman dan produktif saat bekerja dalam kelompok atau tim.",
  "Saya tertarik pada aktivitas mengajar, membimbing, atau memberikan arahan kepada orang lain.",
  "Saya termasuk orang yang mudah berempati dan peduli terhadap kesulitan sesama.",
  "Saya menikmati keterlibatan dalam kegiatan sosial, pelayanan masyarakat, atau kerelawanan.",

  "Saya merasa percaya diri saat harus memimpin sebuah kelompok atau organisasi.",
  "Saya senang membujuk atau meyakinkan orang lain untuk menerima ide atau sudut pandang saya.",
  "Saya tertarik untuk memulai suatu usaha sendiri atau mengelola sebuah proyek bisnis.",
  "Saya merasa tertantang untuk mencapai target atau posisi yang memiliki pengaruh besar di lingkungan saya.",
  "Saya menikmati aktivitas yang melibatkan negosiasi atau penjualan ide kepada orang lain.",

  "Saya senang mengelola data, angka, atau catatan administratif secara mendetail dan rapi.",
  "Saya merasa lebih nyaman bekerja dengan instruksi atau prosedur yang sudah ditetapkan secara jelas.",
  "Saya sangat memperhatikan ketelitian dan akurasi dalam mengerjakan tugas-tugas tertulis.",
  "Saya menyukai aktivitas yang bersifat rutin dan terstruktur dalam kehidupan sehari-hari.",
  "Saya merasa puas ketika berhasil menyusun sesuatu sesuai dengan sistem atau klasifikasi yang benar.",
];

let currentQuestion = 0;
let answers = [];
let namaPeserta = "";
let surveyData = {};

function mulaiTes() {
  document.querySelector(".hero").style.display = "none";
  document.getElementById("tesSection").style.display = "block";
  document.getElementById("totalSoal").innerText = questions.length;

  tampilkanSoal();
}
function kembaliHome() {
  if (currentQuestion > 0) {
    currentQuestion--;
    tampilkanSoal();
    document.getElementById("jawaban").value = answers[currentQuestion] || "";
  } else {
    document.getElementById("tesSection").style.display = "none";
    document.querySelector(".hero").style.display = "flex";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
function tampilkanSoal() {
  document.getElementById("pertanyaan").innerText = questions[currentQuestion];
  document.getElementById("nomorSoal").innerText = currentQuestion + 1;
  const btn = document.getElementById("btnNext");

  if (btn) {
    if (currentQuestion === questions.length - 1) {
      btn.innerText = "Lihat Hasil";
    } else {
      btn.innerText = "Tes Selanjutnya";
    }
  }
}

function kirimData() {
  const nama = document.getElementById("nama").value.trim();
  const jawaban = document.getElementById("jawaban").value;

  if (nama === "") {
    alert("Masukkan nama terlebih dahulu");
    return;
  }

  if (jawaban === "") {
    alert("Pilih jawaban terlebih dahulu");
    return;
  }

  namaPeserta = nama;
  answers.push(Number(jawaban));
  currentQuestion++;

  if (currentQuestion < questions.length) {
    document.getElementById("jawaban").value = "";
    tampilkanSoal();
  } else {
    selesaiTes();
  }
}

function hitungRIASEC() {
  const skor = {
    R: 0,
    I: 0,
    A: 0,
    S: 0,
    E: 0,
    C: 0,
  };

  for (let i = 0; i < 5; i++) {
    skor.R += answers[i];
  }

  for (let i = 5; i < 10; i++) {
    skor.I += answers[i];
  }

  for (let i = 10; i < 15; i++) {
    skor.A += answers[i];
  }

  for (let i = 15; i < 20; i++) {
    skor.S += answers[i];
  }

  for (let i = 20; i < 25; i++) {
    skor.E += answers[i];
  }

  for (let i = 25; i < 30; i++) {
    skor.C += answers[i];
  }

  return skor;
}
const tipeRIASEC = {
  R: {
    nama: "Realistic",
    deskripsi:
      "Menyukai aktivitas praktis, teknis, dan pekerjaan yang menghasilkan sesuatu secara nyata.",
    kekuatan: [
      "Terampil dalam pekerjaan praktik",
      "Menyukai tantangan lapangan",
      "Mampu menggunakan alat dan teknologi",
      "Berorientasi tindakan",
    ],
    pengembangan: [
      "Perlu meningkatkan komunikasi interpersonal",
      "Perlu memperkuat kemampuan presentasi",
    ],
  },

  I: {
    nama: "Investigative",
    deskripsi:
      "Menyukai analisis, penelitian, pemecahan masalah, dan eksplorasi ilmu pengetahuan.",
    kekuatan: [
      "Berpikir logis",
      "Analitis",
      "Kritis terhadap informasi",
      "Menyukai belajar hal baru",
    ],
    pengembangan: [
      "Perlu meningkatkan keterampilan kolaborasi",
      "Perlu lebih percaya diri dalam menyampaikan ide",
    ],
  },

  A: {
    nama: "Artistic",
    deskripsi:
      "Menyukai kreativitas, ekspresi diri, inovasi, dan kebebasan dalam berkarya.",
    kekuatan: [
      "Kreatif",
      "Inovatif",
      "Imajinatif",
      "Mudah menghasilkan ide baru",
    ],
    pengembangan: [
      "Perlu meningkatkan disiplin kerja",
      "Perlu memperkuat perencanaan",
    ],
  },

  S: {
    nama: "Social",
    deskripsi:
      "Menyukai membantu, membimbing, mengajar, dan bekerja dengan orang lain.",
    kekuatan: [
      "Empati tinggi",
      "Komunikatif",
      "Mudah bekerja sama",
      "Peduli terhadap orang lain",
    ],
    pengembangan: [
      "Perlu meningkatkan kemampuan mengambil keputusan tegas",
      "Perlu menjaga batas profesional",
    ],
  },

  E: {
    nama: "Enterprising",
    deskripsi:
      "Menyukai memimpin, memengaruhi, bernegosiasi, dan mencapai target.",
    kekuatan: [
      "Kepemimpinan",
      "Percaya diri",
      "Persuasif",
      "Berorientasi hasil",
    ],
    pengembangan: [
      "Perlu meningkatkan ketelitian",
      "Perlu lebih mendengarkan pendapat orang lain",
    ],
  },

  C: {
    nama: "Conventional",
    deskripsi:
      "Menyukai pekerjaan yang terstruktur, sistematis, dan membutuhkan ketelitian.",
    kekuatan: ["Teliti", "Terorganisir", "Disiplin", "Konsisten"],
    pengembangan: [
      "Perlu lebih adaptif terhadap perubahan",
      "Perlu meningkatkan kreativitas",
    ],
  },
};

async function selesaiTes() {
  const skor = hitungRIASEC();
  const ranking = Object.entries(skor).sort((a, b) => b[1] - a[1]);
  const hollandCode = ranking[0][0] + ranking[1][0] + ranking[2][0];
  const dominan = ranking[0][0];
  const profil = tipeRIASEC[dominan];
  hasilHolland = hollandCode;
  tipeDominan = profil.nama;
  const persenR = Math.round((skor.R / 20) * 100);
  const persenI = Math.round((skor.I / 20) * 100);
  const persenA = Math.round((skor.A / 20) * 100);
  const persenS = Math.round((skor.S / 20) * 100);
  const persenE = Math.round((skor.E / 20) * 100);
  const persenC = Math.round((skor.C / 20) * 100);

  document.querySelector(".hasil-container").innerHTML = `
  <div id="hasilPDF" >
  <div class="hasil-header" >
    <h2>✨ Hasil Analisis Karier</h2>
    <div class="nama-peserta-box">
        ${namaPeserta}
    </div>
    <p class="tanggal-tes">
        📅 Tanggal Tes: ${tanggalTes}
    </p>
    <div class="kode-holland">
        Kode Holland : ${hollandCode}
    </div>
</div>
    <div class="card">
        <h3>${profil.nama}</h3>
        <p>${profil.deskripsi}</p>
    </div>

    <div class="grid-2">
        <div class="card">
            <h3>Kekuatan Utama</h3>
            <ul class="list-modern">
                ${profil.kekuatan.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        </div>
        <div class="card">
            <h3>Area Pengembangan</h3>
            <ul class="list-modern">
                ${profil.pengembangan
                  .map((item) => `<li>${item}</li>`)
                  .join("")}
            </ul>
        </div>
    </div>
    <div class="lingkungan">
        <h3>🏢 Lingkungan Kerja Ideal</h3>
        <p>${lingkunganKerja[dominan]}</p>
    </div>
    <h3 style="margin-top:30px">
        💼 Rekomendasi Karier
    </h3>

    <div class="karier-grid">
        ${karier[dominan]
          .slice(0, 3)
          .map(
            (item, index) => `
      <div class="karier-card">
          <h4>#${index + 1}</h4>
          <h3>${item}</h3>
          <div class="karier-persentase">
              ${95 - index * 5}%
          </div>
          <p>Kesesuaian Karier</p>
      </div>
    `
          )
          .join("")}
    </div>

    <p id="statusKirim" style="margin-top:30px">
         Semoga Membantu😁
    </p>
    </div>
  <div class="btn-group">
    <button class="start-btn" onclick="downloadPDF()">
        📄 Download Hasil PDF
    </button>

</div>
`;
  setTimeout(() => {
    document.getElementById("survey1").style.display = "flex";
  }, 20000);

  hasilLengkap = {
    nama: namaPeserta,
    hollandCode: hollandCode,
    tipeDominan: profil.nama,
    deskripsi: profil.deskripsi,
    lingkunganKerja: lingkunganKerja[dominan],
    rekomendasiKarier: karier[dominan].join(", "),
  };
}
const karier = {
  R: [
    "Teknisi Komputer",
    "Teknisi Jaringan",
    "Engineer",
    "Mekanik",
    "Surveyor",
  ],

  I: [
    "Data Analyst",
    "Data Scientist",
    "Research Assistant",
    "Programmer",
    "AI Engineer",
  ],

  A: [
    "UI/UX Designer",
    "Graphic Designer",
    "Animator",
    "Content Creator",
    "Creative Director",
  ],

  S: ["Guru", "Dosen", "Konselor", "Psikolog", "Trainer"],

  E: [
    "Entrepreneur",
    "Marketing Manager",
    "Business Development",
    "Sales Executive",
    "Project Manager",
  ],

  C: [
    "Administrator",
    "Akuntan",
    "Data Entry Specialist",
    "Staff Keuangan",
    "Quality Assurance",
  ],
};
const lingkunganKerja = {
  R: "Lingkungan kerja lapangan, teknis, bengkel, manufaktur, konstruksi, dan operasional yang menuntut keterampilan praktik.",
  I: "Lingkungan kerja riset, laboratorium, analisis data, pengembangan teknologi, dan pemecahan masalah yang kompleks.",
  A: "Lingkungan kerja kreatif, inovatif, fleksibel, dan memberikan kebebasan dalam menghasilkan ide baru.",
  S: "Lingkungan kerja pendidikan, pelayanan, konseling, kesehatan, dan pengembangan sumber daya manusia.",
  E: "Lingkungan kerja bisnis, organisasi, pemasaran, kepemimpinan, negosiasi, dan pengambilan keputusan strategis.",
  C: "Lingkungan kerja administratif, keuangan, perkantoran, dokumentasi, dan pengelolaan data yang terstruktur.",
};
function bukaTentang() {
  document.getElementById("tentangModal").style.display = "flex";
}
function tutupTentang() {
  document.getElementById("tentangModal").style.display = "none";
}
function bukaPrivasi() {
  document.getElementById("privasiModal").style.display = "flex";
}

function tutupPrivasi() {
  document.getElementById("privasiModal").style.display = "none";
}
function kirimSurvey1() {
  surveyData.q1 = document.getElementById("q1").value;
  surveyData.q2 = document.getElementById("q2").value;
  surveyData.q3 = document.getElementById("q3").value;
  document.getElementById("survey1").style.display = "none";
  document.getElementById("survey2").style.display = "flex";
}

async function kirimSurvey2() {
  surveyData.q4 = document.getElementById("q4").value;
  surveyData.q5 = document.getElementById("q5").value;

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: namaPeserta,
        hollandCode: hasilHolland,
        tipeDominan: tipeDominan,
        deskripsi: hasilLengkap.deskripsi,
        lingkunganKerja: hasilLengkap.lingkunganKerja,
        rekomendasiKarier: hasilLengkap.rekomendasiKarier,
        q1: surveyData.q1,
        q2: surveyData.q2,
        q3: surveyData.q3,
        q4: surveyData.q4,
        q5: surveyData.q5,
      }),
    });
  } catch (err) {
    console.error(err);
  }

  document.getElementById("survey2").style.display = "none";
}
window.onclick = function (event) {
  let tentang = document.getElementById("tentangModal");
  let privasi = document.getElementById("privasiModal");
  if (event.target == tentang) {
    tentang.style.display = "none";
  }
  if (event.target == privasi) {
    privasi.style.display = "none";
  }
};

const tanggalTes = new Date().toLocaleDateString("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

async function downloadPDF() {
  const element = document.getElementById("hasilPDF");

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  const pageHeight = 297;
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  pdf.save(`PathFinder_${namaPeserta}.pdf`);
}
