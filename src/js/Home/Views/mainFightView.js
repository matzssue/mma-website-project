import { getFighterInfo, state } from "../../apis.js";
import View from "../../View.js";
import { convertInchesToCm } from "../../helpers.js";
import { setDate } from "../../helpers.js";
class mainFightView extends View {
  _parentElement = document.querySelector(".main-event");
  _data = state;

  renderPopup() {
    const mainPage = document.querySelector("#main");
    mainPage.addEventListener("click", this.generatePopup);
  }

  removePopup() {
    window.addEventListener("click", this.overlayRemover);
    window.addEventListener("keydown", this.overlayRemover);
  }

  _renderMarkup = async () => {
    try {
      this.renderSpinner();
      const fighterOne = await getFighterInfo(this._data.mainFight[0].id);

      const fighterTwo = await getFighterInfo(this._data.mainFight[1].id);
      const date = this._data.currentEvent.date;
      const convertedDate = new Date(date);

      const markup = `

        <div class="main-event-info">
          <h2>${this._data.currentEvent.name}</h2>
          <span class="main-event-place"
            >Date: ${convertedDate} </br> Watch on EWPA.tv </span
          >
          </div>
          <div class="main-event-fighters-container">
          <div class="main-event-fighter-info left-container">
            <span class="main-event-fighter-name fighter-name" data-id="name">${fighterOne[0].name}</span>
            <img
              class="main-event-fighter-img"
              src="./src/img/fighters/1.jpg"
              alt=""
            />
            <span class="main-event-fighter-results"
              >${fighterOne[0].fighterResults}<br />(win-loss-draw)</span
            >
          </div>
          <div class="center-container">
            <h3 class="center-text">VS</h3>
            <h4 class="center-info-time">TIME LEFT:</h4>
          </div>
          <div class="main-event-fighter-info right-container">
            <span class="main-event-fighter-name fighter-name" data-id="name">${fighterTwo[0].name}</span>
            <img
              class="main-event-fighter-img"
              src="./src/img/fighters/2.jpg"
              alt=""
            />
            <span class="main-event-fighter-results"
              >${fighterTwo[0].fighterResults} <br />(win-loss-draw)</span
            >
    </div>
    `;
      this._clear();
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    } catch (err) {
      console.log(err);
    }
  };

  overlayRemover(e) {
    const overlay = document.querySelector(".overlay");
    const closeButton = document.querySelector(".close-btn");
    if (!overlay) return;
    if (
      overlay.classList === e.target.classList ||
      e.target === closeButton ||
      e.key === "Escape"
    ) {
      const popup = document.querySelector(".overlay-content");
      popup.remove();
      overlay.remove();
    }
  }

  async generatePopup(e) {
    try {
      if (e.target.dataset.id === "name") {
        state.fighterName = e.target.innerHTML.toLowerCase();
        const parentElement = document.querySelector(".events-container");
        const findFighter = state.allFighters.find(
          (fighter) => fighter.fullname.toLowerCase() === state.fighterName
        );

        console.log(findFighter);

        await getFighterInfo(findFighter.fighterId);

        const data = state.fighterInfo[0];
        console.log(data);
        // DOOO POPRAWIENIA !!! ROK URODZENIA !!
        const markup = `
        <div class="overlay"></div>
        <div class="overlay-content">
          <div class="fighter-image-container">
            <img
              class="fighter-photo"
              src="src/img/fighters/boxer.jpg"
              alt="fighter-photo"
            />
          </div>
          <div class="fighter-stats-cointainer">
          <button class="close-btn">X</button>
            <span class="fighter-name" data-id="name"><p>${
              data.name
            }</p></span><br />
            <p class="fighter-info"><span>Age:</span>
              
            20 / birth-date: ${setDate(data.age)}</p> 
            <p class="fighter-info"><span>Height:</span>${
              data.height
            } inch / ${convertInchesToCm(data.height)} cm</p>
            <p class="fighter-info"><span>Weight:</span>${
              data.weight
            } inch / ${convertInchesToCm(data.weight)} cm</p>
            <p class="fighter-info"><span>Reach:</span>${
              data.reach
            } inch /  ${convertInchesToCm(data.reach)} cm</p>
            <div class="fighter-results">
              <p>
                Wins:
                <span class="fighter-wins">${
                  data.fighterWins
                }</span>Losses:<span
                  class="fighter-losses"
                >
                  ${data.fighterLosses}</span
                >Draws:<span class="fighter-draws">${data.fighterDraws}</span>
              </p>
              <div class="fighter-results-stats">
                <p class="fighter-info"><span>Submissions:</span>${
                  data.submissions
                }</p>
                <p class="fighter-info"><span>Knockkouts:</span>${
                  data.knockouts
                }</p>
                <p class="fighter-info"><span>Titlewins:</span>${
                  data.titleWins
                }</p>
                <p class="fighter-info"><span>Knockout Percentage:</span>${
                  data.knockoutPercentage
                }</p>
                <p class="fighter-info"><span>Striking Accuracy:</span>${
                  data.strikeAccuracy
                }</p>
              </div>
            </div>
          </div>
        
        </div>
      
        `;
        // parentElement.innerHTML = "";
        parentElement.insertAdjacentHTML("beforeend", markup);
      }
    } catch (err) {
      console.log(err);
    }
  }

  countDownTimer() {
    const date = this._data.currentEvent.date;
    const countDownDate = new Date(date).getTime();
    setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const timeContainer = document.querySelector(".center-info-time");
      minutes > 0
        ? (timeContainer.innerHTML = `Time left: ${days} days ${hours} hours ${minutes} minutes `)
        : (timeContainer.innerHTML = `The event is happening right now!`);
      // timeContainer.innerHTML = `Time left: ${days} days ${hours} hours ${minutes} minutes `;
    }, 1000);
  }
}

export default new mainFightView();
