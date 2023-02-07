import eventsView from "../Events/eventsView.js";
import * as apis from "../apis.js";
const init = function () {
  eventsView.getYearButtons();
  eventsView.renderEvents();
  // eventsView.setActive();
  apis.getUfcEvents(2018);
};
init();
