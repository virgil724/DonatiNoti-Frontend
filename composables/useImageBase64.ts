export const useUrlImgBase64 = async (url) => {
    const resp = await useFetch(url);
    const { base64: imageBase64 } = useBase64(resp.data);

    const base64str = computed(() => imageBase64.value.split(',')[1]);

    return { base64str }
}
