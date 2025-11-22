export default function Home() {
  return (
    <div className="relative w-full h-screen text-center text-white">
      <img
        src="/images/bg_photo.jpg"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="p-6 rounded-xl">
          <h1 className="text-4xl font-bold">Welcome to Sushi Island in Queens</h1>
          <p className="mt-2 text-lg">Affordable food, cozy atmosphere</p>
        </div>
      </div>
    </div>
  );
}
