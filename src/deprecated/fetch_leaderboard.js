// HERE BY DRAGONS
// - re-write this in a modern way (Svelte/React/Etc)

import { gameIds } from "./game_ids";

export const gameAndCategoryInfo = {
  "daxter": {
    "any": { "difficulty": 3, "title": "Any%" },
    "all-missions": { "difficulty": 3, "title": "All Missions" },
    "hundred-and-one": { "difficulty": 2, "title": "101%" },
  },
  "jak1": {
    "no-lts": { "difficulty": 2, "title": "No LTS" },
    "no-fcs": { "difficulty": 3, "title": "No FCS" },
    "any": { "difficulty": 4, "title": "Any%" },
    "hundred": { "difficulty": 2, "title": "100%" },
    "orbless": { "difficulty": 3, "title": "Orbless" },
    "no-major-skips": { "difficulty": 2, "title": "No Major Skips" },
    "all-flies": { "difficulty": 3, "title": "All Flies" },
    "all-orbs": {
      "difficulty": 3, "title": "All Orbs"
    }
  },
  "jak2": {
    "any": { "difficulty": 2, "title": "Any%" },
    "any-hoverless": { "difficulty": 3, "title": "Any% - Hoverless" },
    "all-missions": { "difficulty": 3, "title": "All Missions" },
    "hundred": { "difficulty": 3, "title": "100%" },
    "any-all-orbs": { "difficulty": 2, "title": "Any% - All Orbs" },
    "any-hero-mode": {
      "difficulty": 2, "title": "Any% - Hero Mode"
    }
  },
  "jak3": {
    "any": { "difficulty": 3, "title": "Any%" },
    "any-hero-mode": { "difficulty": 2, "title": "Any% - Hero Mode" },
    "any-no-oob": { "difficulty": 2, "title": "Any% - No OoB" },
    "all-missions": { "difficulty": 3, "title": "All Missions" },
    "hundred": { "difficulty": 3, "title": "100%" },
    "any-all-orbs": { "difficulty": 2, "title": "Any% - All Orbs" },
  },
  "jaktlf": {
    "any": { "difficulty": 2, "title": "Any%" },
    "hundred": { "difficulty": 4, "title": "100%" },
    "any-hero-mode": { "difficulty": 2, "title": "Any% - Hero Mode" },
    "hundred-and-one": { "difficulty": 4, "title": "101%" },
    "hero-mode-no-sps": { "difficulty": 2, "title": "Hero Mode No SPS" },
  },
  "jakx": {
    "any": { "difficulty": 3, "title": "Any%" },
    "all-cups": { "difficulty": 2, "title": "All Cups" },
    "hundred": { "difficulty": 4, "title": "100%" },
    "any-hero-mode": { "difficulty": 3, "title": "Any% - Hero Mode" },
    "100-hero-mode": { "difficulty": 3, "title": "100% - Hero Mode" },
  },
  // "jakext": {
  //   "jak1": {
  //     "low-eco": { "difficulty": 13, "title": "Low Eco" },
  //     "any-debug": { "difficulty": 1, "title": "Any% - Debug Mode" },
  //     "100-hub1": { "difficulty": 0, "title": "100% - Hub 1" },
  //     "100-hub2": { "difficulty": 0, "title": "100% - Hub 2" },
  //     "100-hub3": { "difficulty": 0, "title": "100% - Hub 3" },
  //     "new-game-plus": { "difficulty": 1, "title": "NG+" },
  //     "new-game-plus-no-lw": { "difficulty": 1, "title": "NG+ No LW" },
  //     "52-pickup": { "difficulty": 0, "title": "52 Pickup" },
  //     "all-flies-and-orbs": { "difficulty": 0, "title": "All Flies and Orbs" },
  //     "orbless-max": { "difficulty": 0, "title": "Orbless Max%" },
  //     "9-eco": { "difficulty": 0, "title": "9 Eco" },
  //     "10-eco": { "difficulty": 0, "title": "10 Eco" },
  //     "1-x-press": { "difficulty": 0, "title": "1 X Press" },
  //     "100-debug": { "difficulty": 0, "title": "100% - Debug Mode" },
  //     "no-damage": { "difficulty": 0, "title": "No Damage" },
  //     "kill-all-animals": { "difficulty": 1, "title": "Kill All Animals" },
  //     "all-cutscenes": { "difficulty": 2, "title": "All Cutscenes" },
  //     "new-game-plus-all-flies": { "difficulty": 1, "title": "NG+ All Flies" },
  //     "dark-glitch-no-lts": { "difficulty": 0, "title": "Dark Glitch No LTS" },
  //     "return-muse": { "difficulty": 0, "title": "Return Muse" }
  //   },
  //   "jak2": {
  //     "gunless": { "difficulty": 0, "title": "Gunless" },
  //     "any-debug": { "difficulty": 1, "title": "Any% - Debug Mode" },
  //     "developer-picture": { "difficulty": 1, "title": "Developer Picture" },
  //     "ashelin-stalker": { "difficulty": 0, "title": "Ashelin Stalker" },
  //     "all-missions-act-1": { "difficulty": 0, "title": "All Missions - Act 1" },
  //     "any-mirrored": { "difficulty": 0, "title": "Any% Mirrored" }
  //   },
  //   "jak3": {
  //     "any-debug": { "difficulty": 1, "title": "Any% - Debug" },
  //     "all-open-orbs": { "difficulty": 0, "title": "All Open Orbs" },
  //     "hero-mode-all-bosses": { "difficulty": 0, "title": "Hero Mode All Bosses" },
  //   },
  //   "jak2-flash-game": {
  //     "any": { "difficulty": 2, "title": "Any%" },
  //     "any-hero-mode": { "difficulty": 1, "title": "Any% - Hero Mode" },
  //   },
  //   "daxter": { "all-masks": { "difficulty": 0, "title": "All Masks" } },
  // },
  "trifecta": {
    "any": { "difficulty": 3, "title": "Any%" },
    "hundred": { "difficulty": 4, "title": "100%" },
    "any-debug": { "difficulty": 1, "title": "Any% - Debug Mode" },
  }
}

let totalRequests = 0;
let completedRequests = 0;
let unsuccessfulRequests = 0;

// Make a leaderboard for a game(s) with multiple categories
// - categories must be provided
export function makeGameLeaderboard(leaderboardQuery) {
  totalRequests = 0;
  completedRequests = 0;
  unsuccessfulRequests = 0;

  renderTableLoading(false);
  getLeaderboardTimes(leaderboardQuery).then((runnerTimes) => {
    renderTable(false, runnerTimes)
  });
}

// Make a leaderboard for an individual category, ie. jak 2 - any%
// - category must be provided
export function makeCategoryLeaderboard(leaderboardQuery) {
  totalRequests = 0;
  completedRequests = 0;
  unsuccessfulRequests = 0;

  renderTableLoading(true);
  getLeaderboardTimes(leaderboardQuery).then((runnerTimes) => {
    renderTable(true, runnerTimes)
  });
}

async function requestTimesAndStore(url, difficulty, runnerTimesAccumulator) {
  let resp = await fetch(url, {
    method: 'GET'
  });
  completedRequests++;
  document.getElementById("lb-completedRequests").innerHTML = completedRequests;
  if (!resp.ok) {
    unsuccessfulRequests++;
  }
  let data = await resp.json();
  addRunnerTimes(difficulty, data, runnerTimesAccumulator);
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// This and the older implementation did not do any pagination, but could be resolved fairly easily now

// In order to simplify this function I removed the following functionality since it wasn't being used
// - given a game and no category information, go through all the categories
async function getLeaderboardTimes(leaderboardQuery) {
  let runnerTimes = [];
  let srcRequests = [];

  let delayAfterNumRequests = 5;
  let requestCount = 0;

  // Loop through games
  for (const leaderboardArg of leaderboardQuery) {
    if (!("gameName" in leaderboardArg) && !("categories" in leaderboardArg) && !(leaderboardArg.gameName in gameIds)) {
      continue;
    }
    let gameName = leaderboardArg.gameName;
    let gameId = gameIds[gameName].id;
    // Loop through categories
    for (const category of leaderboardArg.categories) {
      if (!(category.name in gameIds[gameName].categories)) {
        continue;
      }
      let categoryName = category.name;
      let categoryId = gameIds[gameName].categories[categoryName].id;
      let subcategoryNames = [];
      let subcategoryDifficulties = [];
      // If subcategories were provided, we'll use them
      if ("subcategories" in category) {
        subcategoryNames = category.subcategories.map(o => o.name);
        subcategoryDifficulties = category.subcategories.map(o => o.difficulty);
      } else if ("subcategories" in gameIds[gameName].categories[categoryName]) { // Otherwise, get the subcategories we have stored
        subcategoryNames = Object.keys(gameIds[gameName].categories[categoryName].subcategories);
        subcategoryDifficulties = subcategoryNames.map(_ => category.difficulty);
      } // otherwise, there are no subcategories

      // TODO could be cleaned up, made a mess again
      var subcategoriesObjects = subcategoryNames.map(function (a, i) {
        return [a, subcategoryDifficulties[i]];
      });

      if (subcategoriesObjects.length > 0) {
        for (const subcategoryObject of subcategoriesObjects) {
          // should check to see if a valid subcategory
          let subcategory = gameIds[gameName].categories[categoryName].subcategories[subcategoryObject[0]];
          srcRequests.push(
            requestTimesAndStore(`https://www.speedrun.com/api/v1/leaderboards/${gameId}/category/${categoryId}?var-${subcategory.id}=${subcategory.val}&embed=players`,
              subcategoryObject[1],
              runnerTimes));
          // TODO - gross duplication
          totalRequests++;
          document.getElementById("lb-totalRequests").innerHTML = totalRequests;
          requestCount++;
          if (requestCount >= delayAfterNumRequests) {
            requestCount = 0;
            await delay(200); // ms
          }
        }
      } else {
        srcRequests.push(
          requestTimesAndStore(`https://www.speedrun.com/api/v1/leaderboards/${gameId}/category/${categoryId}?embed=players`,
            category.difficulty,
            runnerTimes));
        totalRequests++;
        document.getElementById("lb-totalRequests").innerHTML = totalRequests;
        requestCount++;
        if (requestCount >= delayAfterNumRequests) {
          requestCount = 0;
          await delay(200); // ms
        }
      }
    }
  }
  await Promise.allSettled(srcRequests);
  return runnerTimes;
}

function addRunnerTimes(difficulty, resp, runnerTimesAccumulator) {
  let runnerTimes = [];
  // Make an array of players with their times.
  for (let r = 0; r < resp.data.runs.length; r++) {
    let run = resp.data.runs[r].run;
    let time = run.times.primary_t;

    for (let p = 0; p < run.players.length; p++) {
      // Player names are stored in two different formats.
      // - one is for guests (no SRC accounts)
      // - the other is for normal users with accounts
      let name = "[Unknown]";
      if (run.players[p].name) {
        name = run.players[p].name;
      } else {
        for (let i = 0; i < resp.data.players.data.length; i++) {
          let player = resp.data.players.data[i];
          if (player.id === run.players[p].id) {
            name = player.names.international;
            break;
          }
        }
      }

      if (runnerTimes.filter(x => x.name === name).length === 0) {
        runnerTimes.push({
          time: time,
          name: name
        });
      }
    }
  }

  if (runnerTimes.length > 0) {
    runnerTimesAccumulator.push(getScores(runnerTimes, difficulty));
  }
};

function renderTableLoading(categoryLeaderboard) {
  document.getElementById("leaderboard").innerHTML = `<tr>
      <th colspan="${categoryLeaderboard ? 6 : 3}">Loading... (<span id="lb-completedRequests">0</span>/<span id="lb-totalRequests">0</span>)</th>
      <th>Leaderboards not loading? Check the <a href="https://jakspeedruns.com/faq"><font color="#ffd359">FAQ</font></a> page.</th>
  </tr>`;
}

// ----
// Things I do not dare modify begins
// ----

function renderTable(categoryLeaderboard, runnerTimes) {

  let scores = aggregate(runnerTimes);

  if (scores.length <= 0) {
    document.getElementById("leaderboards").innerHTML = "No runs :(";
    return;
  }

  // Orders by points, most points first.
  scores.sort((a, b) => b.points - a.points);

  let finalOutput = "";
  finalOutput = `<thead>
<tr>
<th>Rank</th>
<th>Player</th>`;

  if (categoryLeaderboard) {
    finalOutput += `
<th style="text-align: center;">Time</th>
<th style="text-align: center;">TFA</th>
<th>&sigma;&nbsp;Away</th>`;
  }

  finalOutput += `		<th style="text-align: center;">Points</th>
</tr>`;

  if (unsuccessfulRequests > 0) {
    finalOutput += `
  <tr>
      <th colspan="${categoryLeaderboard ? 6 : 3}">Errors while calculating</th>
  </tr>
  `;
  }

  finalOutput += `
</thead>`;

  for (let i = 0; i < scores.length; i++) {
    scores[i].points = Math.round(scores[i].points);
  }

  let scoreLock = 0;

  for (let i = 0; i < scores.length; i++) {
    let initialScoreLock = false;
    if (scoreLock <= 0 && (i + 1) < scores.length && scores[i].points === scores[i + 1].points) {
      initialScoreLock = true;
      scoreLock++;
      while ((i + scoreLock) < scores.length && scores[i].points === scores[i + scoreLock].points) {
        scoreLock++;
      }
    }

    let row = "<tr> ";
    if (scoreLock > 0) {
      if (initialScoreLock) {
        row += `<td rowspan="${scoreLock}" style="vertical-align: middle;">${i + 1}</td>`;
      } else {
        row += ``;
      }
    } else {
      row += `<td>${i + 1}</td>`;
    }

    row += ` <td>${scores[i].name}</td>`;
    if (categoryLeaderboard) {
      let score;
      if (scores[i].zScore === Number.POSITIVE_INFINITY) {
        score = "&infin;";
      } else if (scores[i].zScore === Number.NEGATIVE_INFINITY) {
        score = "-&infin;";
      } else {
        score = scores[i].zScore.toFixed(3);
      }
      row += ` <td style="text-align: center;">${secondsToHumanFormat(scores[i].time)}</td> <td style="text-align: center;">${secondsToHumanFormat(scores[i].timeFromAverage)}</td> <td>${score}</td>`;
    }

    if (scoreLock > 0) {
      if (initialScoreLock) {
        row += `<td rowspan="${scoreLock}" style="vertical-align: middle; text-align: center;">${scores[i].points.toLocaleString('en')}</td>`;
      } else {
        row += ``;
      }
    } else {
      row += `<td style="text-align: center;">${scores[i].points.toLocaleString('en')}</td>`;
    }

    row += " </tr>";

    finalOutput += row;

    if (scoreLock > 0) {
      scoreLock--;
    }
  }

  document.getElementById("leaderboard").innerHTML = finalOutput;
}

function aggregate(datas) {
  const allDatas = [];
  for (let i = 0; i < datas.length; i++) {
    for (let j = 0; j < datas[i].length; j++) {

      allDatas.push(datas[i][j]);
    }
  }

  let realScores = [];
  const grouped = groupBy(allDatas, "name");
  const keys = Object.keys(grouped);
  for (let i = 0; i < keys.length; i++) {
    const data = grouped[keys[i]];
    for (let j = 1; j < data.length; j++) {
      data[0].time += data[j].time;
      data[0].zScore += data[j].zScore;
      data[0].points += data[j].points;
    }
    realScores.push(data[0]);
  }

  return realScores;
}

// Source: https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function secondsToHumanFormat(time) {
  let totalSeconds = Math.abs(Math.floor(time));

  let hours = Math.floor(totalSeconds / 3600);
  if (hours !== 0 && hours < 10) {
    hours = `${hours}`;
  }

  totalSeconds %= 3600;

  let minutes = Math.floor(totalSeconds / 60);

  let seconds = totalSeconds % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  }
}

//Find the maximum Zscore for each category based on number of runners
function getMaxZScore(runCount) {
  if (runCount < 5) {
    return 3;
  }
  else if (runCount < 100) {
    return Math.sqrt(runCount / 25) + 3;
  }
  else {
    return 5;
  }
}

// Given an array of objects { name, time }, returns an array of objects { name, time, zScore (standard deviations away from average; negative is faster, positive is slower), points }.
function getScores(runnerTimes, difficulty) {
  let filter = filterRunsBySd(runnerTimes);
  let filteredRuns = filter.runnerTimes;
  let average = filter.average;
  let runCount = filteredRuns.length;
  let sd = filter.sd;
  let points = 0;

  let runnerScores = [];

  for (let i = 0; i < runnerTimes.length; i++) {

    let zScore = (runnerTimes[i].time - average) / sd;

    // Special case.
    if (runCount < 3) {
      if (i === 0) {
        zScore = Number.POSITIVE_INFINITY;
        points = runCount === 1 ? 5 : 15;
      } else if (i === 1) {
        zScore = Number.NEGATIVE_INFINITY;
        points = runCount === 1 ? 0 : 5;
      } else {
        zScore = Number.NEGATIVE_INFINITY;
        points = 0;
      }
      if (difficulty == 13) {
        points *= 3 / 2
      } else if (difficulty == 14) {
        points *= 4
      } else {
        points *= difficulty / (5 - difficulty)
      }
      points = Math.abs(points)

    } else {
      // zScore is negative when the runner is faster than average, and positive when they are slower. Thus, subtracting it will be addition when faster and subtraction when slower.
      //let points = Math.max((runCount * 5) - (runCount * zScore), 0);
      //let points = Math.max((Math.log(runCount) * 12.5 * 5) - (Math.log(runCount) * 12.5 * zScore), 0);
      if (zScore >= getMaxZScore(runCount)) {
        points = 0
      } else {
        points = Math.max((Math.log(runCount) * (5 - zScore) * (1 - Math.pow(Math.E, ((-(5 - zScore) / 8))))) ** Math.E, 0);
        if (difficulty == 4 || difficulty == 14) {
          points *= 1;
        }
        else if (difficulty == 3 || difficulty == 13) {
          points *= (1 / 2);
        }
        else if (difficulty == 2) {
          points *= (1 / 6);
        }
        else if (difficulty == 1) {
          points *= (1 / 32);
        }
        else {
          points *= 0;
        }
        points *= .5;
      }
    }

    if (difficulty > 2) {
      if (difficulty == 3) {
        points += 50;
      } else if (difficulty == 4) {
        points += 100;
      } else if (difficulty == 13) {
        points += 25;
      } else if (difficulty == 14) {
        points += 50;
      }
    }


    runnerScores.push({
      name: runnerTimes[i].name,
      time: runnerTimes[i].time,
      zScore: zScore,
      timeFromAverage: runnerTimes[i].time - average,
      points: points
    });
  }

  return runnerScores;
}

// Given an array of objects { name, time }, returns an object { runnerTimes, sd, average }. Items are removed from runnerTimes if they are 3 standard deviations slower than average.
function filterRunsBySd(runnerTimes) {
  const runCount = runnerTimes.length;

  // Take all runs in a category and find the average
  let average = 0;
  for (let i = 0; i < runCount; i++) {
    average += runnerTimes[i].time;
  }
  average /= runCount;

  // Take all runs in a category and find the average distance from the average
  let mean = 0;
  for (let i = 0; i < runCount; i++) {
    mean += Math.abs(average - runnerTimes[i].time);
  }

  mean = mean / runCount;
  mean = mean.toFixed(0);

  // Determine the standard deviation of the distances from the average (a measure of how spread out the data set is)
  let sd = 0;
  for (let i = 0; i < runCount; i++) {
    sd += (Math.abs(average - runnerTimes[i].time) - mean) ** 2;
  }

  sd = sd / runCount;
  sd = sd ** 0.5;

  // If a run that is slower than the average is more than 5 standard deviations away, remove that run and recalculate.
  let newList = [];
  for (let i = 0; i < runnerTimes.length; i++) {
    let zScore = (runnerTimes[i].time - average) / sd;
    if (zScore < getMaxZScore(runCount)) {
      newList.push(runnerTimes[i]);
    }
  }

  // 1 runner and 2 runners are handled by special cases.
  if (newList.length === runnerTimes.length || runnerTimes.length < 3) {
    return {
      sd: sd,
      average: average,
      runnerTimes: runnerTimes
    };
  } else {
    return filterRunsBySd(newList);
  }
}
