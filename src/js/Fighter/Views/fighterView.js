import * as apis from "../../apis.js";
import { convertInchesToCm } from "../../helpers.js";
import View from "../../View.js";
class fighterView extends View {
  searchInput;
  _parentElement = document.querySelector("#fighter-container");

  _generateView() {
    const inputBtn = document.querySelector(".btn-search");
    inputBtn.addEventListener("click", this._generateMarkup);
  }

  _generateMarkup = async (
    e,
    searchInput = document.querySelector("#input").value
  ) => {
    try {
      e.preventDefault();
      this.renderSpinner();
      const name = searchInput.toLowerCase();
      await apis.getAllFighters();

      // finding fighter with the same name as input
      const findFighter = apis.state.allFighters.find(
        (fighter) => fighter.fullname.toLowerCase() === name
      );

      // getting api info about fighter

      const fighterId = findFighter.fighterId;
      await apis.getFighterInfo(fighterId);
      const data = apis.state.fighterInfo[0];

      const markup = `
    <div class="fighter-image-container">
      <img
        class="fighter-photo"
        src="src/img/fighters/boxer.jpg"
        alt="fighter-photo"
      />
    </div>
    <div class="fighter-stats-cointainer">
      <span class="fighter-name"><p>${data.name}</p></span><br />
      <p class="fighter-info"><span>Age:</span>20 / birth-date:</p>
      <p class="fighter-info"><span>Height:</span>${
        data.height
      } inch / ${convertInchesToCm(data.height)} cm</p>
      <p class="fighter-info"><span>Weight:</span>${
        data.weight
      } inch / ${convertInchesToCm(data.weight)} cm</p>
      <p class="fighter-info"><span>Reach:</span>${
        data.reach
      } inch /  ${convertInchesToCm(data.reach)} cm</p>
      <div class="fighter-results">
        <p>
          Wins:
          <span class="fighter-wins">${data.fighterWins}</span>Losses:<span
            class="fighter-losses"
          >
          ${data.fighterLosses}</span
          >Draws:<span class="fighter-draws">${data.fighterDraws}</span>
        </p>
        <div class="fighter-results-stats">
          <p class="fighter-info"><span>Submissions:</span>${
            data.submissions
          }</p>
          <p class="fighter-info"><span>Knockkouts:</span>${data.knockouts}</p>
          <p class="fighter-info"><span>Titlewins:</span>${data.titleWins}</p>
          <p class="fighter-info"><span>Knockout Percentage:</span>${
            data.knockoutPercentage
          }</p>
          <p class="fighter-info"><span>Striking Accuracy:</span>${
            data.strikeAccuracy
          }</p>
        </div>
      </div>
    </div>
  
    `;

      this._clear();
      this._parentElement.insertAdjacentHTML("beforeend", markup);
    } catch (err) {
      console.log(err);
      const name = searchInput;
      const markup = `
    <div class="error">
      <p>Probably there is no fighter with name: ${name}. Please try somone else (example "Mateusz Gamrot") </p>
  </div>
    `;
      this._clear();
      this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }
  };
}
export default new fighterView();
