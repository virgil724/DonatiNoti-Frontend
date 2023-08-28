<template>
  <div class="grid gap-2 justify-center scroll-smooth" ref="obs">
    <SuperChat
      v-for="donate in donateData.value"
      @stop-show="toggleShow(donate)"
      @speech="speechWithVoiceInd(donate.name, donate.amount, donate.msg)"
      :donate="donate"
      :img="img"
      :key="donate.donateid + donate.from"
    >
      <!-- <va-button @click="donate.isShow = !donate.isShow">Test</va-button> -->
    </SuperChat>
  </div>
  <!-- {{ donateData }} -->
</template>
<script setup>
const obs = ref(null);

const donateData = reactive({ value: [] });


const donataComp = (donateA, donateB) => {
  return donateA.donateid === donateB.donateid && donateA.from === donateB.from;
};
const { opay, ecpay, img, server ,voiceId} = useUrlSearchParams();

const gendoanteData = async () => {
  const { data, pending, error, refresh } = await useFetch(server, {
    method: "POST",
    body: { opay, ecpay },
    server: false,
  });
  _remove(donateData.value, (v) => v.isShow === false);
  donateData.value = _unionWith(
    data.value.opay.map((v) => ({
      ...v,
      time: Date.now(),
      from: "opay",
      isShow: true,
    })),
    donateData.value,
    donataComp
  );
  donateData.value = _unionWith(
    data.value.ecpay.map((v) => ({
      ...v,
      time: Date.now(),
      from: "ecpay",
      isShow: true,
    })),
    donateData.value,
    donataComp
  );
  // donateData.opay = _unionBy(
  //   data.value.opay.map((v) => ({
  //     ...v,
  //     time: Date.now(),
  //     from: "opay",
  //     isShow: false,
  //   })),
  //   donateData.opay,
  //   "donateid"
  // );
  // donateData.ecpay = _unionBy(
  //   data.value.ecpay.map((v) => ({
  //     ...v,
  //     time: Date.now(),
  //     from: "ecpay",
  //     isShow: false,
  //   })),
  //   donateData.ecpay,
  //   "donateid"
  // );
};
const { width, height } = useWindowSize();
const toggleShow = (donate) => {
  donate.isShow = false;
};
const toggleDonates = () => {
  donates.forEach((donate, index) => {
    setTimeout(() => {
      donate.isShow = true;
      setTimeout(() => {
        donate.isShow = false;
      }, 4700);
    }, index * 5000);
  });
};
const speechWithVoiceInd = (who,amount,msg) => {
  return speech(who,amount,msg,voiceId)
  
};
onMounted(() => {
  // toggleDonates();
  // setInterval(toggleDonates, donates.length * 5000);
  setInterval(gendoanteData, 5000);
});
</script>
