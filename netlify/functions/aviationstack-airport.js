const BASE_URL = "https://api.aviationstack.com/v1/airports";

exports.handler = async (event) => {
  try {
    const icao = (event.queryStringParameters?.icao || "").trim().toUpperCase();
    if (!icao) {
      return { statusCode: 400, body: JSON.stringify({ error: "missing_icao" }) };
    }

    const key = process.env.AVIATIONSTACK_KEY;
    if (!key) {
      return { statusCode: 500, body: JSON.stringify({ error: "missing_key" }) };
    }

    const url = `${BASE_URL}?access_key=${encodeURIComponent(key)}&icao_code=${encodeURIComponent(icao)}`;
    const res = await fetch(url);
    if (!res.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: "upstream_error" }) };
    }
    const data = await res.json();
    const item = Array.isArray(data?.data) ? data.data[0] : null;
    if (!item) {
      return { statusCode: 404, body: JSON.stringify({ error: "not_found" }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        icao: item.icao_code,
        iata: item.iata_code,
        name: item.airport_name,
        lat: item.latitude,
        lon: item.longitude,
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: "server_error" }) };
  }
};
