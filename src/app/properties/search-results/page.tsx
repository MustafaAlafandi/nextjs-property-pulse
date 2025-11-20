"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
  console.log("propertyType from frontend",propertyType);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          console.log("data.properties",data.properties);
          setProperties(data.properties);
        } else {
          setProperties([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);
  console.log("properties", properties);
  return <div>SearchResultsPage</div>;
};
export default SearchResultsPage;
