<template>
  <div class="flex flex-row gap-1">
    <div class="basis-1/5">
      <ClientOnly>
        <VTSConn />
      </ClientOnly>
    </div>

    <div class="basis-3/5">
      <div class="flex flex-col gap-3 h-screen justify-center content-center">
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

          <div class="flex flex-col gap-2">
            <va-switch
              v-model="voicelock"
              true-inner-label="開啟 TTS"
              false-inner-label="關閉 TTS"
            />
            <div class="max-w-xs" v-if="voicelock">
              <va-select v-model="choice" :options="options" />
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
            <va-switch
              v-model="vtslock"
              :disabled="token === '' || ModelId === '' || ArtMeshList == []"
              true-inner-label="開啟 VTS連結"
              false-inner-label="關閉 VTS連結"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="basis-1/4">
      <div class="flex flex-col gap-3 h-screen justify-center content-center">
        <div class="max-w-xs">
          <va-input label="暱稱" v-model="exampleData2.name" />
          <va-input label="金額" v-model="exampleData2.amount" />
          <va-input label="訊息" v-model="exampleData2.msg" />
        </div>
        <SuperChat :donate="exampleData" :img="data.img" />
        <div class="w-auto" style="height: 120px">
          <SuperChat :donate="exampleData2" :img="data.img" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const speechfunc = speech;
const token = useLocalStorage("authToken", "");
const ModelId = useLocalStorage("modelId", "");
const ArtMeshList = useLocalStorage("ArtMeshList", []);

const options = ref([]);
const choice = ref();
const voicelock = ref(false);
const vtslock = ref(false);
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

const data = reactive( {
  opay: "",
  ecpay: "",
  server: "https://donate.virgil246.eu.org",
});
const copyUrl = computed(() => {
  const url = useRequestURL();
  console.log(data.server)
  url.pathname = "obs";
  data.opay && url.searchParams.set("opay", data.opay);
  data.ecpay && url.searchParams.set("ecpay", data.ecpay);
  data.img && url.searchParams.set("img", data.img);
  data.server && url.searchParams.set("server", data.server);
  url.searchParams.set("voice", voicelock.value);
  voicelock.value && url.searchParams.set("voiceId", voiceInd.value);
  url.searchParams.set("vts", vtslock.value);
  vtslock.value && url.searchParams.set("modelId", ModelId.value);
  vtslock.value && url.searchParams.set("artMesh", ArtMeshList.value);
  vtslock.value && url.searchParams.set("token", token.value);
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
