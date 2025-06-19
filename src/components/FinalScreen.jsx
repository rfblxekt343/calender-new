import owlImg from '../media/owl.png';
export default function FinalScreen() {
  return (
    <div dir="rtl" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center animate-fade-in">
        <h1 className="text-4xl font-bold mb-4 text-yellow-600">השלמת את הלומדה בהצלחה!</h1>
        <p className="text-lg text-gray-700 mb-6">ניתן לחזור ולהתנסות שוב</p>
        <p className="text-lg text-gray-700 mb-6">תודה</p>
        <p className="text-lg text-gray-700 mb-6">מדור טי"ל
            <img src={owlImg} alt="Logo" className="inline-block w-24 h-24 rounded-full" />
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-bold rounded-lg shadow-lg transition text-lg"
        >
          חזור להתחלה
        </button>
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
}