import WeeklyCalendar from "./components/WeeklyCalneder"
import { useEffect, useState } from "react";
import Alert from "./components/Alert"
import Start from "./components/Start"
import FinalScreen from "./components/FinalScreen";

const alertMessages = [
  'זמן ההכנ"ס התקצר ביומיים',
  'נכנס שינוי בתיק יסוד',
  'נכנס תוכן של יום- גף לוחמה',
  'להוסיף 3 שעות ש"כ',
  'נוספו 50 חיילים יש להכין מגורים וכיתות',
  'הקולנוע לא פנוי ביום ששוריין'
];

function App() {
  const [showStart, setShowStart] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [alertClosed, setAlertClosed] = useState(false);

  useEffect(() => {
    // Set a timer to show the alert after 90 seconds
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 9000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  const startTimeOut = () => {
    setShowAlert(false);
    setAlertClosed(true);
    setTimeout(() => {
      setShowFinalScreen(true);
    }, 90000); // Show final screen after 90 seconds
  }

  return (
    <>
      {showStart && <Start setShowStart={setShowStart} />}
      {!showStart && (
        <WeeklyCalendar
          alertClosed={alertClosed}
          alertMessages={alertMessages}
        />
      )}
      {showAlert && <Alert startTimeOut={startTimeOut} alertMessages={alertMessages} />}
      {showFinalScreen && <FinalScreen />}
   
    </>
  )
}

export default App