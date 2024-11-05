import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { HiStatusOffline } from "react-icons/hi";
import { mainLoadingAtom, pinataAtom, secretAtom } from "./store/atoms/commonLegends";
import { useRecoilState, useSetRecoilState } from "recoil";
import { PinataSDK } from "pinata";

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsLoading] = useRecoilState(mainLoadingAtom);
  const setSecrets = useSetRecoilState(secretAtom);
  const setPinata = useSetRecoilState(pinataAtom);

  const fetchSecrets = async () => {
    try {
      const response = await fetch('/.netlify/functions/getSecrets');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSecrets(data); // Store the secrets in the atom

      // Configure Pinata SDK with the fetched JWT token
      setPinata(new PinataSDK({
        pinataJwt: data.pinataJwt,
      }));
    } catch (error) {
      console.error("Error fetching secrets:", error);
    } finally {
      setIsLoading(false); // Stop loading once fetch completes (either success or error)
    }
  };

  useEffect(() => {
    // Check the initial online status and fetch secrets asynchronously
    const initialize = async () => {
      setIsOnline(navigator.onLine);
      await fetchSecrets();
    };

    initialize();

    // Add event listeners to handle changes in online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Show offline message if not online
  if (!isOnline) {
    return (
      <div className="bg-[#1b1b20] flex h-screen w-screen items-center justify-center text-center">
        <div className="text-white flex flex-col items-center opacity-60">
          <HiStatusOffline size={100} />
          <h1 className="text-8xl font-bold">Offline</h1>
        </div>
      </div>
    );
  }

  // Show loading message until secrets are fetched
  if (isLoading) {
    return (
      <div className="bg-[#1b1b20] flex h-screen w-screen items-center justify-center text-center">
        <div className="text-white flex flex-col items-center opacity-60">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      </div>
    );
  }

  // Render the Home component once online and secrets are fetched
  return <Home />;
}

export default App;
