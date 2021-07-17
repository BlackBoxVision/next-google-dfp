import React from "react";

export type AdItem = {
  divId: string;
  slotId: string;
  // TODO: define diferent capabilities for sizeMappings
  sizeMappings: any;
};

// Components

type AdsProviderProps = {
  ads: AdItem[];
  debug?: boolean;
  enableLazyload?: boolean;
};

export type AdsProviderComponent = React.FC<AdsProviderProps>;

type AdProps = {
  id: string;
  style: any;
  width: number;
  height: number;
  className: string;
};

export type AdComponent = React.FC<AdProps>;
