import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { HiStatusOffline } from "react-icons/hi";
import { pinataAtom, secretAtom } from "./store/atoms/commonLegends";
import { useSetRecoilState } from "recoil";

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const setSecrets = useSetRecoilState(secretAtom);
  const setPinata = useSetRecoilState(pinataAtom);

  const fetchSecrets = async () => {
    try {
      const response = await fetch('/.netlify/functions/getSecrets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data); // Log or use your secrets as needed
      setSecrets(data); // Store the secrets in the atom
      setPinata(new PinataSDK({pinataJwt: data.pinataJwt,}))
    } catch (error) {
      setError('Error fetching secrets: ' + error.message);
      console.error(error);
    }
  };


  useEffect(() => {
    // Check the initial online status

    fetchSecrets();

    setIsOnline(navigator.onLine);

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

  return (
    <>
      <Home />
    </>
  );
}

export default App;
