import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", () => {
  memeModal.style.display = "none";
});

getImageBtn.addEventListener("click", renderCat);

function renderCat() {
  const catObject = getSingleCatObject();

  memeModalInner.innerHTML = `<img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >`;

  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    return catsArray[Math.floor(Math.random() * catsArray.length)];
  }
}

function getMatchingCatsArray() {
  if (document.querySelector("input[type=radio]:checked")) {
    const selectedEmotion = document.querySelector(
      "input[type=radio]:checked"
    ).value;
    console.log(selectedEmotion);
    const isGif = gifsOnlyOption.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif;
      } else {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });
    return matchingCatsArray;
  }
}

function highlightCheckedOption(e) {
  const radiosArr = document.getElementsByClassName("radio");
  for (let radio of radiosArr) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function getEmotionsArray(cats) {
  //   for (let i = 0; i < cats.length; i++) {
  //     for (let j = 0; j < cats[i].emotionTags.length; j++) {
  //       emotionsArray.push(cats[i].emotionTags[j]);
  //     }
  //   }

  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  let radioItems = ``;
  const emotions = getEmotionsArray(cats);

  // for (let i = 0; i < emotions.length; i++) {
  //   radioItems += `<p>${emotions[i]}</p>`;
  // }

  for (let emotion of emotions) {
    radioItems += `
      <div class="radio">
        <label for='${emotion}'>${emotion}</label>
        <input type='radio' id='${emotion}' value='${emotion}' name='emotions'>
      </div>
    `;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
