import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
// GET api/properties/:id
export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    await connectDB();

    const property = await Property.findById(id);
    if (!property) {
      return new Response("Property not Found", { status: 404 });
    }
    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

// DELETE api/properties/:id
export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    let userId;
    if (process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true") {
      const sessionUser = await getSessionUser();
      // Check for session
      if (!sessionUser || !sessionUser.userId) {
        return new Response("User ID is required", { status: 401 });
      }

      userId = sessionUser.userId;
    } else {
      userId = process.env.NEXT_PUBLIC_TEST_PROFILE_ID;
    }
    await connectDB();

    console.log("userId", userId);

    const property = await Property.findById(id);

    console.log("property", property);

    if (!property) {
      return new Response("Property not Found", { status: 404 });
    }
    // Verify Owership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
// PUT /api/properties/:id
export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
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
    // Access all values from amenities and images
    const amenities = formData.getAll("amenities");

    // Get property to update
    const existingProperty = await Property.findById(id);
    if (!existingProperty) {
      return new Response("Property does NOT exist", { status: 404 });
    }
    // Verify ownership
    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }
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
      owner: userId,
    };
    const updatedProperty = await Property.findByIdAndUpdate(
      existingProperty._id,
      { $set: propertyData },
      { new: true }
    );
    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to add property", { status: 500 });
  } finally {
    // await ();
  }
};
