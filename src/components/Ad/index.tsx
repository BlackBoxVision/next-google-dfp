import React, { useContext, useEffect } from "react";

import { AdComponent } from "../../types";

import { AdsContext } from "../../contexts/ads";
import { dfp } from "../../apis/dfp";

export const Ad: AdComponent = ({
  id,
  className,
  style = {},
  width = 350,
  height = 250,
}) => {
  const { isLoading } = useContext(AdsContext);

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
