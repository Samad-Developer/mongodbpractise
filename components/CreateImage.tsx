// components/ImageUploadForm.tsx

"use client";

import { useState } from "react";
import { postImage } from "./actions";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";


export default function ImageUploadForm() {
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageInformation, setImageInformation]  = useState<string>('')
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setImage(file);
  //   }
  // };

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
    <main className="flex  flex-col items-center justify-between p-24">

      { 
        !image ? (
          <><h1>{imageInformation}</h1>
<UploadDropzone
className=" ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300 ut-uploading:bg-green-400"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res[0].url);
        setImage(res[0].url)

      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
        setImageInformation(`ERROR! ${error.message}`)
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
        setImageInformation(`Uploading: ${name}`)
      }}
      onDrop={(acceptedFiles) => {
        // Do something with the accepted files
        console.log("Accepted files: ", acceptedFiles);
        setImageInformation(`Accepted files:  ${acceptedFiles}`)
      }}
    /></>
        ) : <div className="max-w-20 max-h-20">
          
          <img onClick={() => setImage('')}
                src={image}
                alt={image}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />

        </div>
      }  
    

</main>
  );
}
