import eventsView from "./Views/eventsView.js";

import PaginationView from "./Views/PaginationView.js";

const events = function () {
  eventsView.renderUpcomingEvents();
  eventsView.renderPastEvents();
  eventsView.toggleActive();
};
const pagination = function () {
  PaginationView.renderPagination();
  PaginationView.changePage();
};

const init = function () {
  events();
  pagination();
};
init();
