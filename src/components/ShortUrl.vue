<script setup>
import { ref } from "vue";
import getShortened from "../api/shorten";
import getstats from "../api/stats";
import { API_URL } from "../env";
import "../ShortUrlstyle.css";

const url = ref("");
const shortUrl = ref("");
const showUrl = ref(false);
const stats = ref("");
const showstat = ref(false);
const shorten = ref(true);

const getshorturl = async () => {
  const shortenedUrl = await getShortened(url.value);
  shortUrl.value = API_URL + "/" + shortenedUrl.short_url;
  showUrl.value = true;
  showstat.value = false;
};
const showstats = async () => {
  stats.value = await getstats();
  showstat.value = true;
  shorten.value = false;
};
const back = async () => {
  stats.value = await getstats();
  showstat.value = false;
  shorten.value = true;
};
</script>

<template>
  <div class="flex justify-center mt-[100px]">
    <div v-if="shorten">
      <div>
        <input
          v-model="url"
          type="text"
          class="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white w-[700px]"
          placeholder="http://example.com"
        />
        <button
          @click="getshorturl"
          class="px-8 rounded-r-lg bg-blue-500 text-white font-bold p-4 uppercase border-blue-500 border-t border-b border-r"
        >
          get Short URL
        </button>
      </div>
      <div>
        <a
          v-if="showUrl"
          :href="shortUrl"
          target="_blank"
          class="mt-7 block text-center bg-blue-300 p-2 rounded-lg hover:bg-blue-400 transition duration-300"
        >
          {{ shortUrl }}</a
        >
      </div>
      <button
        @click="showstats"
        class="ml-80 mt-28 px-8 rounded-md bg-lime-700 text-white font-bold p-4 uppercase border-lime-700 border"
      >
        show stats
      </button>
    </div>

    <div v-if="showstat" class="w-3/4">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">long url</th>
              <th scope="col" class="px-6 py-3">short url</th>
              <th scope="col" class="px-6 py-3 text-center">click count</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(stat, index) in stats.urls"
              :key="index"
              class="bg-white border-b text-center"
            >
              <td class="px-6 py-4 text-left break-words max-w-md">
                {{ stat.long_url }}
              </td>
              <td>{{ API_URL + "/" + stat.short_url }}</td>
              <td>{{ stat.click_count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        @click="back"
        class="mt-10 mb-5 px-8 rounded-md bg-lime-700 text-white font-bold p-4 uppercase border-lime-700 border"
      >
        Back
      </button>
    </div>
  </div>
</template>
