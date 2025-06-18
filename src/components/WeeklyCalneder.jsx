import React, { useState } from 'react';

const WeeklyCalendar = () => {
  const [calendarItems, setCalendarItems] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);

  const days = ['א', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳']; // Mon-Sun in Hebrew
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM
  
  const wordBank = [
    { text: 'פגישה', color: 'bg-blue-500' },
    { text: 'אימון', color: 'bg-green-500' },
    { text: 'לימוד', color: 'bg-purple-500' },
    { text: 'קניות', color: 'bg-pink-500' },
    { text: 'שיחה', color: 'bg-yellow-500' },
    { text: 'רופא', color: 'bg-red-500' },
    { text: 'ארוחה', color: 'bg-orange-500' },
    { text: 'נסיעה', color: 'bg-indigo-500' },
    { text: 'סרט', color: 'bg-teal-500' },
    { text: 'ניקיון', color: 'bg-gray-500' },
    { text: 'בישול', color: 'bg-amber-500' },
    { text: 'הליכה', color: 'bg-lime-500' },
    { text: 'קריאה', color: 'bg-cyan-500' },
    { text: 'שינה', color: 'bg-slate-500' },
    { text: 'מסיבה', color: 'bg-fuchsia-500' },
    { text: 'עבודה', color: 'bg-blue-600' },
    { text: 'מנוחה', color: 'bg-emerald-500' },
    { text: 'דייט', color: 'bg-rose-500' }
  ];

  const formatHour = (hour) => {
    if (hour === 12) return '12:00';
    if (hour > 12) return `${hour - 12}:00`;
    return `${hour}:00`;
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
      const key = `${day}-${hour}`;
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
    const key = `${day}-${hour}`;
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
          {wordBank.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className={`${item.color} text-white text-xs font-medium py-1 px-2 rounded cursor-move active:scale-95 transition-transform text-center select-none`}
            >
              {item.text}
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
          <div key={hour} className="grid grid-cols-8 border-b last:border-b-0 min-h-[60px]">
            {/* Time Column */}
            <div className="p-2 text-xs font-medium text-gray-500 border-l bg-gray-50 flex items-start">
              {formatHour(hour)}
            </div>
            
            {/* Day Columns */}
            {days.map(day => {
              const key = `${day}-${hour}`;
              const items = calendarItems[key] || [];
              
              return (
                <div
                  key={day}
                  className="border-l first:border-l-0 p-1 min-h-[60px] hover:bg-gray-50 transition-colors"
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
                        <span className="truncate flex-1 text-right">{item.text}</span>
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