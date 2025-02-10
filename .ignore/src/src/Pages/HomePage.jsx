// src/pages/HomePage.jsx

import Navbar from '../components/layout/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to CHATR0N</h1>
        {/* Add your home page content here */}
      </main>
    </div>
  );
}