class mainFightView {
  #parentElement = document.querySelector(".main-event");

  _generateMarkup(result) {
    const date = result.currentEvent.day;
    const convertedDate = new Date(date);
    const fighterOne = result.mainFight[0];
    const fighterTwo = result.mainFight[1];

    const markup = ` 
    
    <div class="main-event-info">
      <h2>${result.currentEvent.name}</h2>
      <span class="main-event-place"
        >Date: ${convertedDate}</span
      >
      </div>
      <div class="main-event-fighters-container">
      <div class="main-event-fighter-info left-container">
        <span class="main-event-fighter-name">${fighterOne.FirstName} ${fighterOne.LastName}</span>
        <img
          class="main-event-fighter-img"
          src="/src/img/fighters/1.jpg"
          alt=""
        />
        <span class="main-event-fighter-results"
          >${fighterOne.PreFightWins}-${fighterOne.PreFightLosses}-${fighterOne.PreFightDraws} <br />(win-loss-draw)</span
        >
      </div>
      <div class="center-container">
        <h3 class="center-text">VS</h3>
        <h4 class="center-info-time">TIME LEFT:</h4>
      </div>
      <div class="main-event-fighter-info right-container">
        <span class="main-event-fighter-name">${fighterTwo.FirstName} ${fighterTwo.LastName}</span>
        <img
          class="main-event-fighter-img"
          src="/src/img/fighters/2.jpg"
          alt=""
        />
        <span class="main-event-fighter-results"
          >${fighterTwo.PreFightWins}-${fighterTwo.PreFightLosses}-${fighterTwo.PreFightDraws} <br />(win-loss-draw)</span
        >
</div> 
`;

    this.#parentElement.insertAdjacentHTML("beforeend", markup);
  }
}

export default new mainFightView();
