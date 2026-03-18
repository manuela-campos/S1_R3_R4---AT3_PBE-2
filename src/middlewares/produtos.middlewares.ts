import createMulter from "../config/produtos.config";

const uploadImage = createMulter({
  // definir o nome da pasta
  folder: "Images",
  // definir os tipos
  allowedTypes: ["image/png", "image/jpeg"],
  fileSize: 10 * 1024 * 1024, // 10MB
  //single: uma imagem de cada vez
}).array("image");

export default uploadImage;