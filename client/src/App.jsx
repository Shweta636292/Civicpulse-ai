
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const API = "http://localhost:5000/api/reports";

function App() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState("Loading CivicPulse AI...");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Road",
    location: ""
  });

  const [trackingId, setTrackingId] = useState("");
  const [trackedReport, setTrackedReport] = useState(null);
  const [trackingError, setTrackingError] = useState("");

  // Fetch all complaints
  const fetchReports = async () => {
    try {
      const response = await axios.get(API);
      setReports(response.data.reports || []);
      setMessage("");
    } catch (error) {
      console.error("Fetch error:", error);
      setMessage("Backend connection failed. Start server on port 5000.");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Submit complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(API, form);

      setResult(response.data.report);

      setForm({
        title: "",
        description: "",
        category: "Road",
        location: ""
      });

      await fetchReports();

    } catch (error) {
      console.error("Submission error:", error);

      alert(
        error.response?.data?.message ||
        "Complaint submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/${id}/status`, { status });

      await fetchReports();

      if (trackedReport?.id === id) {
        setTrackedReport({
          ...trackedReport,
          status
        });
      }

    } catch (error) {
      console.error("Status update error:", error);
      alert("Status update failed.");
    }
  };

  // Track complaint
  const trackComplaint = (e) => {
    e.preventDefault();

    setTrackedReport(null);
    setTrackingError("");

    const found = reports.find(
      report => report.id === trackingId.trim()
    );

    if (found) {
      setTrackedReport(found);
    } else {
      setTrackingError(
        "Complaint not found. Check your Tracking ID."
      );
    }
  };

  // Hotspot intelligence
  const hotspots = Object.values(
    reports.reduce((groups, report) => {
      const location = (report.location || "").trim().toLowerCase();

      if (!location) return groups;

      if (!groups[location]) {
        groups[location] = {
          location: report.location,
          count: 0,
          highPriority: 0,
          categories: {}
        };
      }

      groups[location].count++;

      if (
        report.priority === "High" ||
        report.priority === "Critical"
      ) {
        groups[location].highPriority++;
      }

      const category = report.category || "Other";

      groups[location].categories[category] =
        (groups[location].categories[category] || 0) + 1;

      return groups;
    }, {})
  ).sort((a, b) => b.count - a.count);

  // Dashboard statistics
  const criticalReports = reports.filter(
    report =>
      report.priority === "Critical" ||
      report.priority === "High"
  ).length;

  const resolvedReports = reports.filter(
    report => report.status === "Resolved"
  ).length;

  const activeReports = reports.filter(
    report => report.status !== "Resolved"
  ).length;

  // City-level map grouping
  const mysuruReports = reports.filter(report =>
    report.location?.toLowerCase().includes("mysuru")
  );

  const otherLocationReports = reports.filter(report =>
    !report.location?.toLowerCase().includes("mysuru")
  );

  return (
    <div className="app">

      {/* HEADER */}
      <header>
        <h1>🌍 CivicPulse AI</h1>
        <p>From Complaints to Intelligent Civic Action</p>
      </header>

      <main>

        {/* COMPLAINT FORM */}
        <section className="form-card">
          <h2>Report a Civic Issue</h2>
          <p>Help make your community safer and better.</p>

          <form onSubmit={handleSubmit}>
            <label>Complaint Title</label>

            <input
              required
              placeholder="Enter complaint title"
              value={form.title}
              onChange={e =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <label>Description</label>

            <textarea
              required
              placeholder="Describe the civic problem..."
              value={form.description}
              onChange={e =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <label>Category</label>

            <select
              value={form.category}
              onChange={e =>
                setForm({ ...form, category: e.target.value })
              }
            >
              <option>Road</option>
              <option>Water</option>
              <option>Waste</option>
              <option>Electricity</option>
              <option>Drainage</option>
              <option>Public Safety</option>
              <option>Other</option>
            </select>

            <label>Location</label>

            <input
              required
              placeholder="Enter area or address"
              value={form.location}
              onChange={e =>
                setForm({ ...form, location: e.target.value })
              }
            />

            <button type="submit" disabled={loading}>
              {loading
                ? "AI Analyzing Complaint..."
                : "Submit Complaint"}
            </button>
          </form>
        </section>

        {/* AI ANALYSIS */}
        {result && (
          <section className="result-card">
            <h2>✨ AI Complaint Intelligence</h2>

            <p><strong>Tracking ID:</strong> {result.id}</p>
            <p><strong>Category:</strong> {result.category}</p>
            <p><strong>Priority:</strong> {result.priority}</p>
            <p>
              <strong>Priority Score:</strong>{" "}
              {result.priorityScore ?? "Not available"}
            </p>
            <p><strong>Status:</strong> {result.status}</p>

            {result.aiAnalysis && (
              <>
                <p>
                  <strong>AI Summary:</strong>{" "}
                  {result.aiAnalysis.summary}
                </p>

                <p>
                  <strong>Severity:</strong>{" "}
                  {result.aiAnalysis.severity}
                </p>

                <p>
                  <strong>Reasoning:</strong>{" "}
                  {result.aiAnalysis.reasoning}
                </p>

                <p>
                  <strong>Safety Risk:</strong>{" "}
                  {result.aiAnalysis.safetyRisk}
                </p>

                <p>
                  <strong>Recommended Action:</strong>{" "}
                  {result.aiAnalysis.recommendedAction}
                </p>
              </>
            )}

            <p>
              <strong>Possible Duplicate:</strong>{" "}
              {result.isDuplicate ? "Yes" : "No"}
            </p>

            {result.duplicateOf && (
              <p>
                <strong>Original Complaint ID:</strong>{" "}
                {result.duplicateOf}
              </p>
            )}
          </section>
        )}

        {/* CITIZEN TRACKING */}
        <section className="result-card">
          <h2>🔎 Track Your Complaint</h2>
          <p>Enter your Tracking ID to check complaint progress.</p>

          <form onSubmit={trackComplaint}>
            <label>Tracking ID</label>

            <input
              required
              value={trackingId}
              placeholder="Enter complaint ID"
              onChange={e => setTrackingId(e.target.value)}
            />

            <button type="submit">Track Complaint</button>
          </form>

          {trackingError && (
            <p className="error">{trackingError}</p>
          )}

          {trackedReport && (
            <div className="report-item">
              <h3>{trackedReport.title}</h3>
              <p>Category: {trackedReport.category}</p>
              <p>Location: {trackedReport.location}</p>
              <p>Priority: {trackedReport.priority}</p>
              <p>Status: {trackedReport.status}</p>
              <p>Tracking ID: {trackedReport.id}</p>
            </div>
          )}
        </section>

        {/* ADMIN DASHBOARD */}
        <section className="result-card">
          <h2>📊 Admin Dashboard</h2>

          <button onClick={fetchReports}>
            Refresh Dashboard
          </button>

          {message && <p>{message}</p>}

          <div className="stats-grid">
            <div className="stat-card">
              <h3>{reports.length}</h3>
              <p>Total Complaints</p>
            </div>

            <div className="stat-card">
              <h3>{criticalReports}</h3>
              <p>High/Critical Priority</p>
            </div>

            <div className="stat-card">
              <h3>{activeReports}</h3>
              <p>Active Complaints</p>
            </div>

            <div className="stat-card">
              <h3>{resolvedReports}</h3>
              <p>Resolved Complaints</p>
            </div>
          </div>

          <h2>All Citizen Reports</h2>

          {reports.length === 0 && (
            <p>No complaints submitted yet.</p>
          )}

          {reports.map(report => (
            <div className="report-item" key={report.id}>
              <h3>{report.title}</h3>

              <p>Category: {report.category}</p>
              <p>Location: {report.location}</p>
              <p>Priority: {report.priority}</p>
              <p>Priority Score: {report.priorityScore ?? "Not available"}</p>
              <p>Duplicate: {report.isDuplicate ? "Yes" : "No"}</p>
              <p>Status: {report.status}</p>
              <p>Tracking ID: {report.id}</p>

              <label>Update Complaint Status</label>

              <select
                value={report.status}
                onChange={e =>
                  updateStatus(report.id, e.target.value)
                }
              >
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          ))}
        </section>

        {/* HOTSPOT INTELLIGENCE */}
        <section className="result-card">
          <h2>📍 Civic Hotspot Intelligence</h2>

          <p>
            Identify locations with repeated civic complaints.
          </p>

          {hotspots.length === 0 ? (
            <p>No hotspot data available yet.</p>
          ) : (
            hotspots.map(spot => {
              const topCategory = Object.entries(
                spot.categories
              ).sort((a, b) => b[1] - a[1])[0];

              return (
                <div className="hotspot-card" key={spot.location}>
                  <h3>📍 {spot.location}</h3>

                  <p>Total Complaints: {spot.count}</p>
                  <p>High/Critical Complaints: {spot.highPriority}</p>

                  <p>
                    Most Reported Issue:{" "}
                    {topCategory?.[0] || "Other"}
                  </p>

                  <p>
                    Recommended Attention:{" "}
                    {spot.highPriority > 0
                      ? "Urgent review recommended"
                      : spot.count >= 3
                      ? "Repeated issue - investigate area"
                      : "Continue monitoring"}
                  </p>

                  <div className="hotspot-bar">
                    <div
                      className="hotspot-progress"
                      style={{
                        width: `${
                          reports.length
                            ? Math.min(
                                (spot.count / reports.length) * 100,
                                100
                              )
                            : 0
                        }%`
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* INTERACTIVE MAP */}
        <section className="result-card">
          <h2>🗺️ Civic Issue Map</h2>

          <p>
            Approximate city-level complaint locations.
            Exact GPS coordinates are not currently collected.
          </p>

          <div style={{ margin: "15px 0" }}>
            <h3>Mysuru Complaint Summary</h3>

            <p>Total complaints: {mysuruReports.length}</p>

            <p>
              High/Critical complaints:{" "}
              {
                mysuruReports.filter(report =>
                  report.priority === "High" ||
                  report.priority === "Critical"
                ).length
              }
            </p>
          </div>

          <MapContainer
            center={[12.2958, 76.6394]}
            zoom={12}
            style={{
              height: "400px",
              width: "100%",
              borderRadius: "12px",
              marginTop: "20px"
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mysuruReports.length > 0 && (
              <Marker position={[12.2958, 76.6394]}>
                <Popup>
                  <div>
                    <h3>Mysuru Civic Complaints</h3>

                    {mysuruReports.map(report => (
                      <div
                        key={report.id}
                        style={{
                          borderBottom: "1px solid #ccc",
                          padding: "8px 0"
                        }}
                      >
                        <strong>{report.title}</strong>

                        <p>Category: {report.category}</p>
                        <p>Priority: {report.priority}</p>
                        <p>Status: {report.status}</p>

                        <p>
                          Duplicate:{" "}
                          {report.isDuplicate ? "Yes" : "No"}
                        </p>

                        <small>
                          Tracking ID: {report.id}
                        </small>
                      </div>
                    ))}

                    <p>
                      <strong>Note:</strong> This is an approximate
                      city-centre marker, not the exact complaint location.
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>

          {mysuruReports.length === 0 && (
            <p>No Mysuru complaints available to display.</p>
          )}

          {otherLocationReports.length > 0 && (
            <p style={{ marginTop: "12px" }}>
              {otherLocationReports.length} complaints from other
              locations are not yet mapped.
            </p>
          )}
        </section>

      </main>
    </div>
  );
}

export default App;
