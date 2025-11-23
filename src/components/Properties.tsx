"use client";
import { useState, useEffect } from "react";
import { propertyProps } from "@/types/basicTypes";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import { fetchProperties } from "@/utils/requests";
import Pagination from "./Pagination";

function Properties() {
  const [properties, setProperties] = useState<propertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    process.env.NEXT_PUBLIC_NUMBER_OF_PROPERTIES_PER_PAGE
      ? parseInt(process.env.NEXT_PUBLIC_NUMBER_OF_PROPERTIES_PER_PAGE)
      : 9
  );
  const [totalItmes, setTotalItems] = useState(0);
  const fetchData = async (page: number, pageSize: number) => {
    const data = await fetchProperties(page, pageSize);
    if (data) {
      setProperties(data.properties);
      setTotalItems(data.total);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);
  const handlePageChange = async (forward: boolean) => {
    if (forward) {
      if (page + 1 <= Math.ceil(totalItmes / pageSize)) {
        await fetchData(page + 1, pageSize);
        setPage((pre) => pre + 1);
      }
    } else {
      if (page - 1 >= 1) {
        await fetchData(page - 1, pageSize);
        setPage((pre) => pre - 1);
      }
    }
  };
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
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItmes}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}

export default Properties;
