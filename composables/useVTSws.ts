export const useVTSws = (url) => {
    const { status, data, send, open, close } = useWebSocket(url, {
        onConnected() {
            authsession()
        },
        onMessage(ws, event) {
            const data = JSON.parse(event.data)
            if (data.messageType === "ItemLoadResponse") {
                pingToRamdomArtMesh(data.data.instanceID);
            }

        },
        autoReconnect: true
    })
    //authsession
    const GenMsg = (messageType = '', data = {}) => {
        return {
            apiName: "VTubeStudioPublicAPI",
            apiVersion: "1.0",
            requestID: Date.now(),
            messageType: messageType,
            data: data

        }
    }
    const authsession = () => {
        const config = useRuntimeConfig()
        const { token, } = useUrlSearchParams()
        const data = {
            pluginDeveloper: config.public.vtsapiOpt.pluginDeveloper,
            pluginName: config.public.vtsapiOpt.pluginName,
            authenticationToken: token
        }
        var msg = GenMsg("AuthenticationRequest", data)
        send(JSON.stringify(msg))
    }

    const loadImage = (base64Img) => {
        var base64Img = base64Img.split(',')[1]
        var data = {

            fileName: `${Date.now()}.jpg`,
            customDataBase64: base64Img,
            unloadWhenPluginDisconnects: true,
            customDataAskUserFirst: false,


        }
        var msg = GenMsg("ItemLoadRequest", data)
        send(JSON.stringify(msg))
    }
    const pingToRamdomArtMesh = (instanceID) => {
        const { modelId, artMesh } = useUrlSearchParams()

        var artMeshList = artMesh.split(',')
        var data = {
            pin: true,
            vertexPinType: "Center",
            angleRelativeTo: "RelativeToWorld",
            sizeRelativeTo: "RelativeToWorld",
            itemInstanceID: instanceID,
            pinInfo: {
                artMeshID: _sample(artMeshList),
                angle: 0,
                size: .25,

                modelID: modelId,
            },

        }
        var msg = GenMsg("ItemPinRequest", data)
        send(JSON.stringify(msg))
    }
    const AniReq = (instanceId) => {
        var data = {
            itemInstanceID: "ItemInstanceId",
            framerate: 12,
            frame: 3,
            setAutoStopFrames: true,
            setAnimationPlayState: true,
            animationPlayState: true
        }
    
        var msg= GenMsg("ItemAnimationControlRequest",data)
    }
    return { loadImage }
}