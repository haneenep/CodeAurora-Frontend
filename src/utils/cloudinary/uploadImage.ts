import axios from "axios";

export const UploadImage = async (file: File) => {

    const presetKey = import.meta.env.VITE_REACT_APP_PRESET_KEY;
    const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;
  
    console.log(file, "file");
  
    if (!presetKey || !cloudName) {
      console.error('Cloudinary preset key or cloud name is missing');
      return null;
    }
  
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', presetKey);
  
    try {

      const result = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData);
      const { secure_url } = result.data;
  
      console.log(secure_url, "secure url");
      console.log(result.data, "response data");
  
      return secure_url;

    } catch (error) {

      console.error('Error uploading image:', error);
      return null;

    }
  };
  