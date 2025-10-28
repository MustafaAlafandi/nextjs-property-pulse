import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperites from "@/components/HomeProperites";
import connectDB from "@/config/database";
async function HomePage() {
  await connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperites />
    </>
  );
}

export default HomePage;
