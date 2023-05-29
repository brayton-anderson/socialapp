import { useState } from "react";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import { UserProvider as AtlasUserProvider } from "../context/UserContext";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';

export default function App(props) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>Global Mineral Network - Unearth a world of beauty and knowledge!💎✨</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <UserProvider>
        <AtlasUserProvider>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colors: {
                  brand: [
                    "#fee43e", // hightlight light
                    "#fff",
                    "#fff",
                    "#fff",
                    "#fff",
                    "#9C8B1F", // icon color dark
                    "#fee43e", // btn-primary light
                    "#9C8B1F", // btn-hover light
                    "#fee43e", // btn-primary dark
                    "#000000", // btn-hover, highlight dark
                  ],
                  // #fee43e, #9C8B1F, #000000
                },
                primaryColor: "brand",
                colorScheme,
              }}
            >
              <NotificationsProvider>
                <Component {...pageProps} />
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </AtlasUserProvider>
      </UserProvider>
    </>
  );
}
