import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Team from "./Team";

const airports = {
  DEL: [28.5562, 77.1, "Indira Gandhi International Airport"],
  BOM: [19.0896, 72.8656, "Chhatrapati Shivaji Maharaj International Airport"],
  BLR: [13.1986, 77.7066, "Kempegowda International Airport"],
  HYD: [17.2403, 78.4294, "Rajiv Gandhi International Airport"],
  CCU: [22.6547, 88.4467, "Netaji Subhash Chandra Bose International Airport"],
  GOI: [15.38, 73.8312, "Goa International Airport"],
  AMD: [23.0732, 72.6347, "Sardar Vallabhbhai Patel International Airport"],
  COK: [10.1556, 76.391, "Cochin International Airport"],
  JAI: [26.8242, 75.8122, "Jaipur International Airport"],
  LKO: [26.7606, 80.8893, "Chaudhary Charan Singh International Airport"],
  IXC: [30.6735, 76.7885, "Chandigarh International Airport"],
  GAU: [26.1061, 91.5859, "Lokpriya Gopinath Bordoloi International Airport"],
  PAT: [25.5913, 85.0877, "Jay Prakash Narayan International Airport"],
  BBI: [20.2444, 85.8178, "Biju Patnaik International Airport"],
  IXB: [26.6812, 88.3286, "Bagdogra International Airport"],
  NAG: [21.0922, 79.0472, "Dr. Babasaheb Ambedkar International Airport"],
  UDR: [24.6177, 73.7415, "Maharana Pratap Airport"],
  IXR: [23.3143, 85.3214, "Birsa Munda Airport"],
  SXR: [34.0056, 74.3805, "Sheikh ul-Alam International Airport"],
  IXZ: [11.641, 92.7297, "Veer Savarkar International Airport"],
  VGA: [16.5304, 80.7968, "Vijayawada Airport"],
  IXM: [9.8345, 78.0934, "Madurai Airport"],
  TIR: [13.6325, 79.5434, "Tirupati Airport"],
  NDC: [19.1833, 77.3168, "Nanded Airport"],
  IDR: [22.7215, 75.8011, "Devi Ahilyabai Holkar Airport"],
  BHO: [23.2875, 77.3378, "Raja Bhoj Airport"],
  JLR: [23.1778, 80.052, "Jabalpur Airport"],
  RPR: [21.1804, 81.7388, "Swami Vivekananda Airport"],
  DIB: [27.4839, 95.0179, "Dibrugarh Airport"],
  IMF: [24.76, 93.8967, "Imphal Airport"],
  DMU: [25.8839, 93.7714, "Dimapur Airport"],
  AJL: [23.84, 92.6197, "Lengpui Airport"],
  SHL: [25.7023, 91.9787, "Shillong Airport"],
  IXS: [24.9104, 92.9787, "Silchar Airport"],
  IXA: [23.886, 91.2404, "Agartala Airport"],
  IXJ: [32.6886, 74.8379, "Jammu Airport"],
  DHM: [32.1651, 76.2634, "Kangra Airport"],
  DED: [30.1897, 78.1803, "Dehradun Airport"],
  GAY: [24.746, 84.9512, "Gaya Airport"],
  IXL: [34.1359, 77.5465, "Kushok Bakula Rimpochee Airport"],
  TCR: [8.7247, 78.0249, "Tuticorin Airport"],
  BHU: [21.7522, 72.1852, "Bhavnagar Airport"],
  BKB: [28.07, 73.2075, "Nal Airport"],
  RAJ: [22.3092, 70.7794, "Rajkot Airport"],
  JGA: [22.4655, 70.0111, "Jamnagar Airport"],
  PBD: [21.6487, 69.6573, "Porbandar Airport"],
  IXE: [12.9613, 74.8896, "Mangalore Airport"],
  HBX: [15.3617, 75.0849, "Hubli Airport"],
  TRV: [8.4821, 76.9204, "Trivandrum International Airport"],
  MAA: [12.9941, 80.1709, "Chennai International Airport"],
  VTZ: [17.7211, 83.2245, "Visakhapatnam Airport"],
  PNQ: [18.5822, 73.9197, "Pune Airport"],
  BDQ: [22.3362, 73.2264, "Vadodara Airport"],
  BHJ: [23.2875, 69.6701, "Bhuj Airport"],
  JDH: [26.2518, 73.0484, "Jodhpur Airport"],
};

function App() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [bestRoute, setBestRoute] = useState([]);
  const [allEdges, setAllEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAllEdges, setShowAllEdges] = useState(false);
  const [showSecondBest, setSecondBest] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5001", {
        start,
        end,
      });
      setBestRoute(response.data.best_route);
      setAllEdges(response.data.all_edges);
    } catch (error) {
      console.error("Error fetching route data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLatLon = (code) => {
    return [airports[code][0], airports[code][1]];
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <div className="Heading">
                <h1>Finding Best Route: Aerothon 6.0</h1>
              </div>
              <div className="Selection">
                <form onSubmit={handleSubmit}>
                  <label>Start Airport:</label>
                  <select
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                  >
                    <option value="">From</option>
                    {Object.keys(airports).map((code) => (
                      <option key={code} value={code}>
                        {airports[code][2]} ({code})
                      </option>
                    ))}
                  </select>
                  <div className="arrow">⇄</div>
                  <label>End Airport:</label>
                  <select value={end} onChange={(e) => setEnd(e.target.value)}>
                    <option value="">To</option>
                    {Object.keys(airports).map((code) => (
                      <option key={code} value={code}>
                        {airports[code][2]} ({code})
                      </option>
                    ))}
                  </select>
                  <button type="submit">Find Route</button>
                </form>
              </div>
              <div className="loader">
                {loading && (
                  <div className="loading-text">
                    Loading<span className="dots"></span>
                  </div>
                )}
              </div>
              <div className="btns">
                <div className="toggle-button">
                  <button
                    className="btns-button"
                    onClick={() => setShowAllEdges(!showAllEdges)}
                  >
                    {showAllEdges ? "Hide Route" : "Show Route"}
                  </button>
                </div>
                <div className="toggle-button">
                  <button
                    className="btns-button"
                    onClick={() => setSecondBest(!showSecondBest)}
                  >
                    {showSecondBest ? "Hide Alternate" : "Show Alternate"}
                  </button>
                </div>
              </div>
              {!showSecondBest && (
                <div id="routeResult">
                  <h2>Best Route</h2>
                  {bestRoute.length > 0 && (
                    <ul>
                      {bestRoute.map((airportInfo, index) => (
                        <li key={index}>
                          <h3>
                            {airportInfo.name} ({airportInfo.airport})
                          </h3>
                          <p>{airportInfo.description}</p>
                          <p>Weather: {airportInfo.weather.description}</p>
                          <p>
                            Wind Speed: {airportInfo.weather.wind_speed} m/s
                          </p>
                          <p>Wind Direction: {airportInfo.weather.wind_deg}°</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {showSecondBest && (
                <div id="routeResult">
                  <h2>Second Best Route</h2>
                  {bestRoute.length > 0 && (
                    <ul>
                      {bestRoute.map((airportInfo, index) => (
                        <li key={index}>
                          <h3>
                            {airportInfo.name} ({airportInfo.airport})
                          </h3>
                          <p>{airportInfo.description}</p>
                          <p>Weather: {airportInfo.weather.description}</p>
                          <p>
                            Wind Speed: {airportInfo.weather.wind_speed} m/s
                          </p>
                          <p>Wind Direction: {airportInfo.weather.wind_deg}°</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
              {bestRoute.length > 0 && (
                <MapContainer
                  center={[20.5937, 78.9629]}
                  zoom={5}
                  style={{ height: "500px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {showAllEdges &&
                    allEdges.map(([startCode, endCode], index) => (
                      <Polyline
                        key={index}
                        positions={[getLatLon(startCode), getLatLon(endCode)]}
                        color="red"
                        weight={1}
                      />
                    ))}
                  {showSecondBest &&
                    second_best_route.map(([startCode, endCode], index) => (
                      <Polyline
                        key={index}
                        positions={[getLatLon(startCode), getLatLon(endCode)]}
                        color="green"
                        weight={1}
                      />
                    ))}
                  <Polyline
                    positions={bestRoute.map((airportInfo) => [
                      airportInfo.lat,
                      airportInfo.lon,
                    ])}
                    color="blue"
                  />
                </MapContainer>
              )}
            </div>
          }
        />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}

export default App;
