import * as apis from "../apis.js";
import mainFightView from "../Home/Views/mainFightView.js";
import otherFightView from "../Home/Views/otherFightView.js";

const getAllInfo = async function () {
  await apis.getUfcNearestEvent(await apis.setYear());
  await apis.getEventInfo(apis.state.currentEvent.id);
  await apis.getAllFighters();
};

const renderMainPage = function () {
  mainFightView._renderMarkup();
  otherFightView._generateMarkup();
  otherFightView.toggleFights();
  mainFightView.renderPopup();
  mainFightView.removePopup();
};

const init = async function () {
  await getAllInfo();
  renderMainPage();
};

init();
