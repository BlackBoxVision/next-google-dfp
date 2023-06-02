import React from "react";

export type FluidItem = ["fluid"];
export type SizeItem = [number, number];
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

type AdsProviderProps = React.PropsWithChildren<{
  ads: AdItem[];
  debug?: boolean;
  enableLazyload?: boolean;
  enableRefresh?: boolean;
}>;

export type AdsProviderComponent = React.FC<AdsProviderProps>;

type AdProps = {
  id: string;
  style?: React.CSSProperties
  className?: string;
  width: number | string;
  height: number | string;
};

export type AdComponent = React.FC<AdProps>;
