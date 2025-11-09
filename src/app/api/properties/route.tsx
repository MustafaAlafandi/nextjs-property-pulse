import connectDB from "@/config/database";
import Property from "@/modules/Property";
// GET /api/properties
export const GET = async () => {
  try {
    await connectDB();
    const properties = await Property.find({});
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
export const POST = async (request: Request) => {
  try {
    const formData = await request.formData();
    // Access all values from amenties and images
    const amenities = formData.getAll("amenties");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");
    // Create PropertyData object for database
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
        nightly: formData.get("rates.nightly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      images,
    };

    return new Response(
      JSON.stringify({ message: "success", data: JSON.stringify(propertyData) }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new Response("failed to add property", { status: 500 });
  }
};
