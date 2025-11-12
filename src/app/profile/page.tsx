"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import Spinner from "@/components/Spinner";
import type { Session } from "next-auth";
import { propertyProps } from "@/types/basicTypes";
function ProfilePage() {
  let session:
    | Session
    | null
    | {
        user: {
          id: string | undefined;
          name: string | undefined;
          email: string | undefined;
          image: String | undefined;
        };
      };

  if (process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true") {
    const { data } = useSession();
    session = data;
  } else {
    session = {
      user: {
        id: process.env.NEXT_PUBLIC_TEST_PROFILE_ID,
        name: process.env.NEXT_PUBLIC_TEST_PROFILE_NAME,
        email: process.env.NEXT_PUBLIC_TEST_PROFILE_EMAIL,
        image: process.env.NEXT_PUBLIC_TEST_PROFILE_IMAGE,
      },
    };
  }

  const [properties, setProperties] = useState<propertyProps[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status == 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // Fetch User Properties when session is available
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);
  const handleDeleteProperty = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this property?");
    if(!confirm)
      return;
    try{
      const res = await fetch( `/api/properties/${id}`,{method:'DELETE'})
      if(res.status === 200){
        //Remove the property from state
        const updatedProperties = properties.filter((property)=> property._id !== id);
        setProperties(updatedProperties);
        alert('Property Deleted');
      }else{
        alert('Failed to delete property')
      }
    }catch(err){
      console.error(err);
      alert('Failed to delete property')
    }
  };
  return (
    // <!-- Profile Section -->
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={(session?.user?.image as string) || profileDefault}
                  alt="User"
                  width={100}
                  height={300}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {session?.user?.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {session?.user?.email}
              </h2>
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listing</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <div key={property._id} className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      <img
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt=""
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address: {property.location.street}{" "}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <a
                        href="/add-property.html"
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </a>
                      <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={handleDeleteProperty.bind(null,property._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
