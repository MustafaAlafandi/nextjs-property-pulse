"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
import { FaArrowLeft } from "react-icons/fa";
import PropertyImages from "@/components/PropertyImages";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import Spinner from "@/components/Spinner";
import { propertyProps } from "@/types/basicTypes";
import BookMarkButton from "@/components/BookMarkButton";
import ShareButtons from "@/components/ShareButtons";
import PropertyContactForm from "@/components/PropertContactForm";
function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<propertyProps | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPropertyData() {
      if (property === null) {
        if (!id) return;
        try {
          const property: propertyProps = await fetchProperty(id);
          setProperty(property);
        } catch (err) {
          console.error("Error fetching property:", err);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchPropertyData();
  }, [id, property]);
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property Not Found
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <a
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </a>
            </div>
          </section>
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              {/* md:grid-cols-70-30 */}
              {/*  */}
              <div className="grid grid-cols-1 md:[grid-template-columns:70%_28%]  w-full gap-6">
                <PropertyDetails property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <BookMarkButton property={property} />
                  <ShareButtons property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
}

export default PropertyPage;
