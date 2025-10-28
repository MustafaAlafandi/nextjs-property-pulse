"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/requests";
function PropertyPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) return;
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false); 
      }
    }

    if(property === null){
      fetchPropertyData();
    }
  }, [id, property]);
  return (
    <div>
      The Page of Property {id}
    </div>
  );
}

export default PropertyPage;
