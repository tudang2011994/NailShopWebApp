export default function Navbar() {
    return (
      <nav className="flex justify-between items-center py-4 px-8 bg-cream text-black">
        <ul className="flex space-x-6">
          <li>BOOKING</li>
          <li>OUR SERVICES</li>
          <li>ABOUT US</li>
        </ul>
        <h1 className="text-2xl font-bold">Bee You Nail & Spa</h1>
        <button className="border px-4 py-2 rounded-lg">BOOK APPOINTMENT</button>
      </nav>
    );
  }
  