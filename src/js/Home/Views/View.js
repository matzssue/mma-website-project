export default class View {
  _clear() {
    return (this._parentElement.innerHTML = "");
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          
        </div> 
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //   renderError(message = this._errorMessage) {
  //     const markup = `
  //     <div class="error">
  //       <div>
  //         <svg>
  //           <use href="${icons}#icon-alert-triangle"></use>
  //         </svg>
  //        </div>
  //       <p>${message}</p>
  //   </div>
  //     `;
  //     this._clear();
  //     this._parentElement.insertAdjacentHTML("afterbegin", markup);
  //   }

  //   renderMessage(message = this._message) {
  //     const markup = `
  //     <div class="message">
  //       <div>
  //         <svg>
  //           <use href="${icons}#icon-smile"></use>
  //         </svg>
  //        </div>
  //       <p>${message}</p>
  //   </div>
  //     `;
  //     this._clear();
  //     this._parentElement.insertAdjacentHTML("afterbegin", markup);
  //   }
}
