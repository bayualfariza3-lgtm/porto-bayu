// =========================
// TAHUN OTOMATIS
// =========================

document.getElementById("year").textContent =
  new Date().getFullYear();


// =========================
// MENU MOBILE
// =========================

function toggleMenu() {

  const navLinks =
    document.getElementById("navLinks");

  navLinks.classList.toggle("active");

}


// =========================
// TUTUP MENU SETELAH KLIK
// =========================

document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      document
        .getElementById("navLinks")
        .classList.remove("active");

    });

  });


// =========================
// POPUP SERTIFIKAT
// =========================

function openCertificate(image) {

  const modal =
    document.getElementById("certificateModal");

  const preview =
    document.getElementById("certificatePreview");

  preview.src = image;

  modal.classList.add("active");

  document.body.style.overflow = "hidden";

}


// =========================
// TUTUP POPUP
// =========================

function closeCertificate() {

  const modal =
    document.getElementById("certificateModal");

  const preview =
    document.getElementById("certificatePreview");

  modal.classList.remove("active");

  preview.src = "";

  document.body.style.overflow = "auto";

}


// =========================
// KLIK AREA GELAP
// =========================

document
  .getElementById("certificateModal")
  .addEventListener("click", function(event) {

    if (event.target === this) {

      closeCertificate();

    }

  });


// =========================
// TOMBOL ESC
// =========================

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {

    closeCertificate();

  }

});


// =========================
// FORM KONTAK WHATSAPP
// =========================

function sendMessage(event) {

  event.preventDefault();

  const name =
    document.getElementById("name").value;

  const email =
    document.getElementById("email").value;

  const message =
    document.getElementById("message").value;


  // GANTI DENGAN NOMOR WHATSAPP KAMU
  const phone =
    "6281234567890";


  const text =
    `Halo, saya ${name}.

Email: ${email}

Pesan:
${message}`;


  const whatsappURL =
    `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;


  window.open(
    whatsappURL,
    "_blank"
  );

}
