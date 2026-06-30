interface Preview {
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

const {BASE_URL} = import.meta.env;

export const getImageSource = (preview: Preview) => {
  const {previewImg, previewImg2x, previewImgWebp, previewImgWebp2x} = preview;
  return {
    previewImg: `${BASE_URL}${previewImg}`,
    previewImg2x: `${BASE_URL}${previewImg2x}`,
    previewImgWebp: `${BASE_URL}${previewImgWebp}`,
    previewImgWebp2x: `${BASE_URL}${previewImgWebp2x}`,
  };
};
