import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { mainLoadingAtom, pinataAtom, secretAtom } from "./store/atoms/commonLegends";
import { useRecoilState, useSetRecoilState } from "recoil";
import { PinataSDK } from "pinata";
import NoMetaMask from "./pages/NoMetaMask";
import LoadingPage from "./pages/LoadingPage";
import { set } from "rsuite/esm/internals/utils/date";
import OfflinePage from "./pages/offlinePage";

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [mainLoading, setMainLoading] = useRecoilState(mainLoadingAtom);
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
      return true;
    } catch (error) {
      console.error("Error fetching secrets:", error);
      setMainLoading(0);
      return false;
    } 
  };

  const checkMetaMask = async () => {
    if (!(typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask)) {
      setMainLoading(1);
      return false;
    }
    return true;
  };


  useEffect(() => {
    // Check the initial online status and fetch secrets asynchronously
    const initialize = async () => {
      setIsOnline(navigator.onLine);
      const isMetaMask = await checkMetaMask();

      if (isMetaMask) {
        const isFetched= await fetchSecrets();
        if (isFetched){
          setMainLoading(2);
        }
      }

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

    return <OfflinePage />;
  }

  // Show loading message until secrets are fetched
  if (mainLoading === 1) {


    return <NoMetaMask />;
  }

  // Render the Home component once online and secrets are fetched
  if (mainLoading === 2) {


    return <Home />;
  }

  return <LoadingPage />;
}

export default App;
