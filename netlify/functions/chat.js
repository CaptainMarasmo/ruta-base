const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, message } = JSON.parse(event.body || "{}");

    if (!message || typeof message !== "string") {
      return { statusCode: 400, body: "Mensaje requerido" };
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (!url || !key) {
      return { statusCode: 500, body: "Supabase no configurado" };
    }

    const resp = await fetch(`${url}/rest/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: name ? String(name).slice(0, 80) : null,
        message: String(message).slice(0, 2000),
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return { statusCode: 500, body: text || "Error guardando mensaje" };
    }

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    return { statusCode: 500, body: "Error" };
  }
};

exports.handler = handler;
