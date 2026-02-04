export const prerender = false;

const BASE_URL = "https://api.aviationstack.com/v1/airports";

export async function GET({ url }) {
  try {
    const icao = (url.searchParams.get("icao") || "").trim().toUpperCase();
    if (!icao) {
      return new Response(JSON.stringify({ error: "missing_icao" }), { status: 400 });
    }

    const key = import.meta.env.AVIATIONSTACK_KEY || process.env.AVIATIONSTACK_KEY;
    if (!key) {
      return new Response(JSON.stringify({ error: "missing_key" }), { status: 500 });
    }

    const apiUrl = `${BASE_URL}?access_key=${encodeURIComponent(key)}&icao_code=${encodeURIComponent(icao)}`;
    const res = await fetch(apiUrl);
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "upstream_error" }), { status: 502 });
    }
    const data = await res.json();
    const item = Array.isArray(data?.data) ? data.data[0] : null;
    if (!item) {
      return new Response(JSON.stringify({ error: "not_found" }), { status: 404 });
    }

    return new Response(
      JSON.stringify({
        icao: item.icao_code,
        iata: item.iata_code,
        name: item.airport_name,
        lat: item.latitude,
        lon: item.longitude,
      }),
      { status: 200 }
    );
  } catch {
    return new Response(JSON.stringify({ error: "server_error" }), { status: 500 });
  }
}
