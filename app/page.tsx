export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Educational Flowsheet Modeling Tool</h1>
      <p className="text-gray-600">
        An intelligent visual tool for copper and zinc processing flowsheets.
      </p>
      <a
        href="/flowsheet-tool"
        className="px-4 py-2 rounded-lg border hover:bg-gray-100"
      >
        Go to Flowsheet Tool
      </a>
    </main>
  );
}
