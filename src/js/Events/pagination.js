import * as apis from "../apis.js";
import { ELEMENT_PER_PAGE } from "../config.js";
import View from "../Home/Views/View.js";

const search = {
  page: 1,
  maxPage: 0,
};

export const getSearchResultsPage = function (page = search.page) {
  const start = (page - 1) * ELEMENT_PER_PAGE;
  const end = page * ELEMENT_PER_PAGE;

  return apis.state.pastEvents.slice(start, end);
};

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination-container");

  generateMarkup() {
    const markup = `
    
    <button class="pagination-button" id="prev-button" title="Previous page" aria-label="Previous page">
    &lt;
     </button>
    <div id="pagination-number">${search.page}
    </div>
  
   <button class="pagination-button" id="next-button" title="Next page" aria-label="Next page">
    &gt;
    </button>
    
    
    `;
  }
  lastPage() {
    const maxPage = Math.ceil(apis.state.pastEvents / ELEMENT_PER_PAGE);
    return (search.maxPage = maxPage);
  }

  previousPage() {
    const btn = document.querySelector("#prev-button");
    if (search.page > 1) {
      return (search.page = search.page + 1);
    }
  }
  nextPage() {
    const btn = document.querySelector("#next-button");
    if (search.page < search.maxPage) {
      return (search.page = search.page - 1);
    }
  }
}
