import * as apis from "../../apis.js";
import View from "./View.js";
import { setDate } from "../../helpers.js";

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

  renderMarkup() {
    this.#btn.addEventListener("click", this._generateMarkup);
  }

  toggleFights() {
    document.querySelector(".other-events").classList.toggle("hidden");
  }

  _generateMarkup = () => {
    this.toggleFights();

    const date = setDate(this.#data.currentEvent.day);
    const fighters = apis.state.otherFights;
    const spinner = document.querySelector(".spinner");

    fighters.map(async (elem) => {
      const fighterOne = await apis.getFighterInfo(elem[0].fighterId);

      if (!fighterOne) return;
      const fighterTwo = await apis.getFighterInfo(elem[1].fighterId);
      if (!fighterTwo) return;

      const fighterWeight = fighterOne[0].weight;

      const markup = `
      
      <div class="event">
      <div class="event-fight-info">
      <span class="fight-info-time"
      >${date}</span
      >
      <span class="fight-info-weight"
      >Weight class - ${this.getWeightClass(fighterWeight)}</span
      >
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

      // this._parentElement.appendChild(createDiv);
      this._parentElement.insertAdjacentHTML("beforeend", markup);
      spinner.remove();
    });
  };
}
export default new otherFightsView();
