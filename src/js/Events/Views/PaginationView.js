import * as apis from "../../apis.js";
import { ELEMENT_PER_PAGE } from "../../config.js";
import View from "../../View.js";
import eventsView from "./eventsView.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination-container");

  renderPagination() {
    const yearButtons = document.querySelector(".set-year-buttons");
    yearButtons.addEventListener("click", this.generateMarkup);
  }

  generateMarkup = async (e) => {
    this._clear();

    if (e.target.classList.value === "btn-year")
      apis.state.pastEvents = await apis.getUfcEvents(e.target.innerHTML);
    this.lastPage();
    if (apis.state.search.maxPage > 1) {
      const markup = `
        <div class="pagination">
        <button class="pagination-button" id="prev-button" title="Previous page" aria-label="Previous page">
        &lt;
        </button>
        <div id="pagination-number">${apis.state.search.page}
        </div>
      
        <button class="pagination-button" id="next-button" title="Next page" aria-label="Next page">
        &gt;
        </button>
        </div>
   
   `;

      this._parentElement.insertAdjacentHTML("beforeend", markup);
    }
  };
  getSearchResultsPage(page = apis.state.search.page) {
    const start = (page - 1) * ELEMENT_PER_PAGE;
    const end = page * ELEMENT_PER_PAGE;
    return apis.state.pastEvents.slice(start, end);
  }
  lastPage() {
    const maxPage = Math.ceil(apis.state.pastEvents.length / ELEMENT_PER_PAGE);
    return (apis.state.search.maxPage = maxPage);
  }

  previousPage = async (e) => {
    if (apis.state.search.page > 1 && e.target.id === "prev-button") {
      apis.state.search.page = apis.state.search.page - 1;
      this.generateMarkup(e);
      await eventsView.generatePastEvents(e);
    }
  };
  nextPage = async (e) => {
    if (
      apis.state.search.page < apis.state.search.maxPage &&
      e.target.id === "next-button"
    ) {
      // console.log(e.target);
      apis.state.search.page = apis.state.search.page + 1;
      this.generateMarkup(e);
      await eventsView.generatePastEvents(e);
    }
  };

  changePage() {
    const paginationContainer = document.querySelector(".pagination-container");

    paginationContainer.addEventListener("click", this.nextPage);
    paginationContainer.addEventListener("click", this.previousPage);
  }
}
export default new PaginationView();
