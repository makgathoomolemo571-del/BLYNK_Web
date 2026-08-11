import { useState } from "react";
import api from "../../config/api";

export default function useUpload() {

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const upload = async (url, file) => {

    setUploading(true);
    setError(null);
    setProgress(0);

    try {

      const formData = new FormData();

      formData.append("file", file);

      const response = await api.post(

        url,

        formData,

        {

          headers: {

            "Content-Type": "multipart/form-data"

          },

          onUploadProgress: (event) => {

            const percent = Math.round(

              (event.loaded * 100) / event.total

            );

            setProgress(percent);

          }

        }

      );

      setUploading(false);

      return response.data;

    } catch (err) {

      setUploading(false);

      setError(err);

      throw err;

    }

  };

  return {

    upload,

    progress,

    uploading,

    error

  };

}