import WeeklyCalendar from "./components/WeeklyCalneder"
import Alert from "./components/Alert"
import { useEffect } from 'react';
import { useState } from "react";

function App() {
const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  return (
   
   <>
     <WeeklyCalendar/>
     {showAlert && <Alert />}
   </>
  )
}

export default App
