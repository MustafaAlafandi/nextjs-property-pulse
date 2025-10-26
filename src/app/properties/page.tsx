import type { propertyProps } from "@/types/basicTypes";
import properties from "@/data/properties.json";
import PropertyCard from "@/components/PropertyCard";
function PropertiesPage() {
  const props: propertyProps[] = properties as propertyProps[];
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        {props.length === 0 ? (
          <p>No property found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {props.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default PropertiesPage;
