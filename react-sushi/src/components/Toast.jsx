export default function Toast({ message, show }) {
  return (
    <div className={`fixed right-5 bottom-24 bg-gray-800 text-white px-4 py-2 rounded shadow-lg transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      {message}
    </div>
  );
}
