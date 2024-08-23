// components/ImageUploadForm.tsx

"use client";

import { useState } from "react";
import { postImage } from "./actions";


export default function ImageUploadForm() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!image) {
//       setError("Please select an image.");
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const formData = new FormData();
//       formData.append("image", image);

//       const response = await fetch("/api/products/image", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upload image");
//       }

//       const result = await response.json();
//       setSuccess(`Image uploaded successfully with ID: ${result.id}`);
//     } catch (err) {
//       setError(`Error: ${(err as Error).message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <div>
      <h1>Upload an Image</h1>
      <form action={postImage}>
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
