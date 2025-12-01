# Training Dataset for Idea Evaluation

Place your JSON training data files in this folder.

## Recommended structure

- `backend/training-dataset/examples/` – individual JSON files with example startup ideas and evaluations.

Example file: `backend/training-dataset/examples/sample-evaluation.json`

```json
{
  "title": "Finago",
  "pitch": "AI financial assistant for Indian students",
  "problem": "Students struggle to track expenses and plan savings.",
  "solution": "A mobile app that connects to UPI / bank statements and auto-categorizes spend.",
  "marketSize": "50M+ students in India",
  "targetAudience": "Indian college students",
  "businessModel": "B2C",
  "competition": "Manual tracking, a few budgeting apps",
  "experience": "Final-year BTech student",
  "education": "BTech CSE",
  "skills": "React, Node.js, ML basics",
  "founderRole": "Tech Founder",
  "traction": "50 beta users",
  "mvpReady": "Yes",
  "vision": "Become the default money app for Indian youth",
  "evaluation": {
    "feasibility": 75,
    "marketPotential": 80,
    "competition": 60,
    "scalability": 78,
    "executionDifficulty": 65,
    "verdict": "Needs Work",
    "summary": "Strong problem and clear audience, but needs sharper differentiation and GTM.",
    "nextSteps": [
      "Interview 20–30 students about their money habits",
      "Ship a simple MVP with expense tracking only",
      "Test paid features like advanced analytics or reminders"
    ],
    "techStack": "React Native, Node.js/Express, PostgreSQL",
    "fundingStage": "Pre-Seed / Angel",
    "investorMatches": [
      {
        "name": "Fintech-focused angels in India",
        "type": "Angel",
        "ticketSize": "$25k–$100k"
      }
    ]
  }
}
```

