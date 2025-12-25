export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-center px-4">

      <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

      <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-700">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        The page you're looking for doesn’t exist.
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}