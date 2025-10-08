const getCategorizationPrompt = (taskTitle) => {
  return `SYSTEM INSTRUCTION:
You are a multilingual (English + Hinglish) AI assistant that classifies tasks into predefined categories.

TASK:
"${taskTitle}"

LANGUAGE AWARENESS:
- The task title may be written in English, Hindi, or Hinglish (e.g., "kal project submit karna hai").
- Detect the language automatically.
- Understand the intent and meaning before categorizing.

AVAILABLE CATEGORIES:
["Work", "Personal", "Learning", "Shopping", "Health"]

RESPONSE REQUIREMENTS:
- Respond with ONLY the exact category name.
- No punctuation, explanation, or extra text.
- If multiple categories seem valid, choose the most contextually appropriate one.

EXAMPLES:
"Submit the project report" → Work  
"Kal subah running karni hai" → Health  
"Mom ke liye birthday gift lena hai" → Personal  
"Node.js tutorial complete karna hai" → Learning  
"Market se fruits lena hai" → Shopping  

FINAL ANSWER:
Category:`;
};


const getBulkCreatePrompt = (userInput) => {
  const today = new Date().toISOString();
  return `SYSTEM INSTRUCTION:
You are an intelligent Gemini-based productivity assistant that converts a user's natural-language goal (English or Hinglish) into a structured task breakdown.

USER GOAL:
"${userInput}"

YOUR OBJECTIVE:
1. Understand the meaning — even if the input mixes Hindi and English.
2. Translate internally if needed.
3. Decompose the goal into small, actionable tasks.
4. Each task must include:
   - "title": short, clear, action-oriented statement (in English)
   - "priority": one of ["High", "Medium", "Low"]
   - "dueDate" (optional): only if the goal mentions a date/time (today is ${today}, ISO 8601 format)

OUTPUT RULES:
- Return ONLY a valid JSON array of task objects.
- Do NOT add any extra text, markdown, explanation, or commentary.
- Ensure proper JSON syntax (no missing quotes or trailing commas).

EXAMPLE OUTPUT:
[
  { "title": "Research topic ideas", "priority": "High" },
  { "title": "Write first draft", "priority": "Medium", "dueDate": "2025-10-10T00:00:00Z" }
]

GENERATE THE TASK ARRAY NOW →`;
};


module.exports = {
  getCategorizationPrompt,
  getBulkCreatePrompt
};
