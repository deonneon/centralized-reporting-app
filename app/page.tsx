import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-blue-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Executive Reporting Hub</h1>
        <p className="text-xl mb-8">
          Streamline your reporting process and make data-driven decisions
        </p>
        <Link
          href="/request"
          className="px-8 py-3 bg-white text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300"
        >
          Get Started
        </Link>
      </header>

      <main className="container mx-auto py-16">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-800 p-6 rounded shadow-md text-gray-100">
            <h2 className="text-2xl font-bold mb-4">Centralized Reporting</h2>
            <p>
              Access all your reports in one place, saving time and improving
              efficiency.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow-md text-gray-100">
            <h2 className="text-2xl font-bold mb-4">Real-time Updates</h2>
            <p>
              Stay informed with live status updates on your report requests.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow-md text-gray-100">
            <h2 className="text-2xl font-bold mb-4">Data Visualization</h2>
            <p>Gain insights quickly with our interactive charts and graphs.</p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to streamline your reporting process?
          </h2>
          <div className="space-x-4">
            <Link
              href="/request"
              className="px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300"
            >
              Submit a New Request
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-green-500 text-white rounded shadow hover:bg-green-600 transition duration-300"
            >
              View Dashboard
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>
          &copy; {new Date().getFullYear()} Executive Reporting Hub. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
