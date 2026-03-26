export async function onRequestPost(context) {
  const { request, env } = context;

  const { message } = await request.json();

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert art teacher specializing in perspective drawing. Teach step-by-step clearly."
        },
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();

  return new Response(JSON.stringify({
    reply: data.choices?.[0]?.message?.content || "No response"
  }), {
    headers: { "Content-Type": "application/json" }
  });
}