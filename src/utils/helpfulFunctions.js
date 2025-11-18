import { stateMap } from "@/constents/componentsConstents";
export async function getGeoLocation({ street, city, state }) {

  const address = `${street}, ${city}, ${state}, USA`;
  console.log(address);
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_DOMAIN
      }/geocode?address=${encodeURIComponent(address)}`
    );
    console.log("res", res);
    const data = await res.json();
    console.log("data", data);

    const lat = data[0].lat;
    const lon = data[0].lon;

    return { lat, lon };
  } catch (err) {
    console.error("Can not get lat and lon");
  }
}
