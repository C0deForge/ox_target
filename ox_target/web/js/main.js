import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eyeSvg");

const SetStyle = (data) => {
  document.querySelector(':root').style.setProperty('--eyeBackground', data.Style.eyeBackground);
  document.querySelector(':root').style.setProperty('--eyeBorder', data.Style.eyeBorder);
  document.querySelector(':root').style.setProperty('--primary', data.Style.primary);
  document.querySelector(':root').style.setProperty('--secondary', data.Style.secondary);
  document.querySelector(':root').style.setProperty('--background', data.Style.background);
  document.querySelector(':root').style.setProperty('--borderSecondary', data.Style.borderSecondary);
  document.querySelector(':root').style.setProperty('--borderPrimary', data.Style.borderPrimary);
};

window.addEventListener("message", (event) => {
  optionsWrapper.innerHTML = "";

  switch (event.data.event) {
    case "visible": {
      body.style.visibility = event.data.state ? "visible" : "hidden";
      SetStyle(event.data.config);
      return eye.classList.remove("eye-hover");
    }

    case "leftTarget": {
      document.getElementById('options-wrapper').style.display = 'none';
      return eye.classList.remove("eye-hover");
    }

    case "setTarget": {
      eye.classList.add("eye-hover");

      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            createOptions("zones", data, id + 1, i + 1);
          });
        }
      }
    }
  }
});
