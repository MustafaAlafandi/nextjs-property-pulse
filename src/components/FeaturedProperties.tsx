"use client";
import { useState, useEffect } from "react";
import { propertyProps } from "@/types/basicTypes";
import { fetchProperties } from "@/utils/requests";
import FeaturedPropertyCard from "./FeaturedPropertyCard";
function FeaturedProperties() {
  const [properties, setProperties] = useState<propertyProps[]>([]);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const data = await fetchProperties({ featured: true });
        setProperties(data);
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      }
    };
    fetchFeaturedProperties();
  }, []);
  return properties.length > 0 &&(
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <FeaturedPropertyCard key={property._id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProperties;
