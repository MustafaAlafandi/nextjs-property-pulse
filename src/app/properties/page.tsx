import type { propertyProps } from "@/types/basicTypes";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import PropertySearchForm from "@/components/PropertySearchForm";
async function PropertiesPage() {
  const properties: propertyProps[] =
    (await fetchProperties()) as propertyProps[];
  properties.sort((a: propertyProps, b: propertyProps) => {
    const firstDate: Date = new Date(b.createdAt);
    const secondDate: Date = new Date(a.createdAt);
    return secondDate.getTime() - firstDate.getTime();
  });
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-2-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
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
    </>
  );
}

export default PropertiesPage;
