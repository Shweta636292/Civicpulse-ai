
import express from "express";
import { randomUUID } from "crypto";
import { analyzeComplaint } from "../services/aiService.js";
import { calculatePriority } from "../utils/priority.js";
import { findDuplicate } from "../utils/duplicate.js";

const router = express.Router();

// Temporary storage for development
const reports = [];

// POST: Submit a new complaint
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // AI analysis with fallback handling
    let aiAnalysis;
    let aiAnalysisStatus = "Completed";

    try {
      aiAnalysis = await analyzeComplaint(description);
    } catch (error) {
      console.error("Gemini AI unavailable:", error.message);

      aiAnalysisStatus = "Unavailable";

      aiAnalysis = {
        category: category,
        summary: description,
        severity: "Medium",
        safetyRisk: "Low",
        affectedPeople: "Low",
        reasoning:
          "AI analysis is temporarily unavailable. Manual review is required.",
        recommendedAction:
          "Forward this complaint for manual assessment."
      };
    }

    // Calculate priority
    const priorityResult = calculatePriority(aiAnalysis);

    // Check duplicate complaints
    const duplicate = findDuplicate(
      {
        description,
        category,
        location
      },
      reports
    );

    // Create complaint
    const newReport = {
      id: randomUUID(),
      title,
      description,
      category,
      aiAnalysis,
      aiAnalysisStatus,
      priority: priorityResult.level,
      priorityScore: priorityResult.score,
      priorityReason: priorityResult.explanation,
      duplicateOf: duplicate?.id || null,
      isDuplicate: Boolean(duplicate),
      location,
      status: "Submitted",
      createdAt: new Date()
    };

    reports.push(newReport);

    res.status(201).json({
      success: true,
      message: "Complaint registered successfully",
      report: newReport
    });

  } catch (error) {
    console.error("COMPLAINT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET: Fetch all complaints
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: reports.length,
    reports
  });
});

// PATCH: Update complaint status
router.patch("/:id/status", (req, res) => {
  const { status } = req.body;

  const allowedStatuses = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Resolved"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid complaint status"
    });
  }

  const report = reports.find(
    (item) => item.id === req.params.id
  );

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Complaint not found"
    });
  }

  report.status = status;

  res.json({
    success: true,
    message: "Complaint status updated",
    report
  });
});

// GET: Track a complaint using its ID
router.get("/:id", (req, res) => {
  const report = reports.find(
    (item) => item.id === req.params.id
  );

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Complaint not found"
    });
  }

  res.json({
    success: true,
    report
  });
});

export default router;
