<script setup>
import { ref, toRefs, onMounted } from "vue";
import { gameAndCategoryInfo } from "./category_config";
import { gameIds } from "./game_ids";
import { parseRunnerTimeFromResponse, cleanupRunnerTimeScores, secondsToHumanFormat } from "./fetch_leaderboard";

const props = defineProps({
  gameId: {
    type: String,
    required: false,
    default: "",
  },
  extensionGameId: {
    type: String,
    required: false,
    default: "",
  },
});
const { gameId, extensionGameId } = toRefs(props);

// state
const numRequestsTotal = ref(0);
const numRequestsSuccess = ref(0);
const numRequestsError = ref(0);
const loading = ref(false);
const singleCategory = ref(false);
const leaderboardQueryItems = ref([]);
const leaderboardScores = ref([]);
// TODO - allow filtering by game (on global page) or by category (on game page)
// show difficulties on the leaderboard page, etc

function getCategories(gameCategories) {
  let categories = [];
  for (const [categoryName, categoryInfo] of Object.entries(gameCategories)) {
    if (categoryInfo.hasOwnProperty("difficulty")) {
      categories.push({
        name: categoryName,
        difficulty: categoryInfo["difficulty"],
        subCategories: [],
      });
    } else {
      let subCategories = [];
      for (const [subCategoryName, subCategoryInfo] of Object.entries(
        categoryInfo,
      )) {
        subCategories.push({
          name: subCategoryName,
          difficulty: subCategoryInfo["difficulty"],
        });
      }
      categories.push({
        name: categoryName,
        subCategories: subCategories,
      });
    }
  }
  return categories;
}

function getLeaderboard() {
  // Determine what we want to query on
  // - simple case, get everything
  let games = [];
  if (gameId.value === "" && extensionGameId.value === "") {
    for (const [gameName, gameCategories] of Object.entries(
      gameAndCategoryInfo,
    )) {
      games.push({
        gameName: gameName,
        categories: getCategories(gameCategories),
      });
    }
  } else {
    for (const [gameName, gameCategories] of Object.entries(
      gameAndCategoryInfo,
    )) {
      if (gameName === gameId.value || gameName === extensionGameId.value) {
        games.push({
          gameName: gameName,
          categories: getCategories(gameCategories),
        });
      }
    }
  }
  return games;
}

async function getLeaderboardTimes(leaderboardQuery) {
  let requestPromises = [];

  // Loop through games
  for (const leaderboardArg of leaderboardQuery) {
    if (
      !("gameName" in leaderboardArg) &&
      !("categories" in leaderboardArg) &&
      !(leaderboardArg.gameName in gameIds)
    ) {
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
        subcategoryNames = category.subcategories.map((o) => o.name);
        subcategoryDifficulties = category.subcategories.map(
          (o) => o.difficulty,
        );
      } else if (
        "subcategories" in gameIds[gameName].categories[categoryName]
      ) {
        // Otherwise, get the subcategories we have stored
        subcategoryNames = Object.keys(
          gameIds[gameName].categories[categoryName].subcategories,
        );
        subcategoryDifficulties = subcategoryNames.map(
          (_) => category.difficulty,
        );
      } // otherwise, there are no subcategories

      // TODO could be cleaned up, made a mess again
      var subcategoriesObjects = subcategoryNames.map(function (a, i) {
        return [a, subcategoryDifficulties[i]];
      });

      if (subcategoriesObjects.length > 0) {
        for (const subcategoryObject of subcategoriesObjects) {
          // should check to see if a valid subcategory
          let subcategory =
            gameIds[gameName].categories[categoryName].subcategories[
              subcategoryObject[0]
            ];
          requestPromises.push(
            new Promise(async (resolve, reject) => {
              const resp = await fetch(
                `https://www.speedrun.com/api/v1/leaderboards/${gameId}/category/${categoryId}?var-${subcategory.id}=${subcategory.val}&embed=players`,
                { method: "GET" },
              );
              numRequestsSuccess.value++;
              if (!resp.ok) {
                numRequestsError.value++;
                resolve(undefined);
                return;
              }
              const data = await resp.json();
              resolve(parseRunnerTimeFromResponse(subcategoryObject[1], data));
            }),
          );
          numRequestsTotal.value++;
        }
      } else {
        requestPromises.push(
          new Promise(async (resolve, reject) => {
            const resp = await fetch(
              `https://www.speedrun.com/api/v1/leaderboards/${gameId}/category/${categoryId}?embed=players`,
              { method: "GET" },
            );
            numRequestsSuccess.value++;
            if (!resp.ok) {
              numRequestsError.value++;
              resolve(undefined);
              return;
            }
            const data = await resp.json();
            resolve(parseRunnerTimeFromResponse(category.difficulty, data));
          }),
        );
        numRequestsTotal.value++;
      }
    }
  }
  const results = await Promise.all(requestPromises);
  const runnerTimes = [];
  for (const result of results) {
    if (result !== undefined) {
      runnerTimes.push(result);
    }
  }
  return cleanupRunnerTimeScores(runnerTimes);
}

function zScoreFormatting(zScore) {
  if (zScore === Number.POSITIVE_INFINITY) {
    return "&infin;";
  } else if (zScore === Number.NEGATIVE_INFINITY) {
    return "-&infin;";
  } else {
    return zScore.toFixed(3);
  }
}

onMounted(async () => {
  numRequestsTotal.value = 0;
  numRequestsSuccess.value = 0;
  numRequestsError.value = 0;
  loading.value = true;
  leaderboardQueryItems.value = getLeaderboard();
  leaderboardScores.value = await getLeaderboardTimes(leaderboardQueryItems.value);
  loading.value = false;
});
</script>

<!-- TODO - make merged rows look nicer eventually -->

<template>
  <table class="styled-table">
    <thead>
      <tr>
        <th>Rank</th>
        <th>Player</th>
        <th v-if="singleCategory">Time</th>
        <th v-if="singleCategory">TFA</th>
        <th v-if="singleCategory">&sigma;&nbsp;Away</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="loading">
        <td colspan="singleCategory ? 6 : 3">Loading...<br/>{{ numRequestsSuccess }} / {{ numRequestsTotal }} Succeeded<template v-if="numRequestsError > 0"><br/>{{ numRequestsError }} Failed</template></td>
      </tr>
      <tr v-if="!loading && leaderboardScores.length === 0">
        No Runs Found
      </tr>
      <tr v-else v-for="(score, index) in leaderboardScores" :class="score.points === null ? 'no-background' : null">
        <td v-if="score.points !== null" :rowspan="score.span > 1 ? score.span : null">{{ index + 1 }}</td>
        <td>{{ score.name }}</td>
        <td v-if="singleCategory">{{ secondsToHumanFormat(score.time) }}</td>
        <td v-if="singleCategory">{{ secondsToHumanFormat(score.timeFromAverage) }}</td>
        <td v-if="singleCategory">
          {{ zScoreFormatting(score.zScore) }}
        </td>
        <td :rowspan="score.span > 1 ? score.span : null" v-if="score.points !== null">{{ score.points }}</td>
      </tr>
    </tbody>
  </table>
</template>
