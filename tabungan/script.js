const targetInput = document.getElementById("target");
const savedInput = document.getElementById("saved");
const addMoneyInput = document.getElementById("addMoney");

const percentage = document.getElementById("percentage");
const progressBar = document.getElementById("progressBar");

const savedResult = document.getElementById("savedResult");
const remainingResult = document.getElementById("remaining");
const targetResult = document.getElementById("targetResult");

const message = document.getElementById("message");


function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}


function calculate() {

  const target = Number(targetInput.value);
  const saved = Number(savedInput.value);

  if (target <= 0) {
    alert("Masukkan target tabungan terlebih dahulu!");
    return;
  }

  if (saved < 0) {
    alert("Jumlah tabungan tidak boleh negatif!");
    return;
  }

  let percent = (saved / target) * 100;

  if (percent > 100) {
    percent = 100;
  }

  const remaining = Math.max(target - saved, 0);

  percentage.textContent =
    percent.toFixed(1) + "%";

  progressBar.style.width =
    percent + "%";

  savedResult.textContent =
    rupiah(saved);

  remainingResult.textContent =
    rupiah(remaining);

  targetResult.textContent =
    rupiah(target);


  if (saved >= target) {

    message.textContent =
      "🎉 Selamat! Target tabunganmu sudah tercapai!";

    progressBar.style.background =
      "linear-gradient(90deg, #22c55e, #10b981)";

  } else if (percent >= 75) {

    message.textContent =
      "🔥 Tinggal sedikit lagi! Jangan berhenti menabung.";

  } else if (percent >= 50) {

    message.textContent =
      "💪 Mantap! Kamu sudah lebih dari setengah target.";

  } else if (percent > 0) {

    message.textContent =
      "🚀 Bagus! Terus konsisten menabung.";

  } else {

    message.textContent =
      "Yuk mulai menabung hari ini! 💰";
  }

  localStorage.setItem(
    "targetTabungan",
    target
  );

  localStorage.setItem(
    "savedTabungan",
    saved
  );
}


/* TAMBAH TABUNGAN */

function addSaving() {

  const tambahan = Number(addMoneyInput.value);
  const target = Number(targetInput.value);
  const sekarang = Number(savedInput.value) || 0;

  if (target <= 0) {
    alert("Masukkan target tabungan terlebih dahulu!");
    return;
  }

  if (tambahan <= 0) {
    alert("Masukkan jumlah uang yang ingin ditabung!");
    return;
  }

  const totalBaru = sekarang + tambahan;

  savedInput.value = totalBaru;

  addMoneyInput.value = "";

  calculate();

}


/* LOAD DATA SAAT HALAMAN DIBUKA */

window.addEventListener("load", () => {

  const savedTarget =
    localStorage.getItem("targetTabungan");

  const savedMoney =
    localStorage.getItem("savedTabungan");

  if (savedTarget) {
    targetInput.value = savedTarget;
  }

  if (savedMoney) {
    savedInput.value = savedMoney;

    calculate();
  }

});
