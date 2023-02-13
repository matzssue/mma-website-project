import eventsView from "../Events/eventsView.js";
import * as apis from "../apis.js";
import PaginationView from "./PaginationView.js";

const init = function () {
  PaginationView.generatePagination();
  eventsView.renderUpcomingEvents();
  eventsView.renderPastEvents();
  eventsView.toggleActive();
  PaginationView.check();
};
init();
