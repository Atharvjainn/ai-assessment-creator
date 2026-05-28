
export const uploadToCloudinary = async (
  file: File
) => {
  const formData = new FormData();
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  formData.append("file", file);
  const resourceType = 
      file.type === "application/pdf"
              ? "raw"
              : "image";

  formData.append(
    "upload_preset",

    `${UPLOAD_PRESET}`
  );

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",

      body: formData,
    }
  );

  const data = await response.json();

  return {
    url: data.secure_url,

    publicId: data.public_id,

    resourceType: data.resource_type,
  };
};