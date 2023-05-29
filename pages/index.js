import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";
import { AppShell, LoadingOverlay } from "@mantine/core";
import Navbar from "../components/Navbar/Navbar";
import Minerals from "../components/Minerals/Minerals";
import CreateMineral from "../components/Minerals/CreateMineral";
import HeaderSearch from "../components/Header/HeaderSearch";
import Profile from "../components/Profile/Profile";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [minerals, setMinerals] = useState([]);
  const [page, setPage] = useState("Home");
  const setUser = useSetUser();

  useEffect(() => {
    (async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson);

      const getMinerals = await fetch("/api/mineral");
      const getMineralsJson = await getMinerals.json();
      setMinerals(getMineralsJson);

      setIsLoading(false);
    })();
  }, []);

  return (
    <AppShell
      header={<HeaderSearch setMinerals={setMinerals} />}
      navbar={<Navbar page={page} setPage={setPage} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <LoadingOverlay visible={isLoading} />
      {page === "Home" && (
        <>
          <CreateMineral setMinerals={setMinerals} />
          <Minerals minerals={minerals} setMinerals={setMinerals} />
        </>
      )}
      {page === "Profile" && <Profile />}
    </AppShell>
  );
}

export const getServerSideProps = withPageAuthRequired();
