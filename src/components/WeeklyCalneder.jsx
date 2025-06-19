import React, { useState } from 'react';

const WeeklyCalendar = ({ alertClosed = false, alertMessages = [] }) => {
  const [calendarItems, setCalendarItems] = useState(() => {
    const items = {};
    
    const addCalendarItem = (id, day, startHour, duration, title, color) => {
      for (let i = 0; i < duration * 2; i++) {
        const hour = startHour + i * 0.5;
        const key = `${day}-${hour}`;
        
        if (!items[key]) {
          items[key] = [];
        }
        
        items[key].push({
          title,
          color,
          duration,
          id,
          day,
          hour: startHour
        });
      }
    };
    
    // Add multiple items
    addCalendarItem(1, 'א', 8, 4, 'הגעה מהבית', 'bg-pink-500');
    addCalendarItem(3, 'א', 17, 3, 'סימולציות פיקודיות', 'bg-gray-500');
    addCalendarItem(4, 'ב׳', 9, 2, 'שיחת מפקד גף', 'bg-blue-500');
    addCalendarItem(5, 'ג׳', 21.5, 3, 'אימון', 'bg-green-500');
    addCalendarItem(6, 'ד׳', 21.5, 3, 'שיחת סוף יום', 'bg-green-500');
    addCalendarItem(7, 'ב׳', 21.5, 3, 'שיחת סוף יום', 'bg-green-500');
    addCalendarItem(8, 'ה׳', 21.5, 3, 'שיחת סוף יום', 'bg-green-500');
    addCalendarItem(9, 'ו׳', 21.5, 3, 'שיחת סוף יום', 'bg-green-500');
    addCalendarItem(10, 'ש׳', 21.5, 3, 'שיחת סוף יום', 'bg-green-500');
    addCalendarItem(11, 'א', 21.5, 3, 'שיחת סוף יום', 'bg-green-500');
    addCalendarItem(2, 'ב׳', 11.5, 1, 'שיחת מפקד מגמה', 'bg-blue-500');
    addCalendarItem(13, 'א', 13.5, 1, 'ארוחת צהריים', 'bg-yellow-400');
    addCalendarItem(14, 'ב׳', 13.5, 1, 'ארוחת צהריים', 'bg-yellow-400');
    addCalendarItem(15, 'ג׳', 13.5, 1, 'ארוחת צהריים', 'bg-yellow-400');
    addCalendarItem(16, 'ד׳', 13.5, 1, 'ארוחת צהריים', 'bg-yellow-400');
    addCalendarItem(17, 'ה׳', 13.5, 1, 'ארוחת צהריים', 'bg-yellow-400');
    addCalendarItem(18, 'ו׳', 13.5, 1, 'ארוחת צהריים', 'bg-yellow-400');
    addCalendarItem(19, 'ש׳', 13.5, 1, 'ארוחת צהריים', 'bg-yellow-400');
    addCalendarItem(20, 'ד׳', 15.5, 1, 'רוח צה״ל', 'bg-green-400');
    addCalendarItem(21, 'ה׳', 10, 1, 'סדנת התבוננות עצמית', 'bg-green-400');
    addCalendarItem(22, 'ה׳', 8.5, 1, 'מסדר ונקיון תשתיות', 'bg-green-400');
    addCalendarItem(23, 'ג׳', 9.5, 10, 'הכנ״ס מקצועי', 'bg-red-400');
    addCalendarItem(24, 'ד׳', 9.5, 10, 'הכנ״ס מקצועי', 'bg-red-400');
    addCalendarItem(25, 'ב׳', 8, 0.5, 'מסדר דגל + קפה של בוקר', 'bg-orange-400');
    addCalendarItem(26, 'ג׳', 8, 0.5, 'מסדר דגל + קפה של בוקר', 'bg-orange-400');
    addCalendarItem(27, 'ד׳', 8, 0.5, 'מסדר דגל + קפה של בוקר', 'bg-orange-400');
    addCalendarItem(28, 'ה׳', 8, 0.5, 'מסדר דגל + קפה של בוקר', 'bg-orange-400');

    return items;
  });

  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showItemSelector, setShowItemSelector] = useState(false);
  const [touchStartPos, setTouchStartPos] = useState(null);
  
  const [wordBanks, setWordBanks] = useState([
    {
      title: 'מש״ש הכנ״ס קודם',
      color: 'bg-pink-500',
      items: []
    },
    {
      title: 'תיק אב הכנ״ס',
      color: 'bg-red-500',
      items: [
        { title: 'יומיים מטווחים', duration: 7 },
        { title: 'אימון כל ערב', duration: 2 },
        { title: 'גיבוש 7 שעות', duration: 7 },
        { title: 'הכנה עצמית יומיים', duration: 8 },
        { title: 'שג״מ יומיים (יום 1)', duration: 48 },
        { title: 'שג״מ יומיים (יום 2)', duration: 48 },
      ]
    },
    {
      title: 'נוהל תל״ב',
      color: 'bg-blue-600',
      items: [
        { title: 'יחס סגל סגל', duration: 1 },
        { title: 'יחס סגל חניכים', duration: 1 },
        { title: 'מבחן מקצועי', duration: 2 },
        { title: 'יישור קו מדריכות', duration: 2 },
        { title: 'משך טי״ל', duration: 1 },
        { title: 'מסדר אמה״ד', duration: 2 },
        { title: 'כשיר להכשיר', duration: 1 }
      ]
    },
    {
      title: 'איתור צורך להכנ״ס',
      color: 'bg-purple-500',
      items: [
        { title: 'טנה ביקשו תיקוף של כלל התכנים מחדש', duration: 2 },
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
        { title: 'הארכת משך מסדר אמה״ד ל6 שעות (כרגע הוא שעתיים)', duration: 6 }
      ]
    },
    {
      title: 'תחקור הכנ״ס קודם',
      color: 'bg-orange-500',
      items: [
        { title: 'מעט מדי זמן מסלולי', duration: 1 },
        { title: 'מעט מדי מנוחה', duration: 1 },
        { title: 'יישור קו מקצועי לא מספק', duration: 2 }
      ]
    },
    {
      title: 'דרישות נוספות',
      color: 'bg-yellow-500',
      items: [
        { title: 'משך תיק יסוד', duration: 2 },
        { title: 'תוכן של יום גף לוחמה', duration: 48 },
        { title: '3 שעות ש״כ', duration: 3 },
      ]
    },
    {
      title: 'הוספת תכנים ללו״ז',
      color: 'bg-green-500',
      items: [
        { title: 'נושא חדש', duration: 1 }
      ]
    }
  ]);

  const [showNewTopicDialog, setShowNewTopicDialog] = useState(false);
  const [newTopic, setNewTopic] = useState({
    day: 'א',
    hour: 8,
    duration: 1,
    title: 'נושא חדש'
  });

  const days = ['א', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];
  const startHour = 8;
  const endHour = 22;
  const timeIncrements = 0.5;
  const hours = Array.from({ length: (endHour - startHour) / timeIncrements }, (_, i) => startHour + i * timeIncrements);

  const formatHour = (hour) => {
    const hourInt = Math.floor(hour);
    const minutes = (hour % 1) * 60;
    const displayHour = hourInt % 24;
    const displayMinutes = minutes === 0 ? '00' : minutes.toString();
    return `${displayHour}:${displayMinutes}`;
  };

  const generateKey = (day, hour) => `${day}-${hour}`;

  // Mobile-friendly touch handlers
  const handleTouchStart = (e, item, bankIndex, itemIndex) => {
    e.preventDefault();
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY });
    setDraggedItem({ ...item, id: Date.now() + Math.random(), bankIndex, itemIndex });
  };

  const handleSlotClick = (day, hour) => {
    setSelectedSlot({ day, hour });
    setShowItemSelector(true);
  };

  const addItemToSlot = (item, bankIndex, itemIndex) => {
    if (!selectedSlot) return;
    
    const { day, hour } = selectedSlot;
    const duration = item.duration || 1;
    const itemId = Date.now() + Math.random();

    // Remove from word bank
    setWordBanks(prevBanks => {
      const updatedBanks = [...prevBanks];
      updatedBanks[bankIndex] = {
        ...updatedBanks[bankIndex],
        items: updatedBanks[bankIndex].items.filter((_, i) => i !== itemIndex)
      };
      return updatedBanks;
    });

    // Add to calendar
    for (let i = 0; i < duration * 2; i++) {
      const currentHour = hour + i * timeIncrements;
      if (currentHour >= startHour && currentHour < endHour) {
        const key = generateKey(day, currentHour);
        const newItem = {
          ...item,
          id: itemId,
          day,
          hour
        };

        setCalendarItems(prev => ({
          ...prev,
          [key]: [...(prev[key] || []), newItem]
        }));
      }
    }

    setShowItemSelector(false);
    setSelectedSlot(null);
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
      setWordBanks(prevBanks => {
        const bankIndex = prevBanks.findIndex(bank => bank.color === color);
        if (bankIndex !== -1) {
          const updatedBanks = [...prevBanks];
          updatedBanks[bankIndex] = {
            ...updatedBanks[bankIndex],
            items: [...updatedBanks[bankIndex].items, { title, duration }]
          };
          return updatedBanks;
        }
        return prevBanks;
      });
    }
  };

  const handleAddNewTopic = () => {
    const { day, hour, duration, title } = newTopic;
    const id = Date.now() + Math.random();
    
    for (let i = 0; i < duration * 2; i++) {
      const currentHour = parseFloat(hour) + i * timeIncrements;
      if (currentHour >= startHour && currentHour < endHour) {
        const key = generateKey(day, currentHour);
        const newItem = {
          title,
          color: 'bg-green-500',
          duration,
          id,
          day,
          hour: parseFloat(hour)
        };
        setCalendarItems(prev => ({
          ...prev,
          [key]: [...(prev[key] || []), newItem]
        }));
      }
    }
    setShowNewTopicDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-1 sm:p-2" dir="rtl">
      {/* Alert summary */}
      {alertClosed && (
        <div className="mb-2 sm:mb-4 bg-yellow-100 border-r-4 border-yellow-500 rounded p-2 sm:p-3 shadow text-yellow-900">
          <h2 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">שימו לב לשינויים בלו״ז:</h2>
          <ul className="list-disc pr-4 sm:pr-5 space-y-1 text-xs sm:text-sm">
            {alertMessages.map((msg, idx) => (
              <li key={idx}>{msg}</li>
            ))}
          </ul>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm">יש להיעזר בבנק "דרישות נוספות"</p>
        </div>
      )}

      {/* Header */}
      <div className="mb-2 sm:mb-4 text-center">
        <h1 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">יומן שבועי</h1>
      </div>

      {/* Word Bank */}
      <div className="mb-2 sm:mb-4 bg-white rounded-lg p-2 sm:p-3 shadow-sm">
        <h2 className="text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
          הקש על משבצת בלו״ז ואז בחר פעילות להוספה
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 sm:gap-1">
          {wordBanks.map((bank, index) => (
            <div key={index} className="mb-1 sm:mb-2">
              <h3 className="text-xs sm:text-sm font-semibold mb-1">{bank.title}</h3>
              <div className="flex flex-wrap gap-1">
                {bank.items.map((bankItem, bankIndex) => {
                  if (bank.title === 'הוספת תכנים ללו״ז' && bankItem.title === 'נושא חדש') {
                    return (
                      <button
                        key={bankIndex}
                        className={`${bank.color} text-white text-xs font-medium py-1 px-2 rounded cursor-pointer active:scale-95 transition-transform text-center select-none`}
                        onClick={() => setShowNewTopicDialog(true)}
                      >
                        {bankItem.title}
                      </button>
                    );
                  }
                  return (
                    <button
                      key={bankIndex}
                      className={`${bank.color} text-white text-xs font-medium py-1 px-2 rounded cursor-pointer active:scale-95 transition-transform text-center select-none`}
                      onClick={() => showItemSelector && addItemToSlot(bankItem, index, bankIndex)}
                      disabled={!showItemSelector}
                    >
                      {bankItem.title}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Item Selector Dialog */}
      {showItemSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-md max-h-96 overflow-y-auto">
            <h2 className="text-lg font-bold mb-4 text-center">
              בחר פעילות עבור {selectedSlot?.day} בשעה {formatHour(selectedSlot?.hour)}
            </h2>
            {wordBanks.map((bank, bankIndex) => (
              bank.items.length > 0 && (
                <div key={bankIndex} className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">{bank.title}</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {bank.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        className={`${bank.color} text-white text-sm font-medium py-2 px-3 rounded cursor-pointer active:scale-95 transition-transform text-center`}
                        onClick={() => addItemToSlot(item, bankIndex, itemIndex)}
                      >
                        {item.title} ({item.duration}ש)
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
            <button
              className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded font-bold mt-4"
              onClick={() => {
                setShowItemSelector(false);
                setSelectedSlot(null);
              }}
            >
              ביטול
            </button>
          </div>
        </div>
      )}

      {/* New Topic Dialog */}
      {showNewTopicDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-xs text-center">
            <h2 className="text-lg font-bold mb-4">הוסף נושא חדש</h2>
            <div className="mb-2">
              <label className="block text-right text-sm mb-1">שם הנושא:</label>
              <input
                type="text"
                className="w-full border rounded p-2 text-sm"
                value={newTopic.title}
                onChange={e => setNewTopic({ ...newTopic, title: e.target.value })}
                placeholder="הכנס שם נושא"
              />
            </div>
            <div className="mb-2">
              <label className="block text-right text-sm mb-1">יום:</label>
              <select
                className="w-full border rounded p-2 text-sm"
                value={newTopic.day}
                onChange={e => setNewTopic({ ...newTopic, day: e.target.value })}
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-right text-sm mb-1">שעה (8-21.5):</label>
              <input
                type="number"
                min="8"
                max="21.5"
                step="0.5"
                className="w-full border rounded p-2 text-sm"
                value={newTopic.hour}
                onChange={e => setNewTopic({ ...newTopic, hour: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block text-right text-sm mb-1">משך (שעות):</label>
              <input
                type="number"
                min="0.5"
                max="14"
                step="0.5"
                className="w-full border rounded p-2 text-sm"
                value={newTopic.duration}
                onChange={e => setNewTopic({ ...newTopic, duration: e.target.value })}
              />
            </div>
            <div className="flex gap-2 justify-center">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded font-bold"
                onClick={handleAddNewTopic}
                disabled={!newTopic.title.trim()}
              >
                הוסף
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded font-bold"
                onClick={() => setShowNewTopicDialog(false)}
              >
                ביטול
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-8 bg-gray-100 border-b">
            <div className="p-1 sm:p-2 text-xs font-semibold text-gray-600 border-l">שעה</div>
            {days.map(day => (
              <div key={day} className="p-1 sm:p-2 text-xs font-semibold text-gray-600 text-center border-l first:border-l-0">
                {day}
              </div>
            ))}
          </div>

          {/* Time Rows */}
          {hours.map(hour => (
            <div key={hour} className="grid grid-cols-8 border-b last:border-b-0 min-h-[35px] sm:min-h-[40px]">
              <div className="p-1 sm:p-2 text-xs font-medium text-gray-500 border-l bg-gray-50 flex items-center">
                {formatHour(hour)}
              </div>

              {days.map(day => {
                const key = generateKey(day, hour);
                const items = calendarItems[key] || [];

                return (
                  <div
                    key={day}
                    className="border-l first:border-l-0 p-1 min-h-[35px] sm:min-h-[40px] hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => items.length === 0 && handleSlotClick(day, hour)}
                  >
                    <div className="space-y-1">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className={`${item.color} text-white text-xs font-medium py-1 px-1 sm:px-2 rounded flex items-center justify-between cursor-pointer hover:opacity-80`}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.day, item.hour, item.id);
                          }}
                        >
                          <span className="text-xs opacity-70">×</span>
                          <span className="truncate flex-1 text-right text-xs">{item.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-2 sm:mt-4 text-center">
        <p className="text-xs text-gray-500">
          הקש על משבצת ריקה להוספת פעילות • הקש על פעילות להסרה
        </p>
      </div>

      <div className="h-4"></div>
    </div>
  );
};

export default WeeklyCalendar;