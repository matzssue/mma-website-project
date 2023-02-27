import eventsView from "./Views/eventsView.js";
import eventInfoView from "./Views/eventInfoView.js";
import PaginationView from "./Views/PaginationView.js";

const events = async function () {
  eventsView.renderUpcomingEvents();
  eventsView.renderPastEvents();
  eventsView.toggleActive();
  eventInfoView.workPls();
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
