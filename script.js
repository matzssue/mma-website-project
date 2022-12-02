const getData = function () {
  const api = fetch(
    // "https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/2022?key=541e5715021b4ab1982eea8853c2c39a"
    "https://api.sportsdata.io/v3/mma/scores/json/Event/226?key=541e5715021b4ab1982eea8853c2c39a"
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
};
getData();
