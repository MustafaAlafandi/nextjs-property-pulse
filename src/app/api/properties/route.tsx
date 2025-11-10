import { connectDB, disconnectDB } from "@/config/database";
import Property from "@/modules/Property";
import { getSessionUser } from "@/utils/getSessionUser";
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
  } finally {
    await disconnectDB();
  }
};
export const POST = async (request: Request) => {
  try {
    await connectDB();
    let userId;
    if (process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true") {
      const sessionUser = await getSessionUser();
      if (!sessionUser || !sessionUser.userId) {
        return new Response("User ID is required", { status: 401 });
      }
      userId = sessionUser.userId;
    } else {
      userId = process.env.NEXT_PUBLIC_TEST_PROFILE_ID;
    }
    const formData = await request.formData();
    // Access all values from amenties and images
    const amenties = formData.getAll("amenties");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");
    console.log(formData.get("rates.monthly"));
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
      amenties,
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
      owner: userId,
      // images,
    };
    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${newProperty._id}`
    );
  } catch (err) {
    return new Response("failed to add property", { status: 500 });
  } finally {
    await disconnectDB();
  }
};
