const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchangeIcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row i"),
  translateBtn = document.querySelector("button");

///////////////////////////////////////////////
//Fill the each select element with countries//

selectTag.forEach((tag, id) => {
  for (let country_code in countries) {
    // Select en-GB and hi-IN as default languages
    let selected;
    if (id === 0 && country_code === "en-GB") {
      selected = "selected";
    } else if (id === 1 && country_code === "hi-IN") {
      selected = "selected";
    }

    let option = `<option ${selected} value='${country_code}'>${countries[country_code]}</option>`;

    tag.insertAdjacentHTML("beforeend", option);
  }
});

////////////////////////////////////////
///////////Exchange languages///////////

exchangeIcon.addEventListener("click", () => {
  // let tempText = fromText.value;
  // fromText.value = toText.value;
  // toText.value = tempText;

  [fromText.value, toText.value] = [toText.value, fromText.value];

  // const tempLang = selectTag[0].value;
  // selectTag[0].value = selectTag[1].value;
  // selectTag[1].value = tempLang;

  [selectTag[0].value, selectTag[1].value] = [
    selectTag[1].value,
    selectTag[0].value,
  ];
});

///////////////////////////////////////////////////////////////////////////////
//Set translation textarea to empty string when the first text area is empty//

fromText.addEventListener("keyup", () => {
  if (!fromText.value) {
    toText.value = "";
  }
});

//////////////////////////////////////////////
////////////Translation script////////////////

translateBtn.addEventListener("click", () => {
  let text = fromText.value.trim(),
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;

  if (!text) return;
  console.log(text);
  toText.setAttribute("placeholder", "Translating...");

  const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value = data.responseData.translatedText;
      data.matches.forEach((data) => {
        if (data.id === 0) {
          toText.value = data.translation;
        }
      });
    });

  toText.setAttribute("placeholder", "Translation");
});

///////////////////////////////////////////////////////
///Copy to clipboard and text spelling functionality///

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (!fromText.value || !toText.value) {
      return;
    }

    if (target.classList.contains("fa-copy")) {
      // Copy function function doesn't work properly have to be fixed
      if (target.id === "form") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      let utterence;
      if (target.id === "from") {
        utterence = new SpeechSynthesisUtterance(fromText.value);
        utterence.lang = selectTag[0].value;
      } else {
        utterence = new SpeechSynthesisUtterance(toText.value);
        utterence.lang = selectTag[1].value;
      }

      speechSynthesis.speak(utterence);
    }
  });
});
