import React, { useState } from 'react';

const Alert = ({ startTimeOut }) => {
  const [visible, setVisible] = useState(true);

  const alertClosed = () => {
    setVisible(false);
    startTimeOut();
  };
  if (!visible) return null;
  const alerts = [
    'זמן ההכנ"ס התקצר ביומיים',
    'נכנס שינוי בתיק יסוד',
    'נכנס תוכן של יום- גף לוחמה',
    'להוסיף 3 שעות ש"כ',
    'נוספו 50 חיילים יש להכין מגורים וכיתות',
    'הקולנוע לא פנוי ביום ששוריין'
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        dir="rtl"
        className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 text-center animate-fade-in"
      >
        {/* Close button */}
        <button
          onClick={alertClosed}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl"
          aria-label="סגור"
        >
          ×
        </button>
        <h1 className="text-2xl font-bold text-yellow-600 mb-3">שימו לב לשינויים בלו"ז</h1>
        <p className="text-gray-700 mb-4">חזרו וסדרו מחדש לפיהם</p>
        <ul className="text-right space-y-2 mb-4">
          {alerts.map((alert, index) => (
            <li
              key={index}
              className="bg-yellow-100 rounded-md text-yellow-900 px-4 py-2 font-medium shadow-sm"
            >
              {alert}
            </li>
          ))}
        </ul>
        <h2 className="text-lg font-bold text-yellow-700">יש לכם עוד דקה וחצי לתיקונים, היעזרו בבנק "דרישות נוספות"</h2>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.7s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Alert;
