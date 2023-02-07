import View from "../Home/Views/View.js";
import * as apis from "../apis.js";
import * as helpers from "../helpers.js";

class eventsView extends View {
  // setActive() {
  //   let curYear = new Date().getFullYear();
  //   const upcEventsBtn = document.querySelector(".btn-past-events");
  //   upcEventsBtn.addEventListener('click', )
  //   console.log(upcEventsBtn.classList);
  //   if (upcEventsBtn.classList.value.includes("active")) {
  //     this.getYearButtons();
  //     this.getEventInfo(e, curYear, "Final");
  //   }
  // }

  getYearButtons() {
    let year = new Date().getFullYear();
    const markup = `
    
    <button class="btn-year">${year}</button>
    <button class="btn-year">${year - 1}</button>
    <button class="btn-year">${year - 2}</button>
    <button class="btn-year">${year - 3}</button>
    <button class="btn-year">${year - 4}</button>
    <button class="btn-year">${year - 5}</button>

    
    `;
    const parentElement = document.querySelector(".set-year-buttons");
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  async getEventInfo(e, year = e.target.innerHTML) {
    if (e.target.classList.value === "btn-year") {
      const events = await apis.getUfcEvents(year);
      const parentElement = document.querySelector(".table-content");
      parentElement.innerHTML = "";
      events.forEach((event) => {
        // if (event.Status === status) {
        const markup = `
      <tr class="table-content-event">
        <td class="event-date">${helpers.setDate(event.DateTime)}</td>
        <td class="event-name">${event.Name}</td>
        <td class="event-location">${event.EventId}</td>

        </tr>
        `;

        parentElement.insertAdjacentHTML("beforeend", markup);
        // }
      });
    }
  }

  renderEvents() {
    const buttons = document.querySelector(".set-year-buttons");
    buttons.addEventListener("click", this.getEventInfo);
  }
}
export default new eventsView();
