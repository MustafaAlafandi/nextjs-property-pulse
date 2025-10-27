"use client";
import ClipLoader from "react-spinners/ClipLoader";
import { clipLoaderOptions } from "../types/basicTypes";
const override = {
  display: "block",
  margin: "100px auto",
};
function LoadingPage({ loading }: clipLoaderOptions) {
  return (
    <ClipLoader
      color="#3bi82f6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}

export default LoadingPage;
