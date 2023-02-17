import View from "../../View.js";
import * as apis from "../../apis.js";
import * as helpers from "../../helpers.js";
import PaginationView from "./PaginationView.js";

class eventsView extends View {
  _parentElement = document.querySelector(".table-content");
  buttonsContainer = document.querySelector(".set-year-buttons");

  getYearButtons = () => {
    this._clear();
    this.buttonsContainer.classList.remove("hidden");

    let year = new Date().getFullYear();

    const markup = `
      
    <button class="btn-year"data-year="${year}">${year}</button>
    <button class="btn-year"data-year="${year - 1}">${year - 1}</button>
    <button class="btn-year"data-year="${year - 2}">${year - 2}</button>
    <button class="btn-year"data-year="${year - 3}">${year - 3}</button>
    <button class="btn-year"data-year="${year - 4}">${year - 4}</button>
    <button class="btn-year"data-year="${year - 5}">${year - 5}</button>
    
    `;

    this.buttonsContainer.innerHTML = "";
    this.buttonsContainer.insertAdjacentHTML("afterbegin", markup);
  };

  generateUpcomingEvents = async () => {
    const pagination = document.querySelector(".pagination");
    pagination ? pagination.remove() : "";

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

  generatePastEvents = async (e) => {
    e.preventDefault();
    if (e.target.classList.value === "btn-year") {
      apis.state.search.year = e.target.innerHTML;
      apis.state.search.page = 1;
    }
    if (
      e.target.classList.value === "pagination-button" ||
      e.target.classList.value === "btn-year"
    ) {
      this._clear();
      const events = await apis.getUfcEvents(apis.state.search.year);
      apis.state.pastEvents = events;
      const page = apis.state.search.page;
      PaginationView.getSearchResultsPage(page).forEach((event) => {
        if (event.Status === "Final") {
          const markup = `
              <tr class="table-content-event">
              <td class="event-date">${helpers.setDate(event.DateTime)}</td>
              <td class="event-name">${event.Name}</td>
              </tr>
              `;

          this._parentElement.insertAdjacentHTML("beforeend", markup);
        }
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

  renderUpcomingEvents() {
    const btnUpcomingEvents = document.querySelector(".btn-upc-events");
    this.generateUpcomingEvents();
    btnUpcomingEvents.addEventListener("click", this.generateUpcomingEvents);
  }

  renderPastEvents() {
    const yearButtons = document.querySelector(".set-year-buttons");
    const btnPastEvents = document.querySelector(".btn-past-events");
    btnPastEvents.addEventListener("click", this.getYearButtons);
    yearButtons.addEventListener("click", this.generatePastEvents);
  }

  // toggleActive(button) {
  //   const btnPastEvents = document.querySelector(".btn-past-events");
  //   const btnUpcomingEvents = document.querySelector(".btn-upc-events");

  // }
}
export default new eventsView();
