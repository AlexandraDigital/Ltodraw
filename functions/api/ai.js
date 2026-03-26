export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { message, image } = await request.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ reply: "Please provide a valid message." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ reply: "OPENAI_API_KEY is not configured." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const userContent = image
      ? [
          { type: "text", text: message },
          { type: "image_url", image_url: { url: image } },
        ]
      : message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert art teacher specializing in perspective drawing. Teach step-by-step clearly.",
          },
          {
            role: "user",
            content: userContent,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ reply: data.error?.message || "AI request failed." }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "No response",
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (_err) {
    return new Response(
      JSON.stringify({ reply: "Invalid request payload or server error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
