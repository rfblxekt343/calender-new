import React, { useState } from 'react';

const Alert = () => {
  const [visible, setVisible] = useState(true);
    console.log("djhfjd")
  if (!visible) return null;
    const alerts=['מפקד צוות 3 יוצא הביתה '    ,' פגישה עם מפקד הבסיס יום שני ב11',' שלושה חיילים בגימלים ביום ראשון']
  return (
<div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Optional overlay background */}
      <div className="absolute inset-0"></div>

      {/* Alert box */}
      <div
        dir="rtl"
        className="relative bg-yellow-100 border-r-4 border-yellow-500 text-yellow-800 p-4 pt-6 rounded shadow-lg max-w-sm w-full mx-4 z-10 overflow-y-auto max-h-[80vh]"
      >
        {/* Close button in top-right (RTL) */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-0.5 right-2 text-xl font-bold text-yellow-800 hover:text-yellow-600 focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Content with icon and message */}
        <div className="flex flex-row-reverse items-start">
         
          <div className="flex-1 text-right text-sm sm:text-base whitespace-pre-wrap">
            {alerts[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
