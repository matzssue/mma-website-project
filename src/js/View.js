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

  renderError(message) {
    const markup = `
      <div class="error">
        <p>${message}</p>
    </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
