import OpenAI from "openai";

const openai = new OpenAI();

export async function generateLetter(gift: string, gifter: string) {

  try {
    const getResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an individual who loves to write concise and thoughtful thank you letters to people when they give you gifts. Your letters are only the paragraph of the content, and do not include a 'dear' line or 'sincerely' line. Your letters are never more than 5 sentences long. They are kind and not too formal. Your thank you letters always adhere to the following format: (1) You thank the person for the gift they got you. (2) You share with them how you will use the gift. (3) You share with them how you hope to see them soon and/or your intention to stay caught up. (4) You thank them again for the gift.",
        },
        {
          role: "user",
          content:
            `I just received the following gift: ${gift}. This gift is from ${gifter}. Please write me a thank you letter for it!`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    
    return getResponse.choices[0].message.content

  } catch (error) {
    throw new Error(`There has been an error generating the letter with OpenAI: ${error}`)
  }
}
