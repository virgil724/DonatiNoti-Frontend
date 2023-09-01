<template>
  <div
    class="flex flex-col gap-3 w-screen h-screen justify-center content-center"
  >
    <div class="flex flex-row gap-5">
      <div class="flex flex-col gap-3 max-w-xs grid-cols-1">
        <va-input
          :placeholder="getRamdomMD5.Digest.toUpperCase()"
          label="歐付寶ID"
          v-model="data.opay"
        ></va-input>
        <va-input
          :placeholder="getRamdomMD4.Digest.toUpperCase()"
          label="綠界ID"
          v-model="data.ecpay"
        ></va-input>
        <va-input
          placeholder="https://imgur.com/abc.img"
          label="Donate頭像"
          v-model="data.img"
        ></va-input>
        <va-input
          placeholder="https://server"
          label="後台URL"
          v-model="data.server"
        ></va-input>
        <va-input readonly :modelValue="copyUrl" label="OBS URL">
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
      <div class="max-w-xs">
        <div stateful class="flex flex-col gap-3">
          <va-input label="暱稱" v-model="exampleData2.name" />
          <va-input label="金額" v-model="exampleData2.amount" />
          <va-input label="訊息" v-model="exampleData2.msg" />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-1">
          <va-switch
            v-model="voicelock"
            true-inner-label="開啟 TTS"
            false-inner-label="關閉 TTS"
          />
          <div class="max-w-xs" v-if="voicelock">
            <va-select v-model="choice" :options="options" />
          </div>
        </div>
        <va-button
          v-if="voicelock"
          @click="
            speechfunc(
              exampleData2.name,
              exampleData2.amount,
              exampleData2.msg,
              voiceInd
            )
          "
          >聲音測試</va-button
        >
      </div>
    </div>

    <SuperChat :donate="exampleData" :img="data.img" />
    <div class="w-screen" style="height: 120px">
      <SuperChat :donate="exampleData2" :img="data.img" />
    </div>
  </div>
</template>
<script setup>
const speechfunc = speech;

const options = ref([]);
const choice = ref();
const voicelock = ref(false);
const voiceInd = computed(() => options.value.indexOf(choice.value));
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const exampleData2 = reactive({
  donateid: 1563453,
  msg: "測試訊息",
  name: "冤大頭",
  amount: 50,
  from: "ecpay/opay",
  isShow: "true",
});
const exampleData = reactive({
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
  url.searchParams.set("voice", voicelock.value);
  voicelock.value && url.searchParams.set("voiceId", voiceInd.value);

  return url.toString();
});
const { text, copy, copied, isSupported } = useClipboard({ copyUrl });


watch([() => exampleData2.name, () => exampleData2.msg], ([name, msg]) => {
  exampleData.msg = msg;
  exampleData.name = name;
});
onMounted(() => {
  setInterval(() => {
    exampleData.amount = getRandomInt(3000);
    exampleData2.isShow = !exampleData2.isShow;
  }, 1000);
  speechSynthesis.addEventListener("voiceschanged", (event) => {
    options.value = speechSynthesis.getVoices().map((v) => v.voiceURI);
  });
});
</script>
