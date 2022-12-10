import * as apis from "./apis.js";
import mainFightView from "./mainFightView.js";
import otherFightView from "./otherFightView.js";

const renderMainPage = async function () {
  await apis.getUfcNearestEvent();
  await apis.getEventInfo(apis.state.currentEvent.id);
  mainFightView._generateMarkup();
  otherFightView._generateMarkup();
  otherFightView.toggleMarkup();
};

const init = async function () {
  await renderMainPage();
};

init();
