# Next Google DFP

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

// TODO: add props, add support for more cases, show targeting support
