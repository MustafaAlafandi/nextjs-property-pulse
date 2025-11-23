import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
function PropertyImages({ images }: { images: string[] }) {
  const imagesUrl = images;
  // const imagesUrl = images.map((ele)=>ele.includes("https")
  //   ? ele
  //   : `/images/properties/${ele}`)
  return (
    <Gallery>
      <section className="bg-blue p-4">
        <div className="container mx-auto">
          {imagesUrl.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={imagesUrl[0]}
                  alt=""
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {imagesUrl.map((img, ind) => (
                <div
                  key={ind}
                  className={`${
                    imagesUrl.length === 3 && ind === 2
                      ? "col-span-2"
                      : "col-span-1"
                  }`}
                >
                  <Item
                    original={img}
                    thumbnail={img}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={img}
                        alt=""
                        className="object-cover h-[400px] mx-auto rounded-xl"
                        width={1800}
                        height={400}
                        priority={true}
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
}

export default PropertyImages;
