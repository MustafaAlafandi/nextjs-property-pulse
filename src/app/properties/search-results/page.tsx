"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { propertyProps } from "@/types/basicTypes";
import PropertySearchForm from "@/components/PropertySearchForm";
const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<propertyProps[]>([]);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");
  console.log("propertyType from frontend", propertyType);
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          console.log("data.properties", data.properties);
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
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-2-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-4"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4">Search Results</h1>
            {properties.length === 0 ? (
              <p>No Search Results Found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};
export default SearchResultsPage;
