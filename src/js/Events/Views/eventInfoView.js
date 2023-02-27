import View from "../../View.js";
import * as apis from "../../apis.js";
class eventInfoView extends View {
  _parentElement = document.querySelector(".display-event");

  workPls() {
    const container = document.querySelector(".event-table");
    container.addEventListener("click", this.generateOtherEvents);
  }

  generateOtherEvents = async (e) => {
    if (e.target.parentElement.classList.value === "table-content-event") {
      const container = document.querySelector("#events-container");
      console.log(container);
      container.classList.add("hidden");
      const id = e.target.parentElement.dataset.eventId;
      await apis.getEventInfo(id);
      const fighterOne = await apis.getFighterInfo(apis.state.mainFight[0].id);
      const fighterTwo = await apis.getFighterInfo(apis.state.mainFight[1].id);
      const fighters = apis.state.otherFights;

      fighters.map(async (elem) => {
        const fighterOne = await apis.getFighterInfo(elem[0].fighterId);
        const fighterTwo = await apis.getFighterInfo(elem[1].fighterId);
        const fighterWeight = fighterOne[0].weight;
        const markup = `
        <div class="event">
          <div class="event-fight-info">
          <span class="fight-info-time"
          ></span>
          <span class="fight-info-weight"
          >Weight class - ${123}</span>
          </div>
          <div class="event-fighter-container left">
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
         
          </div>
          </div>
          `;

        const spinner = document.querySelector(".spinner");
        this._parentElement.insertAdjacentHTML("beforeend", markup);
        //   spinner ? spinner.remove() : "";
      });
    }
  };
}

export default new eventInfoView();
