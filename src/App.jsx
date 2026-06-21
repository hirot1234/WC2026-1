import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, CalendarDays, Trophy, Tv, Star, RefreshCw } from 'lucide-react';
import './style.css';

const matches = [
  ['2026-06-12T04:00:00+09:00','Group A','Mexico','South Africa','DAZN'],
  ['2026-06-12T11:00:00+09:00','Group A','South Korea','Czechia','DAZN'],
  ['2026-06-13T04:00:00+09:00','Group B','Canada','Bosnia and Herzegovina','DAZN'],
  ['2026-06-13T10:00:00+09:00','Group D','United States','Paraguay','DAZN'],
  ['2026-06-14T04:00:00+09:00','Group B','Qatar','Switzerland','DAZN'],
  ['2026-06-14T07:00:00+09:00','Group C','Brazil','Morocco','DAZN'],
  ['2026-06-14T10:00:00+09:00','Group C','Haiti','Scotland','DAZN'],
  ['2026-06-14T13:00:00+09:00','Group D','Australia','Turkey','DAZN'],
  ['2026-06-15T02:00:00+09:00','Group E','Germany','Curacao','DAZN'],
  ['2026-06-15T05:00:00+09:00','Group F','Netherlands','Japan','DAZN / 日本戦無料 / NHK'],
  ['2026-06-15T08:00:00+09:00','Group E','Ivory Coast','Ecuador','DAZN'],
  ['2026-06-15T11:00:00+09:00','Group F','Sweden','Tunisia','DAZN'],
  ['2026-06-16T01:00:00+09:00','Group H','Spain','Cape Verde','DAZN'],
  ['2026-06-16T04:00:00+09:00','Group G','Belgium','Egypt','DAZN'],
  ['2026-06-16T07:00:00+09:00','Group H','Saudi Arabia','Uruguay','DAZN'],
  ['2026-06-16T10:00:00+09:00','Group G','Iran','New Zealand','DAZN'],
  ['2026-06-17T04:00:00+09:00','Group I','France','Senegal','DAZN'],
  ['2026-06-17T07:00:00+09:00','Group I','Iraq','Norway','DAZN'],
  ['2026-06-17T10:00:00+09:00','Group J','Argentina','Algeria','DAZN'],
  ['2026-06-17T13:00:00+09:00','Group J','Austria','Jordan','DAZN'],
  ['2026-06-18T02:00:00+09:00','Group K','Portugal','DR Congo','DAZN'],
  ['2026-06-18T05:00:00+09:00','Group L','England','Croatia','DAZN'],
  ['2026-06-18T08:00:00+09:00','Group L','Ghana','Panama','DAZN'],
  ['2026-06-18T11:00:00+09:00','Group K','Uzbekistan','Colombia','DAZN'],
  ['2026-06-19T01:00:00+09:00','Group A','Czechia','South Africa','DAZN'],
  ['2026-06-19T04:00:00+09:00','Group B','Switzerland','Bosnia and Herzegovina','DAZN'],
  ['2026-06-19T07:00:00+09:00','Group B','Canada','Qatar','DAZN'],
  ['2026-06-19T10:00:00+09:00','Group A','Mexico','South Korea','DAZN'],
  ['2026-06-20T04:00:00+09:00','Group D','United States','Australia','DAZN'],
  ['2026-06-20T07:00:00+09:00','Group C','Scotland','Morocco','DAZN'],
  ['2026-06-20T09:30:00+09:00','Group C','Brazil','Haiti','DAZN'],
  ['2026-06-20T12:00:00+09:00','Group D','Turkey','Paraguay','DAZN'],
  ['2026-06-21T02:00:00+09:00','Group F','Netherlands','Sweden','DAZN'],
  ['2026-06-21T05:00:00+09:00','Group E','Germany','Ivory Coast','DAZN'],
  ['2026-06-21T09:00:00+09:00','Group E','Ecuador','Curacao','DAZN'],
  ['2026-06-21T13:00:00+09:00','Group F','Tunisia','Japan','DAZN / 日本戦無料 / 日本テレビ'],
  ['2026-06-22T01:00:00+09:00','Group H','Spain','Saudi Arabia','DAZN'],
  ['2026-06-22T04:00:00+09:00','Group G','Belgium','Iran','DAZN'],
  ['2026-06-22T07:00:00+09:00','Group H','Uruguay','Cape Verde','DAZN'],
  ['2026-06-22T10:00:00+09:00','Group G','New Zealand','Egypt','DAZN'],
  ['2026-06-23T02:00:00+09:00','Group J','Argentina','Austria','DAZN'],
  ['2026-06-23T06:00:00+09:00','Group I','France','Iraq','DAZN'],
  ['2026-06-23T09:00:00+09:00','Group I','Norway','Senegal','DAZN'],
  ['2026-06-23T12:00:00+09:00','Group J','Jordan','Algeria','DAZN'],
  ['2026-06-24T02:00:00+09:00','Group K','Portugal','Uzbekistan','DAZN'],
  ['2026-06-24T05:00:00+09:00','Group L','England','Ghana','DAZN'],
  ['2026-06-24T08:00:00+09:00','Group L','Panama','Croatia','DAZN'],
  ['2026-06-24T11:00:00+09:00','Group K','Colombia','DR Congo','DAZN'],
  ['2026-06-25T04:00:00+09:00','Group B','Switzerland','Canada','DAZN'],
  ['2026-06-25T04:00:00+09:00','Group B','Bosnia and Herzegovina','Qatar','DAZN'],
  ['2026-06-25T07:00:00+09:00','Group C','Scotland','Brazil','DAZN'],
  ['2026-06-25T07:00:00+09:00','Group C','Morocco','Haiti','DAZN'],
  ['2026-06-25T10:00:00+09:00','Group A','Czechia','Mexico','DAZN'],
  ['2026-06-25T10:00:00+09:00','Group A','South Africa','South Korea','DAZN'],
  ['2026-06-26T05:00:00+09:00','Group E','Ecuador','Germany','DAZN'],
  ['2026-06-26T05:00:00+09:00','Group E','Curacao','Ivory Coast','DAZN'],
  ['2026-06-26T08:00:00+09:00','Group F','Tunisia','Netherlands','DAZN'],
  ['2026-06-26T08:00:00+09:00','Group F','Japan','Sweden','DAZN / 日本戦無料 / NHK'],
  ['2026-06-26T11:00:00+09:00','Group D','Turkey','United States','DAZN'],
  ['2026-06-26T11:00:00+09:00','Group D','Paraguay','Australia','DAZN'],
  ['2026-06-27T04:00:00+09:00','Group I','Norway','France','DAZN'],
  ['2026-06-27T04:00:00+09:00','Group I','Senegal','Iraq','DAZN'],
  ['2026-06-27T09:00:00+09:00','Group H','Uruguay','Spain','DAZN'],
  ['2026-06-27T09:00:00+09:00','Group H','Cape Verde','Saudi Arabia','DAZN'],
  ['2026-06-27T12:00:00+09:00','Group G','New Zealand','Belgium','DAZN'],
  ['2026-06-27T12:00:00+09:00','Group G','Egypt','Iran','DAZN'],
  ['2026-06-28T06:00:00+09:00','Group L','Panama','England','DAZN'],
  ['2026-06-28T06:00:00+09:00','Group L','Croatia','Ghana','DAZN'],
  ['2026-06-28T08:30:00+09:00','Group K','Colombia','Portugal','DAZN'],
  ['2026-06-28T08:30:00+09:00','Group K','DR Congo','Uzbekistan','DAZN'],
  ['2026-06-28T11:00:00+09:00','Group J','Jordan','Argentina','DAZN'],
  ['2026-06-28T11:00:00+09:00','Group J','Algeria','Austria','DAZN'],
  ['2026-06-29T04:00:00+09:00','Round of 32','2nd Group A','2nd Group B','DAZN'],
  ['2026-06-30T02:00:00+09:00','Round of 32','1st Group C','2nd Group F','DAZN'],
  ['2026-06-30T05:30:00+09:00','Round of 32','1st Group E','3rd Group A/B/C/D/F','DAZN'],
  ['2026-06-30T10:00:00+09:00','Round of 32','1st Group F','2nd Group C','DAZN'],
  ['2026-07-01T02:00:00+09:00','Round of 32','2nd Group E','2nd Group I','DAZN'],
  ['2026-07-01T06:00:00+09:00','Round of 32','1st Group I','3rd Group C/D/F/G/H','DAZN'],
  ['2026-07-01T10:00:00+09:00','Round of 32','1st Group A','3rd Group C/E/F/H/I','DAZN'],
  ['2026-07-02T01:00:00+09:00','Round of 32','1st Group L','3rd Group E/H/I/J/K','DAZN'],
  ['2026-07-02T05:00:00+09:00','Round of 32','1st Group G','3rd Group A/E/H/I/J','DAZN'],
  ['2026-07-02T09:00:00+09:00','Round of 32','1st Group D','3rd Group B/E/F/I/J','DAZN'],
  ['2026-07-03T04:00:00+09:00','Round of 32','1st Group H','2nd Group J','DAZN'],
  ['2026-07-03T08:00:00+09:00','Round of 32','2nd Group K','2nd Group L','DAZN'],
  ['2026-07-03T12:00:00+09:00','Round of 32','1st Group B','3rd Group E/F/G/I/J','DAZN'],
  ['2026-07-04T03:00:00+09:00','Round of 32','2nd Group D','2nd Group G','DAZN'],
  ['2026-07-04T07:00:00+09:00','Round of 32','1st Group J','2nd Group H','DAZN'],
  ['2026-07-04T10:30:00+09:00','Round of 32','1st Group K','3rd Group D/E/I/J/L','DAZN'],
  ['2026-07-05T02:00:00+09:00','Round of 16','Winner M73','Winner M75','DAZN'],
  ['2026-07-05T06:00:00+09:00','Round of 16','Winner M74','Winner M77','DAZN'],
  ['2026-07-06T05:00:00+09:00','Round of 16','Winner M76','Winner M78','DAZN'],
  ['2026-07-06T09:00:00+09:00','Round of 16','Winner M79','Winner M80','DAZN'],
  ['2026-07-07T04:00:00+09:00','Round of 16','Winner M84','Winner M85','DAZN'],
  ['2026-07-07T09:00:00+09:00','Round of 16','Winner M81','Winner M82','DAZN'],
  ['2026-07-08T01:00:00+09:00','Round of 16','Winner M88','Winner M86','DAZN'],
  ['2026-07-08T05:00:00+09:00','Round of 16','Winner M83','Winner M87','DAZN'],
  ['2026-07-10T05:00:00+09:00','Quarterfinal','Winner R16-1','Winner R16-2','DAZN'],
  ['2026-07-11T04:00:00+09:00','Quarterfinal','Winner R16-5','Winner R16-6','DAZN'],
  ['2026-07-12T06:00:00+09:00','Quarterfinal','Winner R16-3','Winner R16-4','DAZN'],
  ['2026-07-12T10:00:00+09:00','Quarterfinal','Winner R16-7','Winner R16-8','DAZN'],
  ['2026-07-15T04:00:00+09:00','Semifinal','Winner QF-1','Winner QF-2','DAZN'],
  ['2026-07-16T04:00:00+09:00','Semifinal','Winner QF-3','Winner QF-4','DAZN'],
  ['2026-07-19T06:00:00+09:00','3rd Place Playoff','Loser SF-1','Loser SF-2','DAZN'],
  ['2026-07-20T04:00:00+09:00','Final','Winner SF-1','Winner SF-2','DAZN / NHK']
].map((m, i) => ({ id: i + 1, datetime: m[0], round: m[1], home: m[2], away: m[3], broadcast: m[4] }));

function normalizeName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '')
    .replace('usa', 'unitedstates')
    .replace('ivorycoast', 'cotedivoire')
    .replace('drc', 'drcongo');
}

function matchKey(m) {
  return `${m.datetime.slice(0, 10)}-${normalizeName(m.home)}-${normalizeName(m.away)}`;
}


const rounds = ['すべて', ...Array.from(new Set(matches.map(m => m.round)))];

function fmtDate(iso) {
  return new Intl.DateTimeFormat('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' }).format(new Date(iso));
}
function fmtTime(iso) {
  return new Intl.DateTimeFormat('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso));
}

export default function App() {
  const [q, setQ] = useState('');
  const [round, setRound] = useState('すべて');
  const [onlyJapan, setOnlyJapan] = useState(false);
  const [liveResults, setLiveResults] = useState({});
  const [loadingResults, setLoadingResults] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [resultError, setResultError] = useState('');

  async function refreshResults() {
    setLoadingResults(true);
    setResultError('');
    try {
      const res = await fetch('/api/results', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const byKey = {};
      for (const r of data.matches || []) byKey[r.key] = r;
      setLiveResults(byKey);
      setLastUpdated(new Date());
    } catch (err) {
      setResultError('結果の自動取得に失敗しました。静的スケジュールを表示しています。');
    } finally {
      setLoadingResults(false);
    }
  }

  useEffect(() => {
    refreshResults();
    const timer = window.setInterval(refreshResults, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const enrichedMatches = useMemo(() => matches.map(m => ({
    ...m,
    live: liveResults[matchKey(m)] || null,
  })), [liveResults]);

  const filtered = useMemo(() => enrichedMatches.filter(m => {
    const text = `${m.round} ${m.home} ${m.away} ${m.broadcast}`.toLowerCase();
    return (round === 'すべて' || m.round === round)
      && (!onlyJapan || [m.home, m.away].includes('Japan'))
      && text.includes(q.toLowerCase());
  }), [q, round, onlyJapan, enrichedMatches]);

  const grouped = useMemo(() => filtered.reduce((acc, m) => {
    const key = fmtDate(m.datetime);
    acc[key] ||= [];
    acc[key].push(m);
    return acc;
  }, {}), [filtered]);

  return <main className="app">
    <section className="hero">
      <div>
        <p className="eyebrow"><Trophy size={16}/> FIFA World Cup 2026</p>
        <h1>全試合 放映スケジュール</h1>
        <p className="lead">日本時間表示。表示時に試合結果を取得し、1分ごとに自動更新します。</p>
      </div>
      <div className="summary">
        <strong>{filtered.length}</strong><span>matches</span>
      </div>
    </section>

    <section className="toolbar">
      <label className="search"><Search size={18}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="国名・放送局で検索" /></label>
      <select value={round} onChange={e=>setRound(e.target.value)}>{rounds.map(r => <option key={r}>{r}</option>)}</select>
      <button className={onlyJapan ? 'active' : ''} onClick={() => setOnlyJapan(v => !v)}><Star size={16}/>日本戦</button>
      <button onClick={refreshResults} disabled={loadingResults}><RefreshCw size={16}/>{loadingResults ? '更新中' : '結果更新'}</button>
    </section>

    <p className="note"><Tv size={16}/> DAZNは全試合ライブ配信。試合結果はVercel API Route経由で取得します。{lastUpdated && ` 最終更新: ${lastUpdated.toLocaleTimeString('ja-JP')}`}</p>
    {resultError && <p className="error">{resultError}</p>}

    {Object.entries(grouped).map(([date, games]) => <section className="day" key={date}>
      <h2><CalendarDays size={19}/>{date}</h2>
      <div className="grid">
        {games.map(m => <article className={m.home === 'Japan' || m.away === 'Japan' ? 'card japan' : 'card'} key={m.id}>
          <div className="meta"><span>{m.round}</span><b>{fmtTime(m.datetime)}</b></div>
          <div className="teams"><span>{m.home}</span><em>{m.live?.hasScore ? `${m.live.homeScore} - ${m.live.awayScore}` : 'vs'}</em><span>{m.away}</span></div>
          {m.live?.status && <div className={`status ${m.live.completed ? 'done' : ''}`}>{m.live.status}</div>}
          <div className="broadcast"><Tv size={15}/>{m.broadcast}</div>
        </article>)}
      </div>
    </section>)}
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
