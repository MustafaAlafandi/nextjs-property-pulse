import { infoBoxProps } from "@/types/basicTypes";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  const infoBoxesData: infoBoxProps[] = [
    {
      heading: "For Renters",
      backgroundColor: "bg-gray-100",
      buttonInfo: {
        text: "Browse Properties",
        link: "/properties",
        backgroundColor: "bg-black",
      },
      children:
        "Find your dream rental property. Bookmark properties and contactowners.",
    },
    {
      heading: "For Property Owners",
      backgroundColor: "bg-blue-100",
      buttonInfo: {
        text: "Add Property",
        link: "/properties/add",
        backgroundColor: "bg-blue-500",
      },
      children:
        "List your properties and reach potential tenants. Rent as an Airbnb or long temr.",
    },
  ];
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          {infoBoxesData.map((box, index) => (
            <InfoBox
              key={index}
              heading={box.heading}
              {...(box.backgroundColor && {
                backgroundColor: box.backgroundColor,
              })}
              {...(box.textColor && { textColor: box.textColor })}
              buttonInfo={box.buttonInfo}
            >
              {box.children}
            </InfoBox>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
