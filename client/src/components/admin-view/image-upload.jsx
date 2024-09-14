import React, { useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setUploadedImageUrl(URL.createObjectURL(file));
  };
 
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
      </div>
    </div>
  );
};

export default ProductImageUpload;
