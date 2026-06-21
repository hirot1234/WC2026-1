const ESPN_SCOREBOARD_URL = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=200&dates=20260611-20260720';

function normalizeName(name = '') {
  return String(name)
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '')
    .replace('usa', 'unitedstates')
    .replace('ivorycoast', 'cotedivoire')
    .replace('drc', 'drcongo');
}

function toTokyoDateKey(dateString) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(dateString));
}

function normalizeEvent(event) {
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors || [];
  const home = competitors.find(c => c.homeAway === 'home') || competitors[0];
  const away = competitors.find(c => c.homeAway === 'away') || competitors[1];
  const homeName = home?.team?.displayName || home?.team?.name || '';
  const awayName = away?.team?.displayName || away?.team?.name || '';
  const homeScore = home?.score == null ? null : Number(home.score);
  const awayScore = away?.score == null ? null : Number(away.score);
  const dateKey = toTokyoDateKey(event.date);

  return {
    id: event.id,
    key: `${dateKey}-${normalizeName(homeName)}-${normalizeName(awayName)}`,
    date: event.date,
    home: homeName,
    away: awayName,
    homeScore,
    awayScore,
    hasScore: Number.isFinite(homeScore) && Number.isFinite(awayScore),
    status: event.status?.type?.shortDetail || event.status?.type?.description || '',
    completed: Boolean(event.status?.type?.completed),
  };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  try {
    const response = await fetch(ESPN_SCOREBOARD_URL, {
      headers: { accept: 'application/json' },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Score provider returned ${response.status}` });
    }

    const data = await response.json();
    const matches = (data.events || []).map(normalizeEvent).filter(m => m.home && m.away);

    return res.status(200).json({
      provider: 'ESPN public scoreboard',
      updatedAt: new Date().toISOString(),
      matches,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch live results' });
  }
}
