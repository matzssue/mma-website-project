import * as apis from "./apis.js";
import View from "./View.js";
import { setDate } from "./helpers.js";

class otherFightsView extends View {
  _parentElement = document.querySelector(".other-events");
  #btn = document.querySelector(".btn-show-all");
  #data = apis.state;

  // _render() {
  //   const markup = this._generateMarkupView();
  //   this.#parentElement.insertAdjacentHTML("beforeend", markup);
  // }

  // _generateMarkupView() {
  //   return this.#data.otherFights.map(this._generateMarkup).join("");
  // }

  getWeightClass(weight) {
    if (weight < 125) return "Flyweight";
    if (weight < 135) return "Bantamweight";
    if (weight < 145) return "Featherweight";
    if (weight < 155) return "LightWeight";
    if (weight < 170) return "Welterweight";
    if (weight < 185) return "Middleweight";
    if (weight <= 205) return "Light Heavyweight";
    if (weight > 205) return "Heavyweight";
  }

  toggleMarkup() {
    this.#btn.addEventListener("click", function () {
      document.querySelector(".other-events").classList.toggle("hidden");
    });
  }

  async _generateMarkup() {
    const date = setDate(this.#data.currentEvent.day);

    const fighters = apis.state.otherFights;

    fighters.map(async (elem) => {
      const createDiv = document.createElement("div");
      const fighterOne = await apis.getFighterInfo(elem[0].fighterId);
      const fighterTwo = await apis.getFighterInfo(elem[1].fighterId);
      const fighterWeight = fighterOne[0].weight;
      console.log(fighterWeight);
      createDiv.innerHTML = `
      
      <div class="event">
          <div class="event-fight-info">
          <span class="fight-info-time"
            >${date}</span
          >
          <span class="fight-info-weight"
            >Waga - ${this.getWeightClass(fighterWeight)} || comain-event</span
          >
        </div>
        <div class="event-fighter-container left">
          <img src="${await apis.getRandomPeople()}" alt="" />
          <span>
            <p class="fighter-name">${fighterOne[0].name}</p>
            <p class="fighter-results">${fighterOne[0].fighterResults}</p>
          </span>
        </div>
      
        <div class="event-fighter-container right">
          <span>
            <p class="fighter-name">${fighterTwo[0].name}</p>
            <p class="fighter-results">${fighterTwo[0].fighterResults}</p>
          </span>
          <img src="${await apis.getRandomPeople()}" alt="" />
        </div>
     </div>
  `;
      this._parentElement.appendChild(createDiv);
    });
  }
}
export default new otherFightsView();
