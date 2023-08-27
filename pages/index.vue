<template>
  <div
    class="flex flex-col gap-3 w-screen h-screen justify-center content-center"
  >
    <div class="max-w-xs grid-cols-1">
      <va-input
        class="m-2"
        :placeholder="getRamdomMD5.Digest.toUpperCase()"
        label="歐付寶ID"
        v-model="data.opay"
      ></va-input>
      <va-input
        class="m-2"
        :placeholder="getRamdomMD4.Digest.toUpperCase()"
        label="綠界ID"
        v-model="data.ecpay"
      ></va-input>
      <va-input
        class="m-2"
        placeholder="https://imgur.com/abc.img"
        label="Donate頭像"
        v-model="data.img"
      ></va-input>
      <va-input
        class="m-2"
        placeholder="https://server"
        label="後台URL"
        v-model="data.server"
      ></va-input>
      <va-input class="m-2" readonly :modelValue="copyUrl" label="OBS URL">
        <template #prependInner>
          <va-button
            icon="content_copy"
            preset="secondary"
            @click="copy(copyUrl)"
          ></va-button>
        </template>
      </va-input>
      <span v-if="!copied"></span>
      <span v-else class="italic">已複製</span>
    </div>
    <SuperChat :donate="exampleData" :img="data.img" />
    <div class="w-screen" style="height: 120px">
      <SuperChat :donate="exampleData2" :img="data.img" />
    </div>
  </div>
</template>
<script setup>
import { useClipboard } from "@vueuse/core";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const exampleData = ref({
  donateid: 1563453,
  msg: "測試訊息",
  name: "冤大頭",
  amount: 50,
  from: "ecpay/opay",
  isShow: "true",
});
const exampleData2 = ref({
  donateid: 1563453,
  msg: "測試訊息",
  name: "冤大頭",
  amount: 50,
  from: "ecpay/opay",
  isShow: "true",
});

const getRamdomMD5 = await $fetch(
  `https://api.hashify.net/hash/md4/hex?value=${(Math.random() + 1)
    .toString(36)
    .substring(7)}`
);

const getRamdomMD4 = await $fetch(
  `https://api.hashify.net/hash/md4/hex?value=${(Math.random() + 1)
    .toString(36)
    .substring(7)}`
);
const data = reactive({
  opay: "",
  ecpay: "",
  server: "https://donate.virgil246.eu.org",
});
const copyUrl = computed(() => {
  const url = useRequestURL();

  url.pathname = "obs";
  data.opay && url.searchParams.set("opay", data.opay);
  data.ecpay && url.searchParams.set("ecpay", data.ecpay);
  data.img && url.searchParams.set("img", data.img);
  data.server && url.searchParams.set("server", data.server);

  return url.toString();
});
const { text, copy, copied, isSupported } = useClipboard({ copyUrl });
onMounted(() => {
  setInterval(() => {
    exampleData.value.amount = getRandomInt(3000);
    exampleData2.value.isShow = !exampleData2.value.isShow;
  }, 1000);
});
</script>
