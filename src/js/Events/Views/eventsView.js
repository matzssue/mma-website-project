import View from "../../View.js";
import * as apis from "../../apis.js";
import * as helpers from "../../helpers.js";
import PaginationView from "./PaginationView.js";

class eventsView extends View {
  _parentElement = document.querySelector(".table-content");
  _buttonsContainer = document.querySelector(".set-year-buttons");
  _btnPastEvents = document.querySelector(".btn-past-events");
  _btnUpcomingEvents = document.querySelector(".btn-upc-events");

  getYearButtons = () => {
    this._clear();
    this._buttonsContainer.classList.remove("hidden");

    let year = new Date().getFullYear();

    const markup = `
      
    <button class="btn-year"data-year="${year}">${year}</button>
    <button class="btn-year"data-year="${year - 1}">${year - 1}</button>
    <button class="btn-year"data-year="${year - 2}">${year - 2}</button>
    <button class="btn-year"data-year="${year - 3}">${year - 3}</button>
    <button class="btn-year"data-year="${year - 4}">${year - 4}</button>
    <button class="btn-year"data-year="${year - 5}">${year - 5}</button>
    
    `;

    this._buttonsContainer.innerHTML = "";
    this._buttonsContainer.insertAdjacentHTML("afterbegin", markup);
  };

  generateUpcomingEvents = async () => {
    const pagination = document.querySelector(".pagination");
    pagination ? pagination.remove() : "";

    this._buttonsContainer.classList.add("hidden");
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

  setActive = (e) => {
    if (e.target.classList.value === "btn-past-events") {
      this._btnPastEvents.classList.add("active");
      this._btnUpcomingEvents.classList.remove("active");
    }
    if (e.target.classList.value === "btn-upc-events") {
      this._btnPastEvents.classList.remove("active");
      this._btnUpcomingEvents.classList.add("active");
    }
  };

  toggleActive = () => {
    const btnContainer = document.querySelector(".event-type-switcher");
    btnContainer.addEventListener("click", this.setActive);
  };

  // toggleActive = () => {
  //   const btnContainer = document.querySelector('.event-type-switcher')
  //   btnContainer.addEventListener('click', this.toggleActive)
  //   this._btnPastEvents.addEventListener("click", function () {
  //     this._btnPastEvents.classList.add("active");
  //     this._btnUpcomingEvents.classList.remove("active");
  //   });

  //   this._btnUpcomingEvents.addEventListener("click", function () {
  //     this._btnPastEvents.classList.remove("active");
  //     this._btnUpcomingEvents.classList.add("active");
  //   });
  // };

  renderUpcomingEvents = () => {
    this.generateUpcomingEvents();
    this._btnUpcomingEvents.addEventListener(
      "click",
      this.generateUpcomingEvents
    );
  };

  renderPastEvents = () => {
    this._btnPastEvents.addEventListener("click", this.getYearButtons);
    this._buttonsContainer.addEventListener("click", this.generatePastEvents);
  };

  // toggleActive(button) {
  //   const btnPastEvents = document.querySelector(".btn-past-events");
  //   const btnUpcomingEvents = document.querySelector(".btn-upc-events");

  // }
}
export default new eventsView();
