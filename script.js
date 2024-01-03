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
