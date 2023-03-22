# Next Google DFP [![npm version](https://badge.fury.io/js/%40blackbox-vision%2Fnext-google-dfp.svg)](https://badge.fury.io/js/%40blackbox-vision%2Fnext-google-dfp) [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

🚀 Integrate Google Double Click for Publishers in Next.js with ease

## Installation

### NPM

```bash
npm i @blackbox-vision/next-google-dfp
```

### YARN

```bash
yarn add @blackbox-vision/next-google-dfp
```

## Integration Steps

### Define your slots

```js
export const ads = [
  {
    slotId: "/6355419/Travel/Europe/France/Paris",
    sizeMappings: [300, 250],
    divId: "banner-ad",
  },
];
```

### Add a Provider in Custom App

```ts
import { AdsProvider } from "@blackbox-vision/next-google-dfp";

import { ads } from "../constants/ads";

function MyApp({ Component, pageProps }) {
  return (
    <AdsProvider ads={ads} enableLazyload>
      <Component {...pageProps} />
    </AdsProvider>
  );
}

export default MyApp;
```

### Add an Ad in your page

```js
import { Ad } from "@blackbox-vision/next-google-dfp";

function Page() {
  return <Ad id="banner-ad" width={300} height={250} />;
}

export default Page;
```

## Responsive Ad Slots

Responsive slots can be defined with this structure:

```js
export const ads = [
  {
    slotId: "/6355419/Travel/Europe/France/Paris",
    sizeMappings: [
			{
				breakpoint: [1024, 768],
				sizes: [
					[980, 90],
					[980, 250],
					[728, 90],
				],
			}, //viewport >1024px
			{
				breakpoint: [0, 0],
				sizes: [
					[320, 100],
					[320, 50],
				],
			}, //viewport <1024px
		],
    divId: "banner-ad",
  },
];
```

// TODO: add props, add support for more cases, show targeting support
