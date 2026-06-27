const TBA_AUTH_KEY = 'gdgkcwgh93dBGQjVXlh0ndD4GIkiQlzzbaRu9NUHGfk72tPVG2a69LF2BoYB1QNf';
const CACHE_PREFIX = 'frc7598_tba_';
const CACHE_MS = 1000 * 60 * 60 * 6;
const inFlight = new Map();

async function cachedJson(key, url) {
  const cacheKey = `${CACHE_PREFIX}${key}`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
    if (cached && Date.now() - cached.time < CACHE_MS) return cached.data;
  } catch {}

  if (inFlight.has(cacheKey)) return inFlight.get(cacheKey);

  const promise = fetch(url, { headers: { 'X-TBA-Auth-Key': TBA_AUTH_KEY } })
    .then((response) => {
      if (!response.ok) throw new Error(`API response error: ${response.status}`);
      return response.json();
    })
    .then((data) => {
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), data })); } catch {}
      return data;
    })
    .finally(() => inFlight.delete(cacheKey));

  inFlight.set(cacheKey, promise);
  return promise;
}

export function getTeamEvents(year = new Date().getFullYear()) {
  return cachedJson(`team_events_${year}`, `https://www.thebluealliance.com/api/v3/team/frc7598/events/${year}`);
}

export function getEvent(key) {
  return cachedJson(`event_${key}`, `https://www.thebluealliance.com/api/v3/event/${key}`);
}
