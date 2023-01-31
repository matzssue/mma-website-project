import View from "../Home/Views/View.js";
import * as apis from "../apis.js";

class eventsView extends View {
  getYearButtons() {
    let year = new Date().getFullYear();
    const markup = `
    
    <button>${year}</button>
    <button>${year - 1}</button>
    <button>${year - 2}</button>
    <button>${year - 3}</button>
    <button>${year - 4}</button>
    <button>${year - 5}</button>

    
    `;
    const parentElement = document.querySelector(".set-year-buttons");
    parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  getEventInfo(year) {
    const year = e.target.innerText;
    const events = apis.getUfcEvents(year);
    events.forEach((event) => {
      const markup = `
        <td class="event-date">10.05.2022r </td>
        <td class="event-name">UFC-FIGHT cannonier vs strickland</td>
        <td class="event-location">T-Moblie Arena, Las Vegas, Nevada, US</td>
        `;
    });
  }
}
export default new eventsView();
