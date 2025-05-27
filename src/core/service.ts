import openai from "./openAIService";
import { buildPrompt } from "./buildPrompt";

async function generatePrompt(formData: any) {

    const prompt = buildPrompt(formData);


    
    try{
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini", 
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: prompt }
            ],
          });

          const text = response.choices[0].message.content?.trim();
          return text;


    } catch (error) {
        console.error(error);
    }
}

export default generatePrompt;
