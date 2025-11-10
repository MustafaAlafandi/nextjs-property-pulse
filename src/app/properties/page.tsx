import type { propertyProps } from "@/types/basicTypes";
import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
async function PropertiesPage() {
  const properties: propertyProps[] =
    (await fetchProperties()) as propertyProps[];
  properties.sort((a: propertyProps, b: propertyProps) => {
    const firstDate: Date = new Date(b.createdAt);
    const secondDate: Date = new Date(a.createdAt);
    return secondDate.getTime() - firstDate.getTime();
  });
  console.log(properties);
  return (
    <section className="px-4 py-6">
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

export default PropertiesPage;
