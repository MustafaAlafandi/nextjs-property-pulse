"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { propertyProps } from "@/types/basicTypes";
import { FaBookmark } from "react-icons/fa";
function BookMarkButton({ property }: { property: propertyProps }) {
  let userId: string | null | undefined;
  if (process.env.NEXT_PUBLIC_REGESTRING_ADDED === "true") {
    const { data: session } = useSession();
    userId = session?.user?.id;
  } else {
    userId = process.env.NEXT_PUBLIC_TEST_PROFILE_ID;
  }

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyId: property._id }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (err) {
        console.error(err);
      }finally{
        setLoading(false);
      }
    };
    checkBookmarkStatus();
  }, [property._id, userId]);
  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ propertyId: property._id }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        console.log("isBookmarked",data.isBookmarked);
        setIsBookmarked(data.isBookmarked);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };
  if (loading) return <p className="text-center">Loading...</p>;
  return (
    <button
      onClick={handleClick}
      className={`bg-${isBookmarked ? "red" : "blue"}-500 hover:bg-${
        isBookmarked ? "red" : "blue"
      }-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
    >
      <FaBookmark className="mr-2" />{" "}
      {`${isBookmarked?"Remove":""} Bookmark Property`}
    </button>
  );
}

export default BookMarkButton;
