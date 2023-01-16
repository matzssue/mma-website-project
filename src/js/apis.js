import { LEAGUE, UFC_API_KEY } from "./config.js";

export const state = {
  currentEvent: {},
  mainFight: [],
  otherFights: {},
  fighterId: [],
  fighterInfo: [],
  allFighters: [],
  fighterName: "",
  buttons: [],
};

export const getRandomPeople = async function () {
  try {
    const api = await fetch("https://randomuser.me/api/");
    const data = await api.json();
    const randomPicture = data.results[0].picture.medium;
    return randomPicture;
  } catch (err) {}
};

const setYear = async function () {
  let currentYear = new Date().getFullYear();
  const api = await fetch(
    `https://api.sportsdata.io/v3/mma/scores/json/Schedule/${LEAGUE}/${currentYear}?key=${UFC_API_KEY}`
  );
  const data = await api.json();
  if (!data.some((event) => event.Status === "Scheduled"))
    return currentYear + 1;
  else return currentYear;
};

export const getUfcNearestEvent = async function () {
  try {
    const api = await fetch(
      `https://api.sportsdata.io/v3/mma/scores/json/Schedule/${LEAGUE}/${await setYear()}?key=${UFC_API_KEY}`
    );
    const data = await api.json();
    const event = data.filter((event) => event.Status == "Scheduled")[0];
    state.currentEvent = {
      id: event.EventId,
      name: event.Name,
      date: event.DateTime,
      day: event.Day,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getEventInfo = async function (eventId) {
  try {
    const api = await fetch(
      `https://api.sportsdata.io/v3/mma/scores/json/Event/${eventId}?key=${UFC_API_KEY}`
    );
    const data = await api.json();

    const fights = data.Fights;
    const activeFights = fights.filter((fight) => fight.Active);

    // Getting id of fighters from Main Event

    state.mainFight = activeFights[0].Fighters.map((fighter) => {
      return {
        id: fighter.FighterId,
      };
    });

    // Getting id of fighters from Other Events
    state.otherFights = activeFights.slice(1).map((event) =>
      event.Fighters.map((fighter) => {
        return {
          fighterId: fighter.FighterId,
        };
      })
    );
  } catch (err) {
    console.log(err);
  }
};
export const getFighterInfo = async function (fighterId) {
  try {
    const api = await fetch(
      `https://api.sportsdata.io/v3/mma/scores/json/Fighter/${fighterId}?key=${UFC_API_KEY}`
    );
    const data = await api.json();
    // Getting all important informations of fighter

    const newData = [data].map((fighter) => {
      return {
        id: fighter.FighterId,
        name: `${fighter.FirstName} ${fighter.LastName}`,
        nickname: fighter.Nickname,
        age: fighter.BirthDate,
        height: fighter.Height,
        weight: fighter.Weight,
        reach: fighter.Reach,
        fighterResults: `${fighter.Wins}-${fighter.Losses}-${fighter.Draws}`,
        submissions: fighter.Submissions,
        knockouts: fighter.TechnicalKnockouts,
        titleWins: fighter.TitleWins,
        knockoutPercentage: fighter.CareerStats.KnockoutPercentage,
        strikeAccuracy: fighter.CareerStats.SigStrikeAccuracy,
      };
    });

    state.fighterInfo = newData;

    return newData;
  } catch (err) {
    console.log(err);
  }
};
export const getAllFighters = async function () {
  try {
    const api = await fetch(
      `https://api.sportsdata.io/v3/mma/scores/json/Fighters?key=${UFC_API_KEY}`
    );
    const data = await api.json();
    const newData = data.map((fighter) => {
      return {
        fullname: `${fighter.FirstName} ${fighter.LastName}`,
        fighterId: fighter.FighterId,
      };
    });
    state.allFighters = newData;
  } catch (err) {
    console.log(err);
  }
};
