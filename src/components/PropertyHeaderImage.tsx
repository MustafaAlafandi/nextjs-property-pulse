"use client";
import Image from "next/image";
import { propertyHeaderImageProps } from "@/types/basicTypes";
function PropertyHeaderImage({ image }: propertyHeaderImageProps) {
  console.log("image", image);
  const imageUrl = image; 
  // const imageUrl = image.includes("https")
  //   ? image
  //   : `/images/properties/${image}`;
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={imageUrl}
            alt=""
            className="object-cover h-[400px] w-full"
            width={1800}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}

export default PropertyHeaderImage;
