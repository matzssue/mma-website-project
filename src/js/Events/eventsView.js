import View from "../Home/Views/View.js";
import * as apis from "../apis.js";
import * as helpers from "../helpers.js";
import * as pagination from "./pagination.js";

class eventsView extends View {
  _parentElement = document.querySelector(".table-content");
  buttonsContainer = document.querySelector(".set-year-buttons");

  getYearButtons = () => {
    this._parentElement.innerHTML = "";
    this.buttonsContainer.classList.remove("hidden");

    let year = new Date().getFullYear();

    const markup = `
      
    <button class="btn-year">${year}</button>
    <button class="btn-year">${year - 1}</button>
    <button class="btn-year">${year - 2}</button>
    <button class="btn-year">${year - 3}</button>
    <button class="btn-year">${year - 4}</button>
    <button class="btn-year">${year - 5}</button>
    
    `;

    this.buttonsContainer.innerHTML = "";
    this.buttonsContainer.insertAdjacentHTML("afterbegin", markup);
  };

  renderUpcomingEvents = async () => {
    const btnUpcomingEvents = document.querySelector(".btn-upc-events");
    console.log(btnUpcomingEvents.classList);

    this.buttonsContainer.classList.add("hidden");
    this._parentElement.innerHTML = "";
    let currYear = new Date().getFullYear();
    const events = [
      ...(await apis.getUfcEvents(currYear)),
      await apis.getUfcEvents(currYear + 1),
    ];
    const scheduledEvents = events.filter(
      (event) => event.Status === "Scheduled"
    );

    scheduledEvents.forEach((event) => {
      const markup = `
      <tr class="table-content-event">
        <td class="event-date">${helpers.setDate(event.DateTime)}</td>
        <td class="event-name">${event.Name}</td>
  
      </tr>
          `;

      this._parentElement.insertAdjacentHTML("beforeend", markup);
    });
  };

  renderPastEvents = async (e, year = e.target.innerHTML) => {
    if (e.target.classList.value === "btn-year") {
      this._parentElement.innerHTML = "";
      const events = await apis.getUfcEvents(year);
      apis.state.pastEvents = events;

      pagination.getSearchResultsPage().forEach((event) => {
        // if (event.Status === status) {
        const markup = `
              <tr class="table-content-event">
              <td class="event-date">${helpers.setDate(event.DateTime)}</td>
              <td class="event-name">${event.Name}</td>
             
              
              </tr>
              `;

        this._parentElement.insertAdjacentHTML("beforeend", markup);

        // }
      });
    }
  };

  toggleActive() {
    const btnPastEvents = document.querySelector(".btn-past-events");
    const btnUpcomingEvents = document.querySelector(".btn-upc-events");
    btnPastEvents.addEventListener("click", function () {
      btnPastEvents.classList.add("active");
      btnUpcomingEvents.classList.remove("active");
    });

    btnUpcomingEvents.addEventListener("click", function () {
      btnPastEvents.classList.remove("active");
      btnUpcomingEvents.classList.add("active");
    });
  }

  renderEvents() {
    const btnPastEvents = document.querySelector(".btn-past-events");
    const btnUpcomingEvents = document.querySelector(".btn-upc-events");

    btnUpcomingEvents.addEventListener("click", this.renderUpcomingEvents);
    btnPastEvents.addEventListener("click", this.getYearButtons);
  }

  renderYearsEvents() {
    const buttons = document.querySelector(".set-year-buttons");
    buttons.addEventListener("click", this.renderPastEvents);
  }

  // toggleActive(button) {
  //   const btnPastEvents = document.querySelector(".btn-past-events");
  //   const btnUpcomingEvents = document.querySelector(".btn-upc-events");

  // }
}
export default new eventsView();
