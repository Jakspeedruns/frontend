<script setup>
import { ref, toRefs, onMounted } from "vue";
import { highscoresConfig } from "./highscores_config";

const props = defineProps({
  gameId: {
    type: String,
    required: false,
    default: "",
  },
});
const { gameId } = toRefs(props);

// state
const loading = ref(false);
const highscoresToRender = ref([]);

onMounted(async () => {
  loading.value = true;
  let highscores = highscoresConfig[gameId.value];
  for (let highscore of highscores) {
    highscore.data = await fetch(`https://api.jakspeedruns.workers.dev/v1/highscores/${highscore.id}`).then((res) => res.json());
  }
  highscoresToRender.value = highscores;
  loading.value = false;
});
</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else v-for="highscore in highscoresToRender">
    <h2>{{ highscore.name }}</h2>
    <table class="styled-table" >
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Score</th>
          <th>Video</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!loading && highscore.data.length === 0">
          No Scores Found
        </tr>
        <tr v-else v-for="(score, index) in highscore.data" :class="score.points === null ? 'no-background' : null">
          <td>{{ index + 1 }}</td>
          <td>{{ score.playerName }}</td>
          <td>{{ score.score }}</td>
          <td v-if="score.videoLink !== null"><a :href="score.videoLink" target="_blank" rel="noopener">{{ score.videoLink }}</a></td>
          <td v-else>N/A</td>
          <td v-if="score.timestamp !== null">{{ score.timestamp }}</td><td v-else>N/A</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
