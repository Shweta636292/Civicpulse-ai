
import React, { useState, useEffect } from "react";
import { Icon } from "./Icons.jsx";

export function Navbar({
  activeTab,
  setActiveTab,
  backendConnected = true,
  reportsCount = 0,
  criticalCount = 0,
  onRefresh
}) {
  const [timeStr, setTimeStr] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const citizenTabs = [
    { id: "landing", label: "Overview", icon: "building" },
    { id: "report", label: "Report Issue", icon: "activity" },
    { id: "track", label: "Track Status", icon: "search" }
  ];

  const adminTabs = [
    { id: "dashboard", label: "Command Center", icon: "barChart" },
    { id: "complaints", label: "Complaints Triage", icon: "alertTriangle" },
    { id: "map", label: "Hotspot Map", icon: "mapPin" },
    { id: "analytics", label: "Analytics", icon: "brain" },
    { id: "about", label: "Architecture", icon: "info" }
  ];

  const isCommandMode = [
    "dashboard",
    "complaints",
    "map",
    "analytics",
    "about"
  ].includes(activeTab);

  const navigate = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="telemetry-bar">
        <div className="telemetry-left">
          <span className="telemetry-item">
            <span
              className={`pulse-dot ${
                backendConnected ? "online" : "critical"
              }`}
            />
            <span className="telemetry-text">
              {backendConnected ? "API Connected" : "Backend Disconnected"}
            </span>
          </span>

          <span className="telemetry-separator">|</span>

          <span className="telemetry-item">
            <span className="telemetry-label">REPORTS:</span>
            <span className="telemetry-val">{reportsCount}</span>
          </span>

          {criticalCount > 0 && (
            <>
              <span className="telemetry-separator">|</span>
              <span className="telemetry-item critical-alert">
                <span className="telemetry-label">CRITICAL:</span>
                <span className="telemetry-val">{criticalCount}</span>
              </span>
            </>
          )}
        </div>

        <div className="telemetry-right">
          <span className="telemetry-clock">
            <Icon name="clock" size={13} color="var(--cyan-neon)" />
            {timeStr}
          </span>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="telemetry-refresh-btn"
              title="Sync backend data"
            >
              <Icon name="refresh" size={13} />
              <span>Sync</span>
            </button>
          )}
        </div>
      </div>

      <div className="main-navbar">
        <button
          className="brand-group"
          onClick={() => navigate("landing")}
          aria-label="Go to CivicPulse overview"
        >
          <div className="brand-logo-hex">
            <Icon name="activity" size={22} color="var(--cyan-neon)" />
          </div>

          <div className="brand-titles">
            <div className="brand-title">
              CivicPulse <span className="brand-accent">AI</span>
            </div>
            <div className="brand-tagline">
              SMART CITY COMMAND PLATFORM
            </div>
          </div>
        </button>

        <div className="mode-segmented-control">
          <button
            className={`mode-btn ${!isCommandMode ? "active" : ""}`}
            onClick={() => navigate("landing")}
          >
            <Icon name="users" size={14} />
            <span>Citizen Portal</span>
          </button>

          <button
            className={`mode-btn ${isCommandMode ? "active" : ""}`}
            onClick={() => navigate("dashboard")}
          >
            <Icon name="shield" size={14} />
            <span>Command Center</span>
          </button>
        </div>

        <nav className="nav-links">
          {(isCommandMode ? adminTabs : citizenTabs).map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id)}
                className={`nav-tab-btn ${isActive ? "active" : ""}`}
              >
                <Icon
                  name={tab.icon}
                  size={15}
                  color={
                    isActive
                      ? "var(--cyan-neon)"
                      : "var(--text-secondary)"
                  }
                />
                <span>{tab.label}</span>
                {isActive && <div className="nav-tab-indicator" />}
              </button>
            );
          })}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <Icon name={mobileMenuOpen ? "x" : "chevronDown"} size={20} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-mode-switcher">
            <button
              className={`mode-btn ${!isCommandMode ? "active" : ""}`}
              onClick={() => navigate("landing")}
            >
              Citizen Portal
            </button>

            <button
              className={`mode-btn ${isCommandMode ? "active" : ""}`}
              onClick={() => navigate("dashboard")}
            >
              Command Center
            </button>
          </div>

          <div className="mobile-nav-list">
            {(isCommandMode ? adminTabs : citizenTabs).map((tab) => (
              <button
                key={tab.id}
                className={`mobile-nav-item ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => navigate(tab.id)}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
