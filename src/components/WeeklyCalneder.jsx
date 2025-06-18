import React, { useState } from 'react';

const WeeklyCalendar = () => {
  const [calendarItems, setCalendarItems] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);

  const days = ['א', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']; // Mon-Sun in Hebrew
  const startHour = 8; // 8 AM
  const endHour = 21;   // 9 PM
  const timeIncrements = 0.5; // Half-hour increments
  const hours = Array.from({ length: (endHour - startHour) / timeIncrements * 2 }, (_, i) => startHour + i * timeIncrements);

  const contentsTypes = [
    { value: 'פיקודי', color: 'bg-blue-400' },
    { value: 'הדרכתי', color: 'bg-green-400' },
    { value: 'מקצועי', color: 'bg-purple-400' },
    { value: 'לוגיסיטי', color: 'bg-orange-400' }
  ];
  // Define 7 small banks, each with a title, color, and items
  const wordBanks = [
    {
      title: 'משש הכנ"ס קודם',
      color: 'bg-blue-500',
      items: ['', '', '']
    },
    {
      title: 'תיק אב הכנ"ס',
      color: 'bg-red-500',
      items: ['יומיים מטווחים', 'אימון כל ערב', 'גיבוש 7 שעות','הכנה עצמית יומיים','שג"מ יומיים']
    },
    {
      title: 'נוהל תלב',
      color: 'bg-blue-600',
      items: ['יחס סגל סגל', 'יחס סגל חניכים', 'מבחן מקצועי','יישור קו מדריכות', 'משך טי"ל','מסדר אמה"ד','כשיר להכשיר']
    },
    {
      title: 'איתור צורך להכנס',
      color: 'bg-purple-500',
      items: ['טנה ביקש תיקוף של כלל התכנים מחדש', 'הסגל ביקש גיבוש של יום מחוץ לבסיס','70% סגל חדש','העמקה בלקויות למידה']
    },
    {
      title: 'סולם להדרכה',
      color: 'bg-gray-500',
      items: ['תפיסת הדרכה', 'הארכת משך מסדר אמה"ד ל6 שעות (כרגע הוא שעתיים)']
    },
    {
      title: 'תחקור הכנס קודם',
      color: 'bg-orange-500',
      items: ['מעט מדי זמן מסלולי', 'מעט מדי מנוחה','יישור קו מקצועי לא מספק']
    },
    {
      title: 'דרישות נוספות',
      color: 'bg-green-500',
      items: ['', '', '']
    }
  ];

  const formatHour = (hour) => {
    const hourInt = Math.floor(hour);
    const minutes = (hour % 1) * 60;

    let displayHour = hourInt === 12 ? '12' : (hourInt > 12 ? hourInt - 12 : hourInt).toString();
    let displayMinutes = minutes === 0 ? '00' : minutes.toString();

    return `${displayHour}:${displayMinutes}`;
  };

    const generateKey = (day, hour) => {
        return `${day}-${hour}`;
    };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

 const handleDrop = (e, day, hour) => {
    e.preventDefault();
    if (draggedItem) {
        const key = generateKey(day, hour);
        const newItem = {
            ...draggedItem,
            id: Date.now() + Math.random()
        };

        setCalendarItems(prev => ({
            ...prev,
            [key]: [...(prev[key] || []), newItem]
        }));

        setDraggedItem(null);
    }
};


  const removeItem = (day, hour, itemId) => {
       const key = generateKey(day, hour);
    setCalendarItems(prev => ({
      ...prev,
      [key]: (prev[key] || []).filter(item => item.id !== itemId)
    }));
  };

  const clearAll = () => {
    setCalendarItems({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2" dir="rtl">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-2">יומן שבועי</h1>
        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600"
        >
          נקה הכל
        </button>
      </div>

      {/* Word Bank */}
      <div className="mb-4 bg-white rounded-lg p-3 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">פעילויות (גרור לוח השנה)</h2>
        <div className="grid grid-cols-6 gap-1">
          {wordBanks.map((item, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <ul>
                {item.items.map((bankItem, bankIndex) => (
                  <li
                    key={bankIndex}
                    draggable
                    onDragStart={(e) => handleDragStart(e, { title: bankItem, color: item.color })} // Pass individual item as dragged item
                    className={`${item.color} text-white text-xs font-medium py-1 px-2 rounded cursor-move active:scale-95 transition-transform text-center select-none inline-block mr-1 mb-1`}
                  >
                    {bankItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-8 bg-gray-100 border-b">
          <div className="p-2 text-xs font-semibold text-gray-600 border-l">שעה</div>
          {days.map(day => (
            <div key={day} className="p-2 text-xs font-semibold text-gray-600 text-center border-l first:border-l-0">
              {day}
            </div>
          ))}
        </div>

        {/* Time Rows */}
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-8 border-b last:border-b-0 min-h-[30px]">
            {/* Time Column */}
            <div className="p-2 text-xs font-medium text-gray-500 border-l bg-gray-50 flex items-start">
              {formatHour(hour)}
            </div>

            {/* Day Columns */}
            {days.map(day => {
              const key = generateKey(day, hour);
              const items = calendarItems[key] || [];

              return (
                <div
                  key={day}
                  className="border-l first:border-l-0 p-1 min-h-[30px] hover:bg-gray-50 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day, hour)}
                >
                  <div className="space-y-1">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className={`${item.color} text-white text-xs font-medium py-1 px-2 rounded flex items-center justify-between cursor-pointer hover:opacity-80`}
                        onClick={() => removeItem(day, hour, item.id)}
                      >
                        <span className="text-xs ml-1 opacity-70">×</span>
                        <span className="truncate flex-1 text-right">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          גרור פעילויות מבנק המילים לכל משבצת זמן • הקש על פריטים כדי להסיר אותם
        </p>
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-4"></div>
    </div>
  );
};

export default WeeklyCalendar;