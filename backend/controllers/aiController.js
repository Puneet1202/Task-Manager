const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const { getCategorizationPrompt , getBulkCreatePrompt} = require('../utils/prompts.js');
const Task = require('../models/task.model.js');

// 🔁 Safe Retry Function - agar Gemini busy ho to 3 baar tak retry karega
const safeGenerateContent = async (model, prompt, retries = 3) => {
  try {
    return await model.generateContent(prompt);
  } catch (error) {
    if (error.status === 503 && retries > 0) {
      console.warn("⚠️ Gemini busy hai, retrying in 5 seconds...");
      await new Promise(res => setTimeout(res, 5000)); // wait 3 sec
      return safeGenerateContent(model, prompt, retries - 1);
    }
    throw error;
  }
};


const categorizeTaskController = async(req,res)=>{
    try{
        const {taskTitle} = req.body;
        if(!taskTitle){
            return res.status(400).json({success:false, message:"Task title is required"});
        }
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" })
        const prompt =  getCategorizationPrompt(taskTitle);

        // const result = await model.generateContent(prompt);
        const result = await safeGenerateContent(model, prompt);
        const response = await result.response;
        const category = response.text().trim();

        res.status(200).json({success:true, category});
    }catch(error){
        console.error("Error in categorizeTaskController:", error);
        res.status(500).json({success:false, message:"Internal Server Error"});
    }
}

const bulkCreateTasksController = async (req, res) => {
    try {
        const { userInput } = req.body;
        if (!userInput) {
        return res.status(400).json({ message: "User input is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
        const prompt = getBulkCreatePrompt(userInput);
        
        // const result = await model.generateContent(prompt);
        const result = await safeGenerateContent(model, prompt);

        const response = await  result.response;
        const output = await response.text();
        const cleanOutput = cleanGeminiOutput(output);

        let jsonString = cleanOutput;

        // 2. Remove ```json``` if present
        if (jsonString.startsWith("```json")) {
        jsonString = jsonString.substring(7, jsonString.length - 3).trim();
        }

        // 3. Parse cleaned string
        const tasksArray = JSON.parse(jsonString);


        const createdTasks = [];
        for (const task of tasksArray) {
        const newTask = await Task.create({
            title: task.title,
            priority: task.priority || 'Medium',
            dueDate: task.dueDate,
            user: req.user.id 
        });
        createdTasks.push(newTask);
        }
        
        res.status(201).json({ 
        message: `${createdTasks.length} tasks created successfully!`,
        tasks: createdTasks 
        });

    } catch (error) {
        console.error("Error in Bulk Create Controller:", error);
        res.status(500).json({ message: "Failed to create tasks from text" });
    }
};
function cleanGeminiOutput(text) {
  if (!text) return '';

  return text
    .trim()                              // remove spaces/newlines
    .replace(/^Category:\s*/i, '')        // remove "Category:" if exists
    .replace(/^```json|```$/g, '')        // remove code block markers if any
    .replace(/[\n\r]+/g, '')              // remove line breaks
    .replace(/^[\"\']|[\"\']$/g, '');     // remove surrounding quotes
}


module.exports = {categorizeTaskController,  bulkCreateTasksController};