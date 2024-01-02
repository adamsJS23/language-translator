const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchangeIcon = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  icons = document.querySelectorAll(".row i"),
  translateBtn = document.querySelector("button");
console.log(selectTag);
selectTag.forEach((tag, id) => {
  console.log(tag);
  for (let country_code in countries) {
    // Select en-GB and hi-IN as default languages
    let selected;
    if (id === 0 && country_code === "en-GB") {
      selected = "selected";
    } else if (id === 1 && country_code === "hi-IN") {
      selected = "selected";
    }

    // Fill the each select element with countries

    let option = `<option ${selected} value='${country_code}'>${countries[country_code]}</option>`;

    tag.insertAdjacentHTML("beforeend", option);
  }
  // console.log(tag);
});
