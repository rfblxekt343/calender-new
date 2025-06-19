import React from 'react';
import { useEffect } from 'react';
import { useState } from "react";

function Start({setShowStart}) {
    
  const features = ['תעשו זאת ע"י גרירה ', '!יש לכם רק שתי דקות', ' תיזהרו יהיו שינויים', '!בהצלחה'];
    const handleCloseStart=() =>{
        setShowStart(false)
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">ברוכים הבאים </h1>
        <p className="text-gray-600 mb-6">אתם תצטרכו להכין לוז להכנ"ס</p>
        <ul className="space-y-3 text-left">
          {features.map((feature, i) => (
            <li
              key={i}
              className=" bg-yellow-100 rounded-md text-center text-yellow-800 px-4 py-2  hover:bg-yellow-200 transition"
            >
              {feature}
            </li>
          ))}
        </ul>
        <button onClick={handleCloseStart}>נתחיל</button>
      </div>
    </div>
  );
}

export default Start;