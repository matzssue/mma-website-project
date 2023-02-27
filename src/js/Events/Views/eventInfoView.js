import View from "../../View.js";
import * as apis from "../../apis.js";
import otherFightView from "../../Home/Views/otherFightView.js";

class eventInfoView extends View {
  _parentElement = document.querySelector(".events-fights-info-container");

  renderEvents() {
    const container = document.querySelector(".event-table");
    container.addEventListener("click", this.generateEvents);
  }

  goBack() {
    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener("click", this.hideElements);
  }

  hideElements() {
    const container = document.querySelector("#events-container");
    const display = document.querySelector(".button-container");
    const container2 = document.querySelector(".events-fights-info-container");
    container2.innerHTML = "";
    container.classList.remove("hidden");
    display.classList.add("hidden");
  }
  showEvents() {
    const container = document.querySelector("#events-container");
    const display = document.querySelector(".button-container");
    container.classList.add("hidden");
    display.classList.remove("hidden");
  }

  generateEvents = async (e) => {
    if (e.target.parentElement.classList.value === "table-content-event") {
      this.showEvents();
      this.renderSpinner();
      const id = e.target.parentElement.dataset.eventId;
      await apis.getEventInfo(id);
      const events = apis.state.allFights;
      events.map(async (event) => {
        const fighterOne = await apis.getFighterInfo(event[0].fighterId);
        const fighterTwo = await apis.getFighterInfo(event[1].fighterId);
        const fighterWeight = fighterOne[0].weight;

        const markup = `

        <div class="event">
        <div class="event-fighter-container left">
        <span>
        <p class="fighter-name" data-id="name">${fighterOne[0].name}</p>
        <p class="fighter-results">${fighterOne[0].fighterResults}</p>
        </span>
        </div>
        <div class="event-fighter-container center"><span class="fight-info-weight"
        >${otherFightView.getWeightClass(fighterWeight)}</span></div>
        <div class="event-fighter-container right">
        <span>
        <p class="fighter-name" data-id="name">${fighterTwo[0].name}</p>
        <p class="fighter-results">${fighterTwo[0].fighterResults}</p>
        </span>
        </div>
        </div>
        `;
        const spinner = document.querySelector(".spinner");
        this._parentElement.insertAdjacentHTML("beforeend", markup);
        spinner ? spinner.remove() : "";
      });
    }
  };
}

export default new eventInfoView();
