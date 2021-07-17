import { AdItem } from "../types";

const REFRESH_KEY = "refresh";
const REFRESH_VALUE = "true";

// Number of seconds to wait after the slot becomes viewable.
const SECONDS_TO_WAIT_AFTER_VIEWABILITY = 60;

export const dfp = {
  openConsole: () => {
    const googletag = (window as any).googletag;

    googletag.openConsole();
  },
  createSlots: (ads: AdItem[], enableLazyload: boolean) => {
    const googletag = (window as any).googletag;

    googletag.cmd.push(() => {
      ads.forEach(({ slotId, divId, sizeMappings }: any) => {
        // TODO: define size mappings

        googletag
          .defineSlot(slotId, [728, 90], divId)
          .setTargeting(REFRESH_KEY, REFRESH_VALUE)
          .addService(googletag.pubads());
      });

      googletag.pubads().addEventListener("impressionViewable", (event) => {
        const slot = event.slot;

        if (slot.getTargeting(REFRESH_KEY).indexOf(REFRESH_VALUE) > -1) {
          setTimeout(() => {
            googletag.pubads().refresh([slot]);
          }, SECONDS_TO_WAIT_AFTER_VIEWABILITY * 1000);
        }
      });

      if (!!enableLazyload) {
        // Enable lazyload with some good defaults
        googletag.pubads().enableLazyLoad({
          fetchMarginPercent: 500,
          renderMarginPercent: 200,
          mobileScaling: 2.0,
        });
      }

      googletag.enableServices();
    });
  },
  showSlot: (divId: string) => {
    const googletag = (window as any).googletag;

    googletag.cmd.push(() => {
      googletag.display(divId);
    });
  },
  removeSlots: () => {
    const googletag = (window as any).googletag;

    googletag.cmd.push(() => {
      googletag.destroySlots();
    });
  },
};
