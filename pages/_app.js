import Providers from "@/components/layouts/Providers";
import RootLayout from "@/components/layouts/RootLayout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Providers>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Providers>
  );
}
