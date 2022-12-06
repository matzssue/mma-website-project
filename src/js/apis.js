import { LEAGUE, UFC_API_KEY } from "./config.js";

export const state = {
  currentEvent: {},
  mainFight: [],
  otherFights: {},
};

export const getRandomPeople = async function () {
  try {
    const api = await fetch("https://randomuser.me/api/");
    const data = await api.json();
    const randomPicture = data.results[0].picture.medium;
    return randomPicture;
  } catch (err) {
    console.log(err);
  }
};
getRandomPeople();

export const getUfcNearestEvent = async function () {
  try {
    const currentYear = new Date().getFullYear();
    const api = await fetch(
      `https://api.sportsdata.io/v3/mma/scores/json/Schedule/${LEAGUE}/${currentYear}?key=${UFC_API_KEY}`
    );
    const data = await api.json();

    const event = data.filter((event) => event.Status == "Scheduled")[0];
    state.currentEvent = {
      id: event.EventId,
      name: event.Name,
      day: event.DateTime,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getEventInfo = async function () {
  try {
    await getUfcNearestEvent();
    const api = await fetch(
      `https://api.sportsdata.io/v3/mma/scores/json/Event/${state.currentEvent.id}?key=${UFC_API_KEY}`
    );
    const data = await api.json();
    const fights = data.Fights;
    const activeFights = fights.filter((fight) => fight.Active);
    state.mainFight = activeFights[0].Fighters;

    // Getting only important informations from API_DATA

    state.otherFights = activeFights.slice(1).map((event) =>
      event.Fighters.map((fighter) => {
        return {
          fullname: `${fighter.FirstName} ${fighter.LastName}`,
          fightresults: `${fighter.PreFightWins}-${fighter.PreFightLosses}-${fighter.PreFightDraws}`,
        };
      })
    );
  } catch (err) {
    console.log(err);
  }
};
