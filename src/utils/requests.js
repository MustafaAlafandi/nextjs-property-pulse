const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties(page, pageSize) {
  if (!apiDomain) return;
  try {
    const res = await fetch(
      `${apiDomain}/properties?page=${page}&pageSize=${pageSize}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return { properties: data.properties, total: data.total };
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
