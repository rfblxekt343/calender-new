import WeeklyCalendar from "./components/WeeklyCalneder"
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
     {showAlert && <div className="alert">Hello after 3 seconds!</div>}
   </>
  )
}

export default App
