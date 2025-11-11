import Image from "next/image";

function PropertyImages({ images }: { images: string[] }) {
  const imagesUrl = images;
  // const imagesUrl = images.map((ele)=>ele.includes("https")
  //   ? ele
  //   : `/images/properties/${ele}`)
  return (
    <section className="bg-blue p-4">
      <div className="container mx-auto">
        {imagesUrl.length === 1 ? (
          <Image
            src={imagesUrl[0]}
            alt=""
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {imagesUrl.map((img, ind) => (
              <div
                key={ind}
                className={`${
                  imagesUrl.length === 3 && ind === 2 ? "col-span-2" : "col-span-1"
                }`}
              >
                <Image
                  src={img}
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PropertyImages;
