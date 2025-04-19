
import React, { useEffect, useState } from "react";
import { MapPin, Star, PlugZap, Search, Filter, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ChargingStationApp() {
  const [stations, setStations] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      const mockData = [
        {
          id: 1,
          name: "EVgo - Main Street",
          provider: "EVgo",
          speed: "Fast",
          connectors: ["CCS", "CHAdeMO"],
          rating: 4.5,
          location: "123 Main St, Dallas, TX",
          availability: "Available",
        },
        {
          id: 2,
          name: "Tesla Supercharger - Uptown",
          provider: "Tesla",
          speed: "Superfast",
          connectors: ["NACS"],
          rating: 4.8,
          location: "456 Uptown Ave, Dallas, TX",
          availability: "Busy",
        },
        {
          id: 3,
          name: "ChargePoint - Central Mall",
          provider: "ChargePoint",
          speed: "Mixed",
          connectors: ["CCS", "CHAdeMO", "J1772"],
          rating: 4.2,
          location: "789 Central Blvd, Dallas, TX",
          availability: "Available",
        },
      ];
      setStations(mockData);
      setFilteredStations(mockData);
    };
    fetchStations();
  }, []);

  const handleSearch = () => {
    const results = stations.filter((station) =>
      station.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStations(results);
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen p-4" : "p-4 min-h-screen bg-white text-black"}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">🔌 EV Charging Station Locator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <Moon className="h-4 w-4" /> {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="flex gap-2 mb-6">
          <input
            placeholder="Search by station or provider..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Search className="h-4 w-4" /> Search
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-200 dark:hover:bg-gray-800">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStations.map((station) => (
            <motion.div
              key={station.id}
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer border p-4 rounded shadow-sm dark:bg-gray-800"
            >
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <PlugZap className="text-green-600" /> {station.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">{station.provider}</p>
              <p className="mt-2 text-sm">
                <strong>Speed:</strong> {station.speed}
              </p>
              <p className="text-sm">
                <strong>Connectors:</strong> {station.connectors.join(", ")}
              </p>
              <p className="text-sm">
                <strong>Status:</strong> {station.availability}
              </p>
              <p className="text-sm flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {station.location}
              </p>
              <div className="mt-2 flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4" /> {station.rating} / 5
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
