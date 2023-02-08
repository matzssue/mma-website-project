import eventsView from "../Events/eventsView.js";
import * as apis from "../apis.js";
const init = function () {
  eventsView.renderYearsEvents();
  eventsView.renderEvents();
  eventsView.renderUpcomingEvents();
  eventsView.toggleActive();
};
init();
