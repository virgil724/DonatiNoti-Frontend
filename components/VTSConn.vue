<template>
  <div class="flex flex-col h-screen justify-center content-center gap-3">
    <h1 class="text-center">VTS 連線</h1>
    ArtMesh :{{ ArtMeshList }}
    <va-button @click="SendArtMeshReq" :disabled="!session"
      >選擇ArtMesh</va-button
    >
    <va-button @click="SendPermissionReq" :disabled="!session"
      >LoadImgPerm</va-button
    >

    <va-checkbox
      label="授權結果"
      :readonly="true"
      v-bind:model-value="authStatus"
    />

    <va-button
      @click="SendAuthReq"
      :disabled="authStatus"
      :color="authStatus ? 'success' : 'primary'"
      >授權</va-button
    >
  </div>
</template>
<script setup>
const token = useLocalStorage("authToken", "");
const ModelId = useLocalStorage("modelId", "");
const ArtMeshList = useLocalStorage("ArtMeshList", []);
const session = ref(false);
const authStatus = computed(() => {
  return token.value !== "";
});
const { base64str } = await useUrlImgBase64("/imresizer.png");

const msg = computed(() => {
  const config = useRuntimeConfig();
  return {
    apiName: "VTubeStudioPublicAPI",
    apiVersion: "1.0",
    requestID: Date.now(),
    messageType: "AuthenticationTokenRequest",
    data: {
      pluginName: config.public.vtsapiOpt.pluginName,
      pluginDeveloper: config.public.vtsapiOpt.pluginDeveloper,
      pluginIcon: base64str.value,
    },
  };
});

const { status, data, send, open, close } = useWebSocket(
  "ws://localhost:8001",
  {
    autoReconnect: true,
    onMessage(ws, event) {
      const data = JSON.parse(event.data);

      if (data.messageType === "AuthenticationTokenResponse") {
        token.value = data.data?.authenticationToken ?? token.value;
        isTokenVaild();
      }
      if (data.messageType === "AuthenticationResponse") {
        if (data.data.authenticated == false) {
          token.value = "";
        } else {
          session.value = true;
          send(
            JSON.stringify({
              apiName: "VTubeStudioPublicAPI",
              apiVersion: "1.0",
              requestID: Date.now(),
              messageType: "CurrentModelRequest",
            })
          );
        }
      }
      if (data.messageType === "CurrentModelResponse") {
        ModelId.value = data.data.modelID;
      }
      if (data.messageType === "ArtMeshSelectionResponse") {
        ArtMeshList.value = data.data.activeArtMeshes;
      }
    },
  }
);
const isTokenVaild = () => {
  var reuse_msg = msg.value;
  reuse_msg.messageType = "AuthenticationRequest";
  reuse_msg.data.pluginIcon = null;
  reuse_msg.data.authenticationToken = token.value;
  send(JSON.stringify(reuse_msg));
};

if (authStatus.value == true) {
  // Check tokenStatus
  isTokenVaild();
}

const SendAuthReq = () => {
  send(JSON.stringify(msg.value));
};
const SendArtMeshReq = () => {
  var msg = {
    apiName: "VTubeStudioPublicAPI",
    apiVersion: "1.0",
    requestID: Date.now(),
    messageType: "ArtMeshSelectionRequest",
    data: {
      textOverride: "選一下你的SuperChat要貼在哪裡",
      requestedArtMeshCount: 5,
      activeArtMeshes: ArtMeshList.value,
    },
  };

  send(JSON.stringify(msg));
};
const SendPermissionReq = () => {
  var msg = {
    apiName: "VTubeStudioPublicAPI",
    apiVersion: "1.0",
    requestID: Date.now(),
    messageType: "PermissionRequest",
    data: {
      requestedPermission: "LoadCustomImagesAsItems",
    },
  };
  send(JSON.stringify(msg));
};
defineExpose({ ArtMeshList, ModelId, token });
</script>
