"use client";
import { useState, useEffect } from "react";
import { fetchProperties } from "@/utils/requests";
import { propertyProps } from "@/types/basicTypes";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProperties();
        data.sort((a: propertyProps, b: propertyProps) => {
          const firstDate: Date = new Date(b.createdAt);
          const secondDate: Date = new Date(a.createdAt);
          return secondDate.getTime() - firstDate.getTime();
        });
        setProperties(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
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

export default Properties;
