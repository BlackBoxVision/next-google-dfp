import React from "react";

export type FluidItem = ["fluid"];
export type SizeItem = [width: number, height: number];
export type ResponsiveItem = {
  breakpoint: SizeItem;
  sizes: SizeItem | SizeItem[];
};

export type SizeMappings = FluidItem | SizeItem | SizeItem[] | ResponsiveItem[];

export type AdItem = {
  divId: string;
  slotId: string;
  sizeMappings: SizeMappings;
};

// Context

export type AdsContextValue = null | {
  isLoading: boolean;
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
