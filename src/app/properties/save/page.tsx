"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { propertyProps } from "@/types/basicTypes";
function SavedPropertyPage() {
  const [properties, setProperties] = useState<propertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error("Faild to fetch saved properties");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };
    fetchSavedProperties();
  }, []);
  if (loading) return <Spinner loading={loading} />;
  return (
    <section className="px-4 py-6">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        {properties.length === 0 ? (
          <p>No property found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default SavedPropertyPage;
