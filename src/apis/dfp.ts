import { AdItem } from "../types";

const REFRESH_KEY = "refresh";
const REFRESH_VALUE = "true";

// Number of seconds to wait after the slot becomes viewable.
const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 60;

const googleTag = () => {
  const global = window as any;

  global.googletag = global.googletag || {};
  global.googletag.cmd = global.googletag.cmd || [];

  return global.googletag;
};

export const dfp = {
  createSlots: (ads: AdItem[], enableLazyload: boolean, enableRefresh: boolean = true) => {
    googleTag().cmd.push(() => {
      googleTag().pubads().collapseEmptyDivs();

      ads.forEach(({ slotId, divId, sizeMappings }: AdItem) => {
        let responsiveMappings: any = null;
        let mappings: any = sizeMappings;

        if (sizeMappings.length > 0) {
          const [firstSizeMapping]: any = sizeMappings;

          if (
            typeof firstSizeMapping === "object" &&
            !!firstSizeMapping.breakpoint &&
            !!firstSizeMapping.sizes
          ) {
            const sizeMapping = googleTag().sizeMapping();

            mappings = [];

            sizeMappings.forEach(({ breakpoint, sizes }: any) => {
              sizeMapping.addSize(breakpoint, sizes);

              const [firstSize] = sizes;

              if (!!firstSize && Array.isArray(firstSize)) {
                mappings.push(...sizes);
              } else {
                mappings.push(sizes);
              }
            });

            responsiveMappings = sizeMapping.build();
          }
        }

        const slot = googleTag()
          .defineSlot(slotId, mappings, divId)
          .setTargeting(REFRESH_KEY, REFRESH_VALUE)
          .addService(googleTag().pubads());

        if (!!responsiveMappings) {
          slot.defineSizeMapping(responsiveMappings);
        }
      });

      if (enableRefresh) {
        googleTag()
          .pubads()
          .addEventListener("impressionViewable", (event) => {
            const slot = event.slot;

            if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
              setTimeout(() => {
                googleTag().pubads().refresh([slot]);
              }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
            }
          });
      }

      if (!!enableLazyload) {
        // Enable lazyload with some good defaults
        googleTag().pubads().enableLazyLoad({
          fetchMarginPercent: 500,
          renderMarginPercent: 200,
          mobileScaling: 2.0,
        });
      }

      googleTag().enableServices();
    });
  },
  showSlot: (divId: string) => {
    googleTag().cmd.push(() => {
      googleTag().display(divId);
    });
  },
  removeSlots: () => {
    googleTag().cmd.push(() => {
      googleTag().destroySlots();
    });
  },
};
