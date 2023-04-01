"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface Props {
  onChange: (v: string) => void;
  value: string;
}

const ImageUpload: React.FC<Props> = ({ onChange, value }) => {
  const handleUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="ajxqtaal"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">
              Click para subir una imagen
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={value}
                  alt="House"
                  fill
                  className="object-cover"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
