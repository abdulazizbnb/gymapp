let activeCategory = null;
let timerInterval = null;

const questionAudio = document.getElementById("questionAudio");
const answerAudio = document.getElementById("answerAudio");
const modal = document.getElementById("modal");

const categorySounds = {
  bench: "sounds/bench.mp3",
  lat: "sounds/sırt.mp3",
  omuz: "sounds/omuz.mp3",
  bacak: "sounds/bacak.mp3",
  kol: "sounds/kol.mp3",
  karin: "sounds/plank.mp3"
};

const successSound = "sounds/set tamam.mp3";
const failSound = "sounds/set tamamlanmadı.mp3";

function playQuestionSound(src, callback) {
  questionAudio.src = src;
  questionAudio.currentTime = 0;
  questionAudio.play();
  questionAudio.onended = callback;
}

function playAnswerSound(src) {
  answerAudio.src = src;
  answerAudio.currentTime = 0;
  answerAudio.play();
}

function startTimer(inputId, category) {
  if (timerInterval) clearInterval(timerInterval);

  const input = document.getElementById(inputId);
  let time = parseInt(input.value);

  if (isNaN(time) || time <= 0) {
    alert("Sayaç süresi gir");
    return;
  }

  activeCategory = category;

  timerInterval = setInterval(() => {
    time--;
    input.value = time;

    if (time <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      // 🔊 KATEGORİ SORU SESİ
      playQuestionSound(categorySounds[category], () => {
        modal.style.display = "flex";
      });
    }
  }, 1000);
}

function setAnswer(isYes) {
  modal.style.display = "none";

  if (!activeCategory) return;

  const categoryDiv = document.querySelector(
    `.category[data-cat="${activeCategory}"]`
  );
  const totalSpan = categoryDiv.querySelector(".catTotal");

  if (isYes) {
    totalSpan.textContent = parseInt(totalSpan.textContent) + 1;
    playAnswerSound(successSound);
  } else {
    playAnswerSound(failSound);
  }

  activeCategory = null;
}
