import eventsView from "./Views/eventsView.js";

import PaginationView from "./Views/PaginationView.js";

const init = function () {
  PaginationView.generatePagination();
  eventsView.renderUpcomingEvents();
  eventsView.renderPastEvents();
  eventsView.toggleActive();
  PaginationView.check();
};
init();
