import * as apis from "./apis.js";

class otherFightsView {
  #parentElement = document.querySelector(".other-events-title");
  #data = apis.state;

  _render() {
    const markup = this._generateMarkupView();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateMarkupView() {
    console.log(this.#data.otherFights);
    return this.#data.otherFights.map(this._generateMarkup).join("");
  }
  _generateMarkup() {
    const otherFights = apis.state.otherFights;
    return `
     <div class="event">
    <div class="event-fight-info">
    <span class="fight-info-time"
      >Niedziela 21 grudnia, godz. 19:00</span
    >
    <span class="fight-info-weight"
      >Waga - ciężka || comain-event</span
    >
  </div>
  <div class="event-fighter-container left">
    <img src="/src/img/tymczasowe/face-1.jpg" alt="" />
    <span>
      <p class="fighter-name">Stephen Holand</p>
      <p class="fighter-results">17-6-1</p>
    </span>
  </div>

  <div class="event-fighter-container right">
    <span>
      <p class="fighter-name">Stephen Holand</p>
      <p class="fighter-results">17-6-1</p>
    </span>
    <img src="/src/img/tymczasowe/face-2.jpg" alt="" />
  </div>
</div>
`;
  }
}
export default new otherFightsView();
