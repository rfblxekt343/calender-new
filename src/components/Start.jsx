import React from 'react';
import { FaRegSmile } from 'react-icons/fa';

function Start({ setShowStart }) {
  const features = [
    'תעשו זאת ע"י גרירה ',
    '!יש לכם רק שתי דקות',
    ' תיזהרו יהיו שינויים',
    'באפשרותכם לוסיף אירועים ללו"ז',
    '!בהצלחה'
  ];

  const handleCloseStart = () => {
    setShowStart(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center animate-fade-in">
        {/* Close button */}
        <button
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 text-xl"
          onClick={handleCloseStart}
          aria-label="סגור"
        >
          ×
        </button>
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <FaRegSmile className="text-yellow-400 text-5xl" />
        </div>
        <h1 className="text-4xl font-extrabold text-yellow-600 mb-3">ברוכים הבאים</h1>
        <p className="text-gray-600 mb-7 text-lg">אתם תצטרכו להכין לוז להכנ"ס</p>
        <ul className="space-y-3 text-right mb-8">
          {features.map((feature, i) => (
            <li
              key={i}
              className="bg-yellow-100 rounded-md text-yellow-900 px-4 py-2 font-medium shadow-sm hover:bg-yellow-200 transition"
            >
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={handleCloseStart}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-lg shadow-lg transition text-lg"
        >
          נתחיל
        </button>
      </div>
      {/* Animation styles */}
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
}

export default Start;