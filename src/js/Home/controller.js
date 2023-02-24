import * as apis from "../apis.js";
import mainFightView from "../Home/Views/mainFightView.js";
import otherFightView from "../Home/Views/otherFightView.js";
import popupView from "./Views/popupView.js";

const getAllInfo = async function () {
  await apis.getUfcNearestEvent(await apis.setYear());
  await apis.getEventInfo(apis.state.currentEvent.id);
  await apis.getAllFighters();
};

const renderMainPage = function () {
  mainFightView._renderMarkup();
  otherFightView._generateMarkup();
  otherFightView.toggleFights();
  popupView.renderPopup();
  popupView.removePopup();
  mainFightView.countDownTimer();
};

const init = async function () {
  await getAllInfo();
  renderMainPage();
};

init();
