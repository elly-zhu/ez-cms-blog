import "@/styles/globals.scss";
import "tailwindcss/tailwind.css";
import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { Layout } from "@/components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
