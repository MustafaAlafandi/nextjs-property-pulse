export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return new Response(
      JSON.stringify({ error: "Address is required" }),
      { status: 400 }
    );
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "my-nextjs-app/1.0 (mustafaalafandi194@gmail.com)"
      }
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Geocoding failed" }),
      { status: 500 }
    );
  }
}