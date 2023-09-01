<template>
  <va-input v-model="storage"></va-input>
  <va-button @click="speech('小八', 100, '幹你娘', choice)">Test</va-button>
  <va-option-list
    v-model="choice"
    type="radio"
    :options="voices"
    :text-by="(option) => option.voiceURI"
  />
  <va-select v-model="value" :options="list"/>
  {{ choice }}
  {{ value }}
</template>
<script setup>
const value = ref();
const list=ref(['one','two'])
const storage = useLocalStorage("A");
const voices = ref([]);
const choice = ref("-1");
const speech = (who, amount, msg, voice) => {
  console.log(voice);
  let utterance = new SpeechSynthesisUtterance(
    `${who} 丟了 ${amount} 說: ${msg}`
  );

  if (voice != -1) {
    utterance.voice = voice;
  }
  speechSynthesis.speak(utterance);
};
const onOptionChange = (e) => {
  console.log(e);
};
onMounted(() => {
  speechSynthesis.addEventListener("voiceschanged", (event) => {
    voices.value = speechSynthesis.getVoices();
  });
});
</script>
