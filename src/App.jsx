import WeeklyCalendar from "./components/WeeklyCalneder"
import { useEffect } from 'react';
import { useState } from "react";
import Alert from "./components/Alert"
import Start from "./components/Start"

function App() {
const [showStart, setShowStart] = useState(true);
const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 90000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  return (

   
   <>
     {showStart && <Start setShowStart={setShowStart} />}
     {!showStart && <WeeklyCalendar/>}
     {showAlert && <Alert />}
   </>
  )
}

export default App
