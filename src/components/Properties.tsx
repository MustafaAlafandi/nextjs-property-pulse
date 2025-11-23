"use client";
import { useState, useEffect } from "react";
import { propertyProps } from "@/types/basicTypes";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import { fetchProperties } from "@/utils/requests";

function Properties() {
  const [properties, setProperties] = useState<propertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    process.env.NEXT_PUBLIC_NUMBER_OF_PROPERTIES_PER_PAGE
      ? parseInt(process.env.NEXT_PUBLIC_NUMBER_OF_PROPERTIES_PER_PAGE)
      : 3
  );
  const [totalItmes, setTotalItems] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProperties(page, pageSize);
      if (data) {
        setProperties(data.properties);
        setTotalItems(data.total);
      }
      setLoading(false);
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
            {properties &&
              properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Properties;
