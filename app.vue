<template>
  <!-- <div class="m-4 bg-white"> -->
  <!-- <p class="pb-4 text-2xl text-slate-600">這裡是最外層 app.vue</p> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- </div> -->
</template>

<script setup>
useSeoMeta({
  title: "超級感謝小工具",
  description: "將歐富寶，綠界的抖內通知轉為OBS上可用的Superchat樣式",
  ogTitle: "超級感謝小工具",
  ogDescription: "將歐富寶，綠界的抖內通知轉為OBS上可用的Superchat樣式",
  ogImage: `${useRequestURL().toString()}/favicon.ico`,
  ogUrl: useRequestURL().toString(),
  twitterTitle: "超級感謝小工具",
  twitterDescription: "將歐富寶，綠界的抖內通知轉為OBS上可用的Superchat樣式",
  twitterImage: `${useRequestURL().toString()}/favicon.ico`,
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "zh-tw",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.ico",
    },
  ],
});
</script>
