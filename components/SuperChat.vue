<template>
  <slot></slot>

  <Transition
    enter-from-class="translate-x-[150%] opacity-0"
    enter-active-class="transition duration-300"
    leave-to-class="-translate-x-[150%] opacity-0"
    leave-active-class="transition duration-300"
    appear
  >
    <div class="flex flex-col w-full" v-if="props.donate.isShow">
      <div>
        <div
          class="flex flex-row rounded-t-lg"
          :style="{ background: colorTuple.topColor }"
        >
          <div>
            <va-avatar class="m-4" :src="props.img"></va-avatar>
          </div>
          <div class="grow mt-3" :style="{ color: colorTuple.textColor }">
            <p>{{ props.donate.name }}</p>
            <p>NT {{ props.donate.amount }}</p>
          </div>
        </div>
      </div>
      <div class="rounded-b-lg" :style="{ background: colorTuple.btmColor }">
        <p class="mx-5 m-2" :style="{ color: colorTuple.textColor }">
          {{ props.donate.msg }}
        </p>
      </div>
    </div>
  </Transition>
</template>
<script setup>
const emit = defineEmits(["stop-show"]);
const props = defineProps({
  img: String,
  donate: Object,
});
const colorTuple = ref({
  topColor: "#1565C0",
  btmColor: "#1565C0",
  textColor: "#FFFFFF",
});

const getSuperChatColors = (amount) => {
  if (typeof amount === "string") {
    amount = parseFloat(amount.replace(/[^\d.-]/g, ""));
  }

  if (amount >= 1 && amount <= 29) {
    return ["#1565C0", "#1565C0", "#FFFFFF"];
  } else if (amount >= 30 && amount <= 74) {
    return ["#00E5FF", "#00B8D4", "#000000"];
  } else if (amount >= 75 && amount <= 150) {
    return ["#0F9D58", "#0A8043", "#000000"];
  } else if (amount >= 150 && amount <= 299) {
    return ["#FFCA28", "#FFB300", "#000000"];
  } else if (amount >= 300 && amount <= 749) {
    return ["#F57C00", "#E65100", "#FFFFFF"];
  } else if (amount >= 750 && amount <= 1499) {
    return ["#E91E63", "#C2185B", "#FFFFFF"];
  } else if (amount >= 1500 && amount <= 2999) {
    return ["#E62117", "#D00000", "#FFFFFF"];
  } else if (amount >= 3000 && amount <= 5999) {
    return ["#E62117", "#D00000", "#FFFFFF"];
  } else if (amount >= 6000 && amount <= 11999) {
    return ["#E62117", "#D00000", "#FFFFFF"];
  } else if (amount >= 12000 && amount <= 23999) {
    return ["#E62117", "#D00000", "#FFFFFF"];
  } else if (amount >= 24000) {
    return ["#E62117", "#D00000", "#FFFFFF"];
  } else {
    console.error("Invalid amount for super chat", amount);
    return ["#1565C0", "#1565C0", "#FFFFFF"];
  }
};
watch(
  () => props.donate.amount,
  () => {
    const [topColor, btmColor, textColor] = getSuperChatColors(
      props.donate.amount
    );

    colorTuple.value = {
      topColor: topColor,
      btmColor: btmColor,
      textColor: textColor,
    };
  }
);

onMounted(() => {
  setTimeout(() => {
    emit("stop-show");
  }, 100000);
});
</script>
