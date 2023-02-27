import * as apis from "../apis.js";
import eventsView from "./Views/eventsView.js";
import eventInfoView from "./Views/eventInfoView.js";
import PaginationView from "./Views/PaginationView.js";
import popupView from "../Home/Views/popupView.js";

const getAllInfo = async () => {
  await apis.getAllFighters();
};

const events = async function () {
  eventsView.renderUpcomingEvents();
  eventsView.renderPastEvents();
  eventsView.toggleActive();
  eventInfoView.renderEvents();
  eventInfoView.goBack();
};

const popup = function () {
  popupView.renderPopup();
  popupView.removePopup();
};

const pagination = function () {
  PaginationView.renderPagination();
  PaginationView.changePage();
};

const init = async function () {
  await getAllInfo();
  events();
  pagination();
  popup();
};
init();
