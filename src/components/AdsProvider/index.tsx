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
  enableLazyload = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Create ad slots
  useEffect(() => {
    dfp.createSlots(ads, enableLazyload);

    return () => {
      dfp.removeSlots();
    };
  }, [enableLazyload]);

  // Enable debug console if possible
  useEffect(() => {
    if (debug) {
      dfp.openConsole();
    }
  }, [debug]);

  // Track route changes to re-render all slots
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true);
      dfp.removeSlots();
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
  }, []);

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
