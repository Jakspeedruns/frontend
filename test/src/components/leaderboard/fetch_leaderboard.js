// TODO - SessionStorage to reduce calls to SR.com

export function parseRunnerTimeFromResponse(difficulty, resp) {
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
      if (runnerTimes.filter((x) => x.name === name).length === 0) {
        runnerTimes.push({
          time: time,
          name: name,
        });
      }
    }
  }
  if (runnerTimes.length > 0) {
    return getScores(runnerTimes, difficulty);
  }
  return undefined;
}

// TODO - maintain place as well

export function cleanupRunnerTimeScores(runnerScores) {
  runnerScores = aggregateScores(runnerScores);
  runnerScores = runnerScores.sort((a, b) => b.points - a.points);
  for (let i = 0; i < runnerScores.length; i++) {
    runnerScores[i].points = Math.round(runnerScores[i].points);
  }
  // Combine any identical scores into one row, simpifies rendering logic substantially
  let dedupedScores = [];
  for (const score of runnerScores) {
    if (dedupedScores.length === 0 || dedupedScores[dedupedScores.length - 1].points !== score.points) {
      dedupedScores.push({
        name: score.name,
        time: score.time,
        zScore: score.zScore,
        timeFromAverage: score.timeFromAverage,
        points: score.points,
        span: 1
      });
    } else {
      dedupedScores.push({
        names: score.name,
        time: score.time,
        zScore: score.zScore,
        timeFromAverage: [score.timeFromAverage],
        points: null,
      });
      dedupedScores[dedupedScores.length - 1].span++;
    }
  }
  return dedupedScores;
}

export function secondsToHumanFormat(time) {
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

// Source: https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function aggregateScores(datas) {
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
      // TODO - using infinities is just...strange?
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

// function getLeaderboard($gameName = null, $categoryName = null, $subcategoryName = null, $extensionGame = null)
// {
//     global $gameAndCategoryInfo;

//     $results = [];
//     // Get everything
//     if ($gameName == null && $categoryName == null && $subcategoryName == null) {
//         foreach ($gameAndCategoryInfo as $game => $gameCategories) {
//             $categories = getCategories($gameCategories);
//             array_push($results, ["gameName" => $game, "categories" => $categories]);
//         }
//     }
//     // Get everything for a particular game
//     else if ($gameName != null && $categoryName == null && $subcategoryName == null) {
//         if (array_key_exists($gameName, $gameAndCategoryInfo)) {
//             $categories = getCategories($gameAndCategoryInfo[$gameName]);
//             array_push($results, ["gameName" => $gameName, "categories" => $categories]);
//         }
//     }
//     // Get everything for a particular category
//     // NOTE - assumes they didnt omit the subcategory if its actually a category of subcategories
//     else if ($gameName != null && $categoryName != null && $subcategoryName == null) {
//         if (array_key_exists($gameName, $gameAndCategoryInfo)) {
//             $gameCategories = $gameAndCategoryInfo[$gameName];
//             if (array_key_exists($categoryName, $gameCategories)) {
//                 $categoryDifficulty = $gameCategories[$categoryName]["difficulty"];
//                 array_push($results, ["gameName" => $gameName, "categories" => [["name" => $categoryName, "difficulty" => $categoryDifficulty, "subcategories" => []]]]);
//             }
//         }
//     }
//     // Get everything for a particular subcategory
//     else if ($gameName != null && $categoryName != null && $subcategoryName != null) {
//         if (array_key_exists($gameName, $gameAndCategoryInfo)) {
//             $gameCategories = $gameAndCategoryInfo[$gameName];
//             if (array_key_exists($categoryName, $gameCategories)) {
//                 $category = $gameCategories[$categoryName];
//                 if (array_key_exists($subcategoryName, $category)) {
//                     $subcategoryDifficulty = $category[$subcategoryName]["difficulty"];
//                     array_push($results, ["gameName" => $gameName, "categories" => [["name" => $categoryName, "subcategories" => [["name" => $subcategoryName, "difficulty" => $subcategoryDifficulty]]]]]);
//                 }
//             }
//         }
//     }

//     // Include extension categories
//     if ($extensionGame != null && $gameName != null && $categoryName == null && $subcategoryName == null) {
//         if (array_key_exists($extensionGame, $gameAndCategoryInfo) && array_key_exists($gameName, $gameAndCategoryInfo[$extensionGame])) {
//             $subCategories = [];
//             foreach ($gameAndCategoryInfo[$extensionGame][$gameName] as $subCategory => $subcategoryInfo) {
//                 array_push($subCategories, ["name" => $subCategory, "difficulty" => $subcategoryInfo["difficulty"]]);
//             }
//             array_push($results, ["gameName" => $extensionGame, "categories" => [["name" => $gameName, "subcategories" => $subCategories]]]);
//         }
//     }

//     return json_encode($results);
// }

function renderTable(categoryLeaderboard, runnerTimes) {
  // TODO - i think this can be simplified, i think scoreLock has something to do with
  // rows with the same amount of points?
  




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

