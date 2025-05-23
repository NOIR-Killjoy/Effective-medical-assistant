const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();
  
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    const data = await res.json();
    return data; // Contains image URL
  } catch (err) {
    console.error("Error uploading image:", err);
    return null; // Handle error properly in UI
  }
};

export default uploadImageToCloudinary;
