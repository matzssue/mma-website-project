import { getFighterInfo, state } from "../../apis.js";
import View from "../../View.js";

class mainFightView extends View {
  _parentElement = document.querySelector(".main-event");
  _data = state;

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
              loading="lazy"
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
              loading="lazy"
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
