import React, { useState } from 'react';

const WeeklyCalendar = () => {
  const [calendarItems, setCalendarItems] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [wordBanks, setWordBanks] = useState([
    {
      title: 'משש הכנס חדם',
      color: 'bg-blue-500',
      items: [
        { title: 'שם פעילות', duration: 1 }
      ]
    },
    {
      title: 'תיק אם הכנס',
      color: 'bg-red-500',
      items: [
        { title: 'יומיים מטווחים', duration: 7 },
        { title: 'אימון כל ערב', duration: 2 },
        { title: 'גיבוש 7 שעות', duration: 7 },
        { title: 'הבנה עצמית יומיים', duration: 8 },
        { title: 'שגמ יומיים', duration: 48 },
        { title: 'שגמ יומיים', duration: 48 }
      ]
    },
    {
      title: 'נוהל תלב',
      color: 'bg-blue-600',
      items: [
        { title: 'יחס סגל סגל', duration: 1 },
        { title: 'יחס סגל חיכים', duration: 1 },
        { title: 'מבחן מקצועי', duration: 2 },
        { title: 'יישור קו מדריכות', duration: 2 },
        { title: 'משך טיל', duration: 1 },
        { title: 'מסדר אמהד', duration: 2 },
        { title: 'כשיר להכשיר', duration: 1 }
      ]
    },
    {
      title: 'איתור צורך להכנס',
      color: 'bg-purple-500',
      items: [
        { title: 'טנה ביקש תיקוף של כלל התכנים מחדש', duration: 2 },
        { title: 'הסגל ביקש גיבוש של יום מחוץ לבסיס', duration: 7 },
        { title: '70% סגל חדש', duration: 1 },
        { title: 'העמקה בלקויות למידה', duration: 2 }
      ]
    },
    {
      title: 'סולם להדרכה',
      color: 'bg-gray-500',
      items: [
        { title: 'תפיסת הדרכה', duration: 1 },
        { title: 'הארכת משך מסדר אמהד ל6 שעות (כרגע הוא שעתיים)', duration: 6 }
      ]
    },
    {
      title: 'תחקור הכנס קודם',
      color: 'bg-orange-500',
      items: [
        { title: 'מעט מדי זמן מסלולי', duration: 1 },
        { title: 'מעט מדי מנוחה', duration: 1 },
        { title: 'יישור קו מקצועי לא מספק', duration: 2 }
      ]
    },
    {
      title: 'דרישות נוספות',
      color: 'bg-green-500',
      items: [
        { title: 'נושא חדש', duration: 1 }
      ]
    }
  ]);

  const days = ['א', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']; // Mon-Sun in Hebrew
  const startHour = 8; // 8 AM
  const endHour = 22;   // 9 PM
  const timeIncrements = 0.5; // Half-hour increments
  const hours = Array.from({ length: (endHour - startHour) / timeIncrements }, (_, i) => startHour + i * timeIncrements);

  const formatHour = (hour) => {
    const hourInt = Math.floor(hour);
    const minutes = (hour % 1) * 60;

    // Use the modulo operator (%) to get the hour in 12-hour format
    let displayHour = hourInt % 24; // Keep the hour in 24-hour format

    let displayMinutes = minutes === 0 ? '00' : minutes.toString();

    return `${displayHour}:${displayMinutes}`;
  };

  const generateKey = (day, hour) => {
    return `${day}-${hour}`;
  };

  const handleDragStart = (e, item, bankIndex, itemIndex) => {
    setDraggedItem({ ...item, bankIndex: bankIndex, itemIndex: itemIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, day, hour) => {
    e.preventDefault();
    if (draggedItem) {
      const duration = draggedItem.duration || 1; // Default duration to 1 if not provided
      const itemId = draggedItem.id || Date.now() + Math.random(); // Use existing ID if moving, else generate new

      // Remove from previous location if it was already on the calendar
      if (draggedItem.day && draggedItem.hour) {
        removeItem(draggedItem.day, draggedItem.hour, itemId, false); // false = don't add back to word bank
      } else {
        // Remove from word bank if it's a new item
        setWordBanks(prevBanks => {
          const updatedBanks = [...prevBanks];
          if (draggedItem.bankIndex !== undefined && draggedItem.itemIndex !== undefined) {
            updatedBanks[draggedItem.bankIndex] = {
              ...updatedBanks[draggedItem.bankIndex],
              items: updatedBanks[draggedItem.bankIndex].items.filter((_, i) => i !== draggedItem.itemIndex)
            };
          }
          return updatedBanks;
        });
      }

      let allKeys = [];

      for (let i = 0; i < duration * 2; i++) { // *2 because of 0.5 increments
        const currentHour = hour + i * timeIncrements;
        if (currentHour >= startHour && currentHour < endHour) {
          const key = generateKey(day, currentHour);
          allKeys.push(key);
          const newItem = {
            ...draggedItem,
            id: itemId, // Use the same ID for all segments of the item
            day: day,
            hour: hour
          };

          setCalendarItems(prev => ({
            ...prev,
            [key]: [...(prev[key] || []), newItem]
          }));
        }
      }
      setDraggedItem(null);
    }
  };

  const removeItem = (day, hour, itemId, addToWordBank = true) => {
    const itemToRemove = Object.values(calendarItems)
      .flatMap(items => items)
      .find(item => item.id === itemId);

    if (!itemToRemove) return;

    const duration = itemToRemove.duration || 1;
    const color = itemToRemove.color;
    const title = itemToRemove.title;

    let allKeys = [];
    for (let i = 0; i < duration * 2; i++) {
      const currentHour = hour + i * timeIncrements;
      if (currentHour >= startHour && currentHour < endHour) {
        const key = generateKey(day, currentHour);
        allKeys.push(key);
      }
    }

    setCalendarItems(prev => {
      const updatedCalendarItems = { ...prev };
      allKeys.forEach(key => {
        if (updatedCalendarItems[key]) {
          updatedCalendarItems[key] = updatedCalendarItems[key].filter(item => item.id !== itemId);
          if (updatedCalendarItems[key].length === 0) {
            delete updatedCalendarItems[key];
          }
        }
      });
      return updatedCalendarItems;
    });

    if (addToWordBank) {
      // Add back to word bank
      setWordBanks(prevBanks => {
        const bankIndex = prevBanks.findIndex(bank => bank.color === color);
        if (bankIndex !== -1) {
          const updatedBanks = [...prevBanks];
          updatedBanks[bankIndex] = {
            ...updatedBanks[bankIndex],
            items: [...updatedBanks[bankIndex].items, { title: title, duration: duration }]
          };
          return updatedBanks;
        }
        return prevBanks;
      });
    }
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
                    onDragStart={(e) => handleDragStart(e, { title: bankItem.title, color: item.color, duration: bankItem.duration }, index, bankIndex)}
                    className={`${item.color} text-white text-xs font-medium py-1 px-2 rounded cursor-move active:scale-95 transition-transform text-center select-none inline-block mr-1 mb-1`}
                  >
                    {bankItem.title}
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
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', ''); // Required for Firefox to allow dragging
                          setDraggedItem({ ...item, bankIndex: undefined, itemIndex: undefined });
                        }}
                        onClick={() => removeItem(item.day, item.hour, item.id)}
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