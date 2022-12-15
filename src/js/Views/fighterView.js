import View from "./View.js";
import { getFighterInfo, state } from "../apis.js";

class fighterView extends View {
  _parentElement = document.querySelector("#main");
  _data = state;

  async _generateMarkup() {
    const markup = `
    
    
    `;
  }
}
