import WeeklyCalendar from "./components/WeeklyCalneder"
import { useEffect } from 'react';
import { useState } from "react";
import Alert from "./components/Alert"


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
     {showAlert && <Alert message="היי, אני אלרט!" />}
   </>
   
  
  )
}

export default App
