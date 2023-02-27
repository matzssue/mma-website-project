import { getFighterInfo, state } from "../../apis.js";
import View from "../../View.js";
import { convertInchesToCm } from "../../helpers.js";
import { setDate, getAge } from "../../helpers.js";

class popupView extends View {
  _parentElement = document.querySelector("#main");

  renderPopup() {
    const mainPage = document.querySelector("#main");
    mainPage.addEventListener("click", this.generatePopup);
  }

  removePopup() {
    window.addEventListener("click", this.overlayRemover);
    window.addEventListener("keydown", this.overlayRemover);
  }

  overlayRemover(e) {
    const overlay = document.querySelector(".overlay");
    const closeButton = document.querySelector(".close-btn");
    if (!overlay) return;
    if (
      overlay.classList === e.target.classList ||
      e.target === closeButton ||
      e.key === "Escape"
    ) {
      const popup = document.querySelector(".overlay-content");
      popup.remove();
      overlay.remove();
    }
  }

  generatePopup = async (e) => {
    try {
      if (
        e.target.dataset.id === "name" ||
        e.target.previousElementSibling?.classList.contains("fighter-name")
      ) {
        // Finding fighter by name from data
        e.target.previousElementSibling
          ? (state.fighterName =
              e.target.previousElementSibling.innerHTML.toLowerCase())
          : (state.fighterName = e.target.innerHTML.toLowerCase());

        const findFighter = state.allFighters.find(
          (fighter) => fighter.fullname.toLowerCase() === state.fighterName
        );
        console.log(findFighter);
        // Getting info about found fighter
        await getFighterInfo(findFighter.fighterId);
        const data = state.fighterInfo[0];
        // DOOO POPRAWIENIA !!! ROK URODZENIA !!
        const markup = `
            <div class="overlay"></div>
            <div class="overlay-content">
              <div class="fighter-image-container">
                <img
                  class="fighter-photo"
                  src="src/img/fighters/boxer.jpg"
                  alt="fighter-photo"
                />
              </div>
              <div class="fighter-stats-cointainer">
              <button class="close-btn">X</button>
                <span class="fighter-name popup" data-id="name"><p>${
                  data.name
                }</p></span><br />
                <p class="fighter-info"><span>Age:</span>
                  
                ${getAge(data.age)} / birth-date: ${setDate(data.age)}</p> 
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
                    <span class="fighter-wins">${
                      data.fighterWins
                    }</span>Losses:<span
                      class="fighter-losses"
                    >
                      ${data.fighterLosses}</span
                    >Draws:<span class="fighter-draws">${
                      data.fighterDraws
                    }</span>
                  </p>
                  <div class="fighter-results-stats">
                    <p class="fighter-info"><span>Submissions:</span>${
                      data.submissions
                    }</p>
                    <p class="fighter-info"><span>Knockkouts:</span>${
                      data.knockouts
                    }</p>
                    <p class="fighter-info"><span>Titlewins:</span>${
                      data.titleWins
                    }</p>
                    <p class="fighter-info"><span>Knockout Percentage:</span>${
                      data.knockoutPercentage
                    }</p>
                    <p class="fighter-info"><span>Striking Accuracy:</span>${
                      data.strikeAccuracy
                    }</p>
                  </div>
                </div>
              </div>
            
            </div>
    
            `;

        this._parentElement.insertAdjacentHTML("beforeend", markup);
      }
    } catch (err) {
      console.log(err);
    }
  };
}
export default new popupView();
