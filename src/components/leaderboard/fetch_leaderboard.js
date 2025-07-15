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
        name: score.name,
        time: score.time,
        zScore: score.zScore,
        timeFromAverage: [score.timeFromAverage],
        points: null,
        span: 1
      });
      // iterate backwards until we find an entry with non-null points, increment it's span
      for (let i = dedupedScores.length - 1; i >= 0; i--) {
        if (dedupedScores[i].points !== null) {
          dedupedScores[i].span++;
          break;
        }
      }
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

//Find the max points for each category
function getMaxPoints(scores) {
  let maxValue = scores[0];
  for (let i = 1; i < scores.length; i++) {
    if (scores[i] > maxValue) {
      maxValue = scores[i];
    }
  }
  return maxValue;
}

// Given an array of objects { name, time }, returns an array of objects { name, time, zScore (standard deviations away from average; negative is faster, positive is slower), points }.
function getScores(runnerTimes, difficulty) {
  let filter = filterRunsBySd(runnerTimes);
  let filteredRuns = filter.runnerTimes;
  let average = filter.average;
  let runCount = filteredRuns.length;
  let sd = filter.sd;
  let points = 0;

  let scores = [];
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
      if (difficulty == 11) {
        points *= 1
      } else if (difficulty == 12) {
        points *= 3 / 2
      } else if (difficulty == 13) {
        points *= 2
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
        else if (difficulty == 2 || difficulty == 12) {
          points *= (1 / 6);
        }
        else if (difficulty == 1 || difficulty == 11) {
          points *= (1 / 32);
        }
        else {
          points *= 0;
        }
        points *= .5;
      }
    }

    if (difficulty == 1) {
      points += 10;
    } else if (difficulty == 2) {
      points += 50;
    } else if (difficulty == 3) {
      points += 50;
    } else if (difficulty == 4) {
      points += 100;
    } else if (difficulty == 11) {
      points += 5;
    } else if (difficulty == 12) {
      points += 10;
    } else if (difficulty == 13) {
      points += 25;
    } else if (difficulty == 14) {
      points += 50;
    }

    scores.push(points)

    runnerScores.push({
      name: runnerTimes[i].name,
      time: runnerTimes[i].time,
      zScore: zScore,
      timeFromAverage: runnerTimes[i].time - average,
      points: points
    });
  }

  let maxPoints=getMaxPoints(scores);

  for (let i = 0; i < runnerScores.length; i++) { //Can definitely be optimized, but it works
    
    let pointBoost=0;

    if (difficulty > 0) {
      if (difficulty == 1) {
        pointBoost=10;
        if (runCount > 24) {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*(250-pointBoost))+pointBoost;
        } else {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*((runCount*10)-pointBoost))+pointBoost;
        }
      } else if (difficulty == 2) {
        pointBoost=25;
        if (runCount > 99) {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*(1000-pointBoost))+pointBoost;
        } else {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*((runCount*10)-pointBoost))+pointBoost;
        }
      } else if (difficulty == 3) {
        pointBoost=50;
        if (runCount > 24) {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*(1000-pointBoost))+pointBoost;
        } else {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*((runCount*40)-pointBoost))+pointBoost;
        }
      } else if (difficulty == 4) {
        pointBoost=100;
        if (runCount > 9) {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*(1000-pointBoost))+pointBoost;
        } else {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*((runCount*100)-pointBoost))+pointBoost;
        }
      } else if (difficulty == 11) {
        pointBoost=5;
        if (runCount > 19) {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*(100-pointBoost))+pointBoost;
        } else {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*((runCount*5)-pointBoost))+pointBoost;
        }
      } else if (difficulty == 12) {
        pointBoost=10;
        if (runCount > 49) {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*(500-pointBoost))+pointBoost;
        } else {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*((runCount*10)-pointBoost))+pointBoost;
        }
      } else if (difficulty == 13) {
        pointBoost=25;
        if (runCount > 24) {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*(500-pointBoost))+pointBoost;
        } else {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*((runCount*20)-pointBoost))+pointBoost;
        }
      } else if (difficulty == 14) {
        pointBoost=50;
        if (runCount > 9) {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*(500-pointBoost))+pointBoost;
        } else {
          runnerScores[i].points = (((runnerScores[i].points-pointBoost)/(maxPoints-pointBoost))*((runCount*50)-pointBoost))+pointBoost;
        }
      }
    }
  }
  return runnerScores;
}
