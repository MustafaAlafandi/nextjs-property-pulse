const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties({
  page = 1,
  pageSize = process.env.NEXT_PUBLIC_NUMBER_OF_PROPERTIES_PER_PAGE || 9,
  featured = false,
}) {
  if (!apiDomain) return;
  try {
    const link = featured
      ? `${apiDomain}/properties/featured`
      : `${apiDomain}/properties?page=${page}&pageSize=${pageSize}`;
    const res = await fetch(link, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();

    if (featured) return data;
    else return { properties: data.properties, total: data.total };
  } catch (err) {
    console.log(err);
  }
}

export async function fetchProperty(id) {
  if (!apiDomain) {
    return null;
  }
  try {
    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
