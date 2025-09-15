const addCandleBtn = document.getElementById("addCandleBtn");
const proceedBtn = document.getElementById("proceedBtn");
const candles = document.getElementById("candles");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const closePopup = document.getElementById("closePopup");
const backBtn = document.getElementById("backBtn"); // tombol back baru
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

let candleCount = 0;
let animationId;

// Resize canvas
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Candle button
addCandleBtn.addEventListener("click", () => {
  if (candleCount < 5) {
    const candle = document.createElement("div");
    candle.classList.add("candle");

    const flame = document.createElement("div");
    flame.classList.add("flame");

    candle.appendChild(flame);
    candles.appendChild(candle);

    candleCount++;
    if (candleCount === 3) {
      proceedBtn.disabled = false;
      startConfetti();
    }
  }
});

// Proceed button
proceedBtn.addEventListener("click", () => {
  page1.classList.remove("active");
  page2.classList.add("active");
  startConfetti();
});

// Close popup
closePopup.addEventListener("click", () => {
  page2.classList.remove("active");
  stopConfetti();
});

// Back button (halaman 2 -> halaman 1)
backBtn.addEventListener("click", () => {
  page2.classList.remove("active");
  page1.classList.add("active");
  stopConfetti();
});

// Confetti logic
let confettiParticles = [];
function startConfetti() {
  confettiParticles = [];
  for (let i = 0; i < 200; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 200,
      color: `hsl(${Math.random() * 360},100%,50%)`,
      tilt: Math.floor(Math.random() * 10) - 10
    });
  }
  cancelAnimationFrame(animationId); // biar tidak dobel
  animationId = requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiParticles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.y += Math.cos(p.d) + 2 + p.r / 2;
    p.x += Math.sin(p.d);

    if (p.y > confettiCanvas.height) {
      confettiParticles[i] = {
        x: Math.random() * confettiCanvas.width,
        y: -10,
        r: p.r,
        d: p.d,
        color: p.color,
        tilt: p.tilt
      };
    }
  });

  animationId = requestAnimationFrame(drawConfetti);
}

function stopConfetti() {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}
