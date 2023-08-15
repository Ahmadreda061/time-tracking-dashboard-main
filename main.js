let categories = document.querySelectorAll(".header h4");
let timeChose = document.querySelectorAll(".chose ul li");
let currents = document.querySelectorAll(".time .current");
let previouses = document.querySelectorAll(".time .previous");

let req = new XMLHttpRequest();

req.open("GET", "./data.json");
req.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    let dataJson = req.responseText;
    let data = JSON.parse(dataJson);

    // on Load page dalliy data show
    timeChose[0].style.color = "white";
    for (let i = 0; i < 6; i++) {
      currents[
        i
      ].textContent = `${data[i]["timeframes"]["daily"]["current"]}hrs`;

      previouses[
        i
      ].textContent = `last "Day" - ${data[i]["timeframes"]["daily"]["previous"]}hrs`;
    }

    // show title of categories
    for (let i = 0; i < 6; i++) {
      categories[i].textContent = data[i]["title"];
    }

    // On Click on each time get the data in the time chose
    timeChose.forEach((time) => {
      time.addEventListener("click", () => {
        timeChose.forEach((time) => (time.style.color = "hsl(236, 100%, 87%)"));
        time.style.color = "white";

        for (let i = 0; i < 6; i++) {
          currents[i].textContent = `${
            data[i]["timeframes"][time.textContent.toLowerCase()]["current"]
          }hrs`;

          previouses[i].textContent = `last ${time.id} - ${
            data[i]["timeframes"][time.textContent.toLowerCase()]["previous"]
          }hrs`;
        }
      });
    });
  }
};

req.send();
