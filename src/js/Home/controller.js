import * as apis from "../apis.js";
import mainFightView from "../Home/Views/mainFightView.js";
import otherFightView from "../Home/Views/otherFightView.js";

const renderMainPage = async function () {
  await apis.getUfcNearestEvent();
  await apis.getEventInfo(apis.state.currentEvent.id);
  await apis.getAllFighters();
  await mainFightView._generateMarkup();
  mainFightView.setFighterName();
  otherFightView.toggleMarkup();
};

const init = async function () {
  await renderMainPage();
};

init();
