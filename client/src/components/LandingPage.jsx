import React from "react";
import { Icon } from "./Icons.jsx";
import "../styles/landing.css";

export function LandingPage({ onNavigate, reports = [] }) {
  // Compute real metrics from live API data
  const totalCount = reports.length;
  const criticalCount = reports.filter(
    (r) => r.priority === "Critical" || r.priority === "High"
  ).length;
  const resolvedCount = reports.filter((r) => r.status === "Resolved").length;
  const duplicateCount = reports.filter((r) => r.isDuplicate).length;

  const categories = [
    {
      id: "Road",
      name: "Road Infrastructure",
      icon: "road",
      desc: "Potholes, cratered pavement, broken street signs, damaged asphalt."
    },
    {
      id: "Water",
      name: "Water Supply",
      icon: "water",
      desc: "Burst pipelines, continuous drinking water leaks, contaminated supply."
    },
    {
      id: "Waste",
      name: "Waste Management",
      icon: "waste",
      desc: "Overflowing garbage dumps, uncollected municipal waste, hazardous disposal."
    },
    {
      id: "Electricity",
      name: "Power & Lighting",
      icon: "electricity",
      desc: "Fallen transmission wires, sparking transformers, dark streetlights."
    },
    {
      id: "Drainage",
      name: "Storm Drainage",
      icon: "drainage",
      desc: "Blocked culverts, sewage overflow, monsoon waterlogging risks."
    },
    {
      id: "Public Safety",
      name: "Public Safety",
      icon: "safety",
      desc: "Open manholes, missing safety barriers, hazardous public spots."
    }
  ];

  return (
    <div className="landing-container">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-pill-badge">
            <span className="pulse-dot online" />
            <span>AI-POWERED CIVIC COMMAND PLATFORM</span>
          </div>

          <h1 className="hero-headline">
            Turning Civic Complaints Into{" "}
            <span className="gradient-text">Intelligent Action.</span>
          </h1>

          <p className="hero-description">
            CivicPulse AI transforms how citizens and smart cities resolve
            public infrastructure failures. Powered by Gemini AI, our engine
            understands urgency, detects duplicate issues, predicts hotspots,
            and automates municipal triage with complete transparency.
          </p>

          <div className="hero-cta-group">
            <button
              onClick={() => onNavigate("report")}
              className="btn-primary"
            >
              <Icon name="activity" size={17} />
              <span>Report an Issue</span>
            </button>

            <button
              onClick={() => onNavigate("dashboard")}
              className="btn-secondary"
            >
              <Icon name="shield" size={17} color="var(--cyan-neon)" />
              <span>Explore Command Center</span>
            </button>

            <button
              onClick={() => onNavigate("track")}
              className="btn-secondary"
            >
              <Icon name="search" size={17} />
              <span>Track Complaint</span>
            </button>
          </div>

          {/* Real Live Backend Metrics Strip */}
          <div className="hero-metrics-strip">
            <div className="hero-metric-item">
              <span className="hero-metric-val">{totalCount}</span>
              <span className="hero-metric-label">Active Reports</span>
            </div>
            <div className="hero-metric-item">
              <span
                className="hero-metric-val"
                style={{ color: "var(--status-critical)" }}
              >
                {criticalCount}
              </span>
              <span className="hero-metric-label">High / Critical Urgency</span>
            </div>
            <div className="hero-metric-item">
              <span
                className="hero-metric-val"
                style={{ color: "var(--violet-400)" }}
              >
                {duplicateCount}
              </span>
              <span className="hero-metric-label">Duplicates Suppressed</span>
            </div>
            <div className="hero-metric-item">
              <span
                className="hero-metric-val"
                style={{ color: "var(--status-low)" }}
              >
                {resolvedCount}
              </span>
              <span className="hero-metric-label">Resolved Issues</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive AI Preview Card */}
        <div className="hero-preview-card">
          <div className="hero-preview-header">
            <span className="hero-preview-title">
              <Icon name="brain" size={16} /> LIVE GEMINI ASSESSMENT PIPELINE
            </span>
            <span className="badge badge-cyan">MODEL: FLASH</span>
          </div>

          <div className="hero-ai-sample">
            <div className="sample-complaint-box">
              <div className="sample-label">Citizen Complaint Input</div>
              <div className="sample-text">
                "Major water pipeline fractured near Main Market. Clean water
                flooding the entire road, causing severe traffic blockade."
              </div>
            </div>

            <div className="sample-ai-diagnosis">
              <div className="diagnosis-badge-item">
                <span className="diagnosis-key">AI Detected Domain</span>
                <span className="diagnosis-val" style={{ color: "var(--cyan-neon)" }}>
                  <Icon name="water" size={14} /> Water Infrastructure
                </span>
              </div>
              <div className="diagnosis-badge-item">
                <span className="diagnosis-key">Calculated Priority</span>
                <span className="diagnosis-val" style={{ color: "var(--status-high)" }}>
                  <Icon name="alertTriangle" size={14} /> High (Score 65/100)
                </span>
              </div>
              <div className="diagnosis-badge-item">
                <span className="diagnosis-key">Public Impact</span>
                <span className="diagnosis-val">High (Road blocked)</span>
              </div>
              <div className="diagnosis-badge-item">
                <span className="diagnosis-key">Safety Hazard</span>
                <span className="diagnosis-val">Medium (Slippery road)</span>
              </div>
            </div>

            <div className="hero-action-rec">
              <strong>Municipal Advisory:</strong> Dispatch water supply repair
              crew and isolate feeder valve; coordinate with local traffic
              enforcement.
            </div>
          </div>
        </div>
      </section>

      {/* ================= 1. HOW IT WORKS ================= */}
      <section className="pipeline-section">
        <div className="section-header">
          <span className="section-tag">ENGINEERING WORKFLOW</span>
          <h2 className="section-title">How CivicPulse AI Works</h2>
          <p className="section-subtitle">
            An end-to-end intelligent pipeline taking civic issues from citizen
            reports to verified field execution.
          </p>
        </div>

        <div className="pipeline-grid">
          <div className="pipeline-card">
            <span className="pipeline-step-num">01</span>
            <div className="pipeline-icon-wrap">
              <Icon name="activity" size={24} />
            </div>
            <h3 className="pipeline-title">Citizen Submission</h3>
            <p className="pipeline-desc">
              Citizens submit plain-text complaints with location details
              without needing technical municipal taxonomy knowledge.
            </p>
          </div>

          <div className="pipeline-card">
            <span className="pipeline-step-num">02</span>
            <div className="pipeline-icon-wrap">
              <Icon name="brain" size={24} />
            </div>
            <h3 className="pipeline-title">Gemini Semantic Analysis</h3>
            <p className="pipeline-desc">
              Google Gemini evaluates underlying root causes, generates concise
              summaries, and quantifies severity and public hazard.
            </p>
          </div>

          <div className="pipeline-card">
            <span className="pipeline-step-num">03</span>
            <div className="pipeline-icon-wrap">
              <Icon name="shield" size={24} />
            </div>
            <h3 className="pipeline-title">Priority & Deduplication</h3>
            <p className="pipeline-desc">
              Algorithmic scoring ranks urgency from 0 to 100 while token
              similarity clusters repeated complaints to prevent backlog spikes.
            </p>
          </div>

          <div className="pipeline-card">
            <span className="pipeline-step-num">04</span>
            <div className="pipeline-icon-wrap">
              <Icon name="barChart" size={24} />
            </div>
            <h3 className="pipeline-title">Triage & Transparent Tracking</h3>
            <p className="pipeline-desc">
              City dispatchers resolve issues across a 4-phase status timeline
              accessible to citizens in real-time with their Tracking ID.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 2. AI INTELLIGENCE ================= */}
      <section className="ai-showcase-section">
        <div className="ai-architecture-card">
          <div className="ai-arch-left">
            <span className="ai-arch-pill">
              <Icon name="brain" size={14} /> EXPLAINABLE AI DIAGNOSTICS
            </span>
            <h2 style={{ fontSize: "2rem", color: "#fff", lineHeight: 1.25 }}>
              Precision Intelligence, Not Generic Summaries
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
              Standard complaint portals overwhelm staff with unstructured
              text. CivicPulse AI standardizes incoming data into structured
              triage vectors.
            </p>

            <div className="ai-feature-list">
              <div className="ai-feature-row">
                <div className="ai-feature-bullet">
                  <Icon name="check" size={13} />
                </div>
                <div className="ai-feature-text">
                  <h4>Category Cross-Verification</h4>
                  <p>
                    Corrects citizen mismatches (e.g. reporting water pipeline
                    breaks under Roads).
                  </p>
                </div>
              </div>

              <div className="ai-feature-row">
                <div className="ai-feature-bullet">
                  <Icon name="check" size={13} />
                </div>
                <div className="ai-feature-text">
                  <h4>Duplicate Detection with Similarity Scoring</h4>
                  <p>
                    Evaluates normalized word tokens to group complaints from the
                    same neighborhood.
                  </p>
                </div>
              </div>

              <div className="ai-feature-row">
                <div className="ai-feature-bullet">
                  <Icon name="check" size={13} />
                </div>
                <div className="ai-feature-text">
                  <h4>Safety Risk & Population Impact Modeling</h4>
                  <p>
                    Weights complaints threatening public safety higher than
                    cosmetic issues.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="ai-formula-box">
            <div className="formula-header">
              <span className="formula-title">PRIORITY SCORING ALGORITHM</span>
              <span className="badge badge-cyan">0 - 100 SCALE</span>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Complaints are scored algorithmically using multi-parameter
              weights derived from Gemini analysis:
            </p>

            <div className="formula-weights">
              <div className="weight-item">
                <div className="weight-val">50 pts</div>
                <div className="weight-lbl">Severity Weight</div>
              </div>
              <div className="weight-item">
                <div className="weight-val">25 pts</div>
                <div className="weight-lbl">Safety Risk</div>
              </div>
              <div className="weight-item">
                <div className="weight-val">25 pts</div>
                <div className="weight-lbl">Public Impact</div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(16, 25, 48, 0.7)",
                padding: "0.85rem",
                borderRadius: "8px",
                borderLeft: "3px solid var(--cyan-neon)",
                fontSize: "0.8rem",
                color: "#e2e8f0"
              }}
            >
              <strong>Threshold Logic:</strong> Score $\ge$ 80 $\rightarrow$ Critical,
              $\ge$ 60 $\rightarrow$ High, $\ge$ 30 $\rightarrow$ Medium, &lt; 30 $\rightarrow$ Low.
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. CIVIC CATEGORIES ================= */}
      <section className="categories-section">
        <div className="section-header">
          <span className="section-tag">SUPPORTED DOMAINS</span>
          <h2 className="section-title">Civic Issue Classification</h2>
          <p className="section-subtitle">
            Trained and structured to handle major municipal public service
            sectors.
          </p>
        </div>

        <div className="categories-grid">
          {categories.map((cat) => {
            const count = reports.filter((r) => r.category === cat.id).length;
            return (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => onNavigate("report")}
              >
                <div className="cat-card-top">
                  <div className="cat-icon-wrap">
                    <Icon name={cat.icon} size={22} />
                  </div>
                  <span className="cat-count-badge">
                    {count} {count === 1 ? "report" : "reports"}
                  </span>
                </div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-desc">{cat.desc}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 4. TRACKING & HOTSPOTS ================= */}
      <section className="dual-features-section">
        <div className="dual-feature-grid">
          {/* Transparent Tracking */}
          <div className="feature-box">
            <h3>
              <Icon name="search" size={24} color="var(--cyan-neon)" />
              Transparent Citizen Tracking
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
              Every complaint generates a unique cryptographic Tracking ID.
              Citizens can inspect exact administrative status updates without
              visiting government offices.
            </p>

            <div className="timeline-stepper" style={{ margin: "1.25rem 0" }}>
              <div className="timeline-bar-bg" />
              <div className="timeline-bar-fill" style={{ width: "66%" }} />
              <div className="timeline-step completed">
                <div className="timeline-dot">✓</div>
                <span className="timeline-label">Submitted</span>
              </div>
              <div className="timeline-step completed">
                <div className="timeline-dot">✓</div>
                <span className="timeline-label">Under Review</span>
              </div>
              <div className="timeline-step active">
                <div className="timeline-dot">3</div>
                <span className="timeline-label">In Progress</span>
              </div>
              <div className="timeline-step">
                <div className="timeline-dot">4</div>
                <span className="timeline-label">Resolved</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate("track")}
              className="btn-secondary"
              style={{ width: "fit-content" }}
            >
              <span>Track Existing Complaint</span>
              <Icon name="arrowRight" size={15} />
            </button>
          </div>

          {/* Smart Hotspot Detection */}
          <div className="feature-box">
            <h3>
              <Icon name="mapPin" size={24} color="var(--violet-400)" />
              Smart Hotspot Detection
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem" }}>
              Isolated reports often indicate widespread underground
              infrastructure degradation. CivicPulse AI aggregates location
              patterns to pinpoint recurring failure zones.
            </p>

            <div
              style={{
                background: "rgba(13, 20, 38, 0.8)",
                padding: "1.25rem",
                borderRadius: "10px",
                border: "1px solid rgba(56, 189, 248, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.85rem"
                }}
              >
                <span style={{ color: "var(--cyan-neon)", fontWeight: 600 }}>
                  📍 Mysuru Municipal Zone
                </span>
                <span className="badge badge-medium">Repeated Hotspot</span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                Multiple water infrastructure failures detected. Urgent review
                recommended before road erosion spreads.
              </p>
            </div>

            <button
              onClick={() => onNavigate("map")}
              className="btn-secondary"
              style={{ width: "fit-content" }}
            >
              <span>View Interactive Hotspot Map</span>
              <Icon name="arrowRight" size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div className="brand-logo-hex" style={{ width: 34, height: 34 }}>
                <Icon name="activity" size={18} color="var(--cyan-neon)" />
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: 800 }}>
                CivicPulse <span className="brand-accent">AI</span>
              </span>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Next-generation civic intelligence command platform. Transforming
              citizen complaints into prioritized, accountable smart-city action.
            </p>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">CITIZEN PORTAL</span>
            <button
              className="footer-link"
              onClick={() => onNavigate("report")}
            >
              Report an Issue
            </button>
            <button className="footer-link" onClick={() => onNavigate("track")}>
              Track Complaint Status
            </button>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-title">COMMAND CENTER</span>
            <button
              className="footer-link"
              onClick={() => onNavigate("dashboard")}
            >
              Executive Dashboard
            </button>
            <button
              className="footer-link"
              onClick={() => onNavigate("complaints")}
            >
              Complaints Management
            </button>
            <button className="footer-link" onClick={() => onNavigate("map")}>
              Civic Hotspot Map
            </button>
            <button
              className="footer-link"
              onClick={() => onNavigate("analytics")}
            >
              Analytics & Insights
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <span>CivicPulse AI — National Level Hackathon Demonstration Prototype</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>
            Powered by React 19 • Express.js • Google Gemini AI • Leaflet
          </span>
        </div>
      </footer>
    </div>
  );
}
