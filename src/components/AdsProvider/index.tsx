import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

import { AdsProviderComponent } from "../../types";

import { AdsContext } from "../../contexts/ads";
import { dfp } from "../../apis/dfp";

export const AdsProvider: AdsProviderComponent = ({
  ads,
  children,
  debug = false,
  enableLazyload = true,
  enableRefresh = true
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // Create ad slots
  useEffect(() => {
    setIsLoading(true);

    dfp.createSlots(ads, enableLazyload, enableRefresh);

    setIsLoading(false);

    const handleRouteChangeStart = (url) => {
      if (window.location.pathname !== url) {
        setIsLoading(true);
        dfp.removeSlots();
        dfp.createSlots(ads, enableLazyload, enableRefresh);
      }
    };

    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [ads, enableLazyload, enableRefresh]);

  // Enable debug console if possible
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (!!debug && !searchParams.has("google_console")) {
      searchParams.append("google_console", "1");
      window.location = `${window.location.pathname}?${searchParams}` as any;
    }

    if (!debug && searchParams.has("google_console")) {
      searchParams.delete("google_console");

      const search = `${searchParams}`.length > 0 ? `?${searchParams}` : "";
      window.location = `${window.location.pathname}${search}` as any;
    }
  }, [debug]);

  return (
    <>
      <AdsContext.Provider value={{ isLoading }}>
        {children}
      </AdsContext.Provider>
      <Script
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        async
      />
    </>
  );
};
