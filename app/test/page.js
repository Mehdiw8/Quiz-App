"use client";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
const Test = () => {
  const [lod, setLod] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLod(true);
    }, 3000);
  }, []);
  return (
    <div className="m-auto">
      <h1>{"mehdi" || <Skeleton />}</h1>
      <SkeletonTheme
        baseColor="#5294e0"
        highlightColor="#96c7ff"
        borderRadius="0.5rem"
        duration={4}
      >
        <p>{lod ? "mirzaei" : <Skeleton count={10} />}</p>
      </SkeletonTheme>
    </div>
  );
};

export default Test;
