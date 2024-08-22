import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { inter } from "@/lib/fonts";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone={"UTC"}
    >
      <style jsx global>{`
        html {
          color-scheme: dark;
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
