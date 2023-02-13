import * as apis from "../apis.js";
import { ELEMENT_PER_PAGE } from "../config.js";
import View from "../Home/Views/View.js";
import eventsView from "./eventsView.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination-container");

  generatePagination() {
    const yearButtons = document.querySelector(".set-year-buttons");

    yearButtons.addEventListener("click", this.generateMarkup);
  }
  generateMarkup = async (e) => {
    this._parentElement.innerHTML = "";
    if (e.target.classList.value === "btn-year")
      apis.state.pastEvents = await apis.getUfcEvents(e.target.innerHTML);
    this.lastPage();
    if (apis.state.search.maxPage > 1) {
      const markup = `
    
    <button class="pagination-button" id="prev-button" title="Previous page" aria-label="Previous page">
    &lt;
    </button>
    <div id="pagination-number">${apis.state.search.page}
    </div>
  
   <button class="pagination-button" id="next-button" title="Next page" aria-label="Next page">
   &gt;
   </button>
   
   
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

  previousPage() {
    const btn = document.querySelector("#prev-button");
    if (search.page > 1) {
      search.page = search.page + 1;
      this.generateMarkup;
    }
  }
  nextPage = async (e) => {
    if (apis.state.search.page < apis.state.search.maxPage) {
      apis.state.search.page = apis.state.search.page + 1;
      this.generateMarkup(e);
      await eventsView.generatePastEvents(e);
    }
  };

  check() {
    const paginationContainer = document.querySelector(".pagination-container");
    const btn = document.querySelector("#next-button");
    paginationContainer.addEventListener("click", this.nextPage);
  }
}
export default new PaginationView();
