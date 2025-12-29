import prisma from "../config/db.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


const evaluateIdea = async (req, res) => {
  try {
    console.log('Received evaluation request:', req.body);
    
    // Read env vars inside request handler to ensure dotenv has loaded
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        error: "AI service not configured",
        message: "GEMINI_API_KEY is not set in environment variables",
      });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const {
      title,
      pitch,
      problem,
      solution,
      marketSize,
      targetAudience,
      businessModel,
      competition,
      experience,
      education,
      skills,
      founderRole,
      traction,
      mvpReady,
      vision,
    } = req.body;

    if (!title || !pitch || !problem || !solution || !targetAudience || !businessModel) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }


    const prompt = `You are an expert strong startup evaluator. Analyze the following startup idea and provide a comprehensive and detailed evaluation.

Startup Details:
- Title: ${title}
- One-Line Pitch: ${pitch}
- Problem Statement: ${problem}
- Proposed Solution: ${solution}
- Target Audience: ${targetAudience}
- Business Model: ${businessModel}
- Competition: ${competition || "Not specified"}
- Founder Experience: ${experience || "Not specified"}
- Education: ${education || "Not specified"}
- Skills: ${skills || "Not specified"}
- Founder Role: ${founderRole || "Not specified"}
- Traction: ${traction || "None"}
- MVP Ready: ${mvpReady || "Not specified"}
- Vision (2-5 years): ${vision || "Not specified"}

Please provide a detailed evaluation in the following JSON format:
{
  "feasibility": <number 0-100>,
  "marketPotential": <number 0-100>,
  "competition": <number 0-100>,
  "scalability": <number 0-100>,
  "executionDifficulty": <number 0-100>,
  "verdict": "<Pass (Good Potential) | Needs Work | Risky>",
  "summary": "<2-3 sentence summary>",
  "nextSteps": ["<step 1>", "<step 2>", "<step 3>"],
  "techStack": "<recommended tech stack>",
  "fundingStage": "<Pre-Seed / Angel | Seed | Series A>",
  "investorMatches": [
    {"name": "<investor name>", "type": "<Angel | VC | Angel Network>", "ticketSize": "<amount range>"}
  ]
}

Return ONLY valid JSON, no additional text.`;

    // Call Gemini API 
    let aiEvaluation;
    try {
      console.log(`[Backend Debug] Sending prompt to model: ${GEMINI_MODEL}`);
      const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponseText = response.text();

      console.log("[Backend Debug] --- RAW AI RESPONSE ---");
      console.log(aiResponseText);
      console.log("[Backend Debug] -----------------------");

      try {
        // Clean the response 
        const cleanedResponse = aiResponseText
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();
        aiEvaluation = JSON.parse(cleanedResponse);
        console.log("[Backend Debug] Successfully parsed AI response");
      } catch (parseError) {
        console.error("[Backend Debug] Error parsing AI response:", parseError);
        console.error("[Backend Debug] JSON content causing error:", aiResponseText);
        // Agr server off hai to Default answers 
        aiEvaluation = {
          feasibility: 70,
          marketPotential: 75,
          competition: 65,
          scalability: 70,
          executionDifficulty: 60,
          verdict: "Needs Work (Parse Error)",
          summary: "There was an error processing the AI response. Please try again.",
          nextSteps: ["Retry analysis"],
          techStack: "Unknown",
          fundingStage: "Unknown",
          investorMatches: [],
        };
      }
    } catch (aiError) {
      console.error("[Backend Debug] Error calling Gemini API:", aiError);
      // Fallback if the model call itself fails
      aiEvaluation = {
        feasibility: 70,
        marketPotential: 75,
        competition: 65,
        scalability: 70,
        executionDifficulty: 60,
        verdict: "Needs Work (API Error)",
        summary: "There was an error connecting to the AI service. Please check the backend logs.",
        nextSteps: ["Check API Key", "Check Model Availability"],
        techStack: "Unknown",
        fundingStage: "Unknown",
        investorMatches: [],
      };
    }


    const MAX_SUMMARY_LENGTH = 500;
    const dbSummary = (aiEvaluation.summary || "").slice(0, MAX_SUMMARY_LENGTH);

    // Save to database
    const evaluationResult = await prisma.evaluationResult.create({
      data: {
        title,
        pitch,
        problem,
        solution,
        targetAudience,
        businessModel,
        competition: competition || null,
        experience: experience || null,
        education: education || null,
        skills: skills || null,
        founderRole: founderRole || null,
        traction: traction || null,
        mvpReady: mvpReady || null,
        vision: vision || null,
        feasibility: aiEvaluation.feasibility,
        marketPotential: aiEvaluation.marketPotential,
        competitionScore: aiEvaluation.competition,
        scalability: aiEvaluation.scalability,
        executionDifficulty: aiEvaluation.executionDifficulty,
        verdict: aiEvaluation.verdict,
        summary: dbSummary,
        nextSteps: JSON.stringify(aiEvaluation.nextSteps),
        techStack: aiEvaluation.techStack || null,
        fundingStage: aiEvaluation.fundingStage || null,
        investorMatches: JSON.stringify(aiEvaluation.investorMatches || []),
      },
    });

    res.status(200).json({
      success: true,
      resultId: evaluationResult.id,
      evaluation: {
        feasibility: aiEvaluation.feasibility,
        marketPotential: aiEvaluation.marketPotential,
        competition: aiEvaluation.competition,
        scalability: aiEvaluation.scalability,
        executionDifficulty: aiEvaluation.executionDifficulty,
        verdict: aiEvaluation.verdict,
        summary: aiEvaluation.summary,
        nextSteps: aiEvaluation.nextSteps,
        techStack: aiEvaluation.techStack,
        fundingStage: aiEvaluation.fundingStage,
        investorMatches: aiEvaluation.investorMatches,
      },
    });
  } catch (error) {
    console.error("Error evaluating idea:", error);
    res.status(500).json({
      error: "Failed to evaluate idea",
      message: error.message,
    });
  }
};

const getEvaluationById = async (req, res) => {
  try {
    const { resultId } = req.params;

    const evaluation = await prisma.evaluationResult.findUnique({
      where: { id: parseInt(resultId) },
    });

    if (!evaluation) {
      return res.status(404).json({
        error: "Evaluation not found",
      });
    }

    // Parse JSON fields
    const nextSteps = JSON.parse(evaluation.nextSteps || "[]");
    const investorMatches = JSON.parse(evaluation.investorMatches || "[]");

    res.status(200).json({
      feasibility: evaluation.feasibility,
      marketPotential: evaluation.marketPotential,
      competition: evaluation.competitionScore,
      scalability: evaluation.scalability,
      executionDifficulty: evaluation.executionDifficulty,
      verdict: evaluation.verdict,
      summary: evaluation.summary,
      nextSteps: nextSteps,
      techStack: evaluation.techStack,
      fundingStage: evaluation.fundingStage,
      investorMatches: investorMatches,
    });
  } catch (error) {
    console.error("Error fetching evaluation:", error);
    res.status(500).json({
      error: "Failed to fetch evaluation",
      message: error.message,
    });
  }
};

export { evaluateIdea, getEvaluationById };

