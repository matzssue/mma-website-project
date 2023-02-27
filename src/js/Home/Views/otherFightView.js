import * as apis from "../../apis.js";
import View from "../../View.js";
import { setDate } from "../../helpers.js";

class otherFightsView extends View {
  _parentElement = document.querySelector(".other-events");
  #btn = document.querySelector(".btn-show-all");
  #data = apis.state;

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

  // renderMarkup() {
  //   this.#btn.addEventListener("click", this._generateMarkup);
  // }

  toggleFights() {
    this.#btn.addEventListener("click", function () {
      document.querySelector(".other-events").classList.toggle("hidden");
    });
  }

  _generateMarkup = () => {
    const date = setDate(this.#data.currentEvent.day);

    const otherEvents = apis.state.allFights.slice(1);

    otherEvents.map(async (event) => {
      const fighterOne = await apis.getFighterInfo(event[0].fighterId);
      const fighterTwo = await apis.getFighterInfo(event[1].fighterId);

      const fighterWeight = fighterOne[0].weight;
      const markup = `
    
      <div class="event">
        <div class="event-fight-info">
        <span class="fight-info-time"
        >${date}</span>
        <span class="fight-info-weight"
        >Weight class - ${this.getWeightClass(fighterWeight)}</span>
        </div>
        <div class="event-fighter-container left">
        <img src="${await apis.getRandomPeople()}" alt="" />
        <span>
        <p class="fighter-name" data-id="name">${fighterOne[0].name}</p>
        <p class="fighter-results">${fighterOne[0].fighterResults}</p>
        </span>
        </div>
        
        <div class="event-fighter-container right">
        <span>
        <p class="fighter-name" data-id="name">${fighterTwo[0].name}</p>
        <p class="fighter-results">${fighterTwo[0].fighterResults}</p>
        </span>
        <img src="${await apis.getRandomPeople()}" alt="" />
        </div>
        </div>
        `;

      const spinner = document.querySelector(".spinner");
      this._parentElement.insertAdjacentHTML("beforeend", markup);
      spinner ? spinner.remove() : "";
    });
  };
}
export default new otherFightsView();
