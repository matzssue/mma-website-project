import View from "../../View.js";
import * as apis from "../../apis.js";
import otherFightView from "../../Home/Views/otherFightView.js";

class eventInfoView extends View {
  _parentElement = document.querySelector(".events-fights-info-container");
  _buttonContainer = document.querySelector(".button-container");
  _eventsContainer = document.querySelector("#events-container");

  renderEvents() {
    const container = document.querySelector(".event-table");
    container.addEventListener("click", this.generateEvents);
  }

  goBack() {
    const backBtn = document.querySelector(".back-btn");
    backBtn.addEventListener("click", this.hideElements);
  }

  hideElements = () => {
    this._parentElement.innerHTML = "";
    this._eventsContainer.classList.remove("hidden");
    this._buttonContainer.classList.add("hidden");
  };
  showEvents() {
    this._eventsContainer.classList.add("hidden");
    this._buttonContainer.classList.remove("hidden");
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
          <div class="event-fighter-container center">
            <span class="fight-info-weight"
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
