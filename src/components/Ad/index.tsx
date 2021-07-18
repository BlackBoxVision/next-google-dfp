import React, { useEffect } from "react";

import { AdComponent } from "../../types";

import { useAdsContext } from "../../contexts/ads";
import { dfp } from "../../apis/dfp";

export const Ad: AdComponent = ({
  id,
  className,
  style = {},
  width = 350,
  height = 250,
}) => {
  const { isLoading } = useAdsContext();

  useEffect(() => {
    if (!isLoading && !!id) {
      dfp.showSlot(id);
    }
  }, [isLoading, id]);

  return (
    <div
      id={id}
      className={className}
      style={{
        ...style,
        width,
        height,
      }}
    />
  );
};
