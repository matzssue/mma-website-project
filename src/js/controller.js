import * as apis from "./apis.js";
import mainFightView from "./mainFightView.js";
import otherFightView from "./otherFightView.js";

const controlMainEvent = async function () {
  try {
    await apis.getUfcNearestEvent();
    await apis.getEventInfo();
    mainFightView._generateMarkup(apis.state);
  } catch (err) {}
};
const controlOtherEvents = async function () {
  try {
    await apis.getEventInfo();
    otherFightView._render();
  } catch (err) {
    console.log(err);
  }
};
function init() {
  controlMainEvent();
  controlOtherEvents();
}
init();
