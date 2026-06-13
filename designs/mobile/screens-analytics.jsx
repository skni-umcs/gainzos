/* ============================================================
   GainzOS — Analytics: volume · duration · calories · frequency
   · muscle-group distribution
   ============================================================ */

function Donut({ data, size = 150, stroke = 22 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const colors = ['#db90ff', '#a96bff', '#894bff', '#6f5bd8', '#8a7fe0', '#b9a8f0'];
  let acc = 0;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
      {data.map((d, i) => {
        const len = (d.pct / 100) * c;
        const seg = (
          <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={colors[i % colors.length]} strokeWidth={stroke}
            strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-acc}
            style={{ transition: 'stroke-dasharray .8s ease' }} />
        );
        acc += len;
        return seg;
      })}
    </svg>
  );
}

function AnalyticsScreen({ nav, ns = 'an' }) {
  const [range, setRange] = React.useState('12W');
  const totalVol = DB.VOLUME_TREND.reduce((a, b) => a + b, 0);
  const colors = ['#db90ff', '#a96bff', '#894bff', '#6f5bd8', '#8a7fe0', '#b9a8f0'];
  const weekLabels = DB.VOLUME_TREND.map((_, i) => i % 2 === 0 ? `W${i + 1}` : '');
  return (
    <Screen>
      <AppHeader ns={ns} onProfile={() => nav('profile')} />
      <Pad>
        <div className="eyebrow" style={{ marginBottom: 4 }}>Your trends</div>
        <h1 className="display" style={{ fontSize: 34, color: 'var(--text)', marginBottom: 16 }}>Analytics</h1>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['4W', '12W', '6M', '1Y'].map(r => <Chip key={r} label={r} active={range === r} onClick={() => setRange(r)} />)}
        </div>

        {/* Volume hero */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
            <div>
              <div className="field-label" style={{ marginBottom: 6 }}>Total volume</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="num" style={{ fontSize: 42, color: 'var(--text)' }}>{totalVol}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-mut)' }}>tonnes</span>
              </div>
            </div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 13, fontWeight: 700, color: 'var(--success)', marginTop: 26 }}>
              <Icon name="arrowUp" size={15} stroke={2.6} />18%
            </span>
          </div>
          <div style={{ marginTop: 8 }}><LineChart data={DB.VOLUME_TREND} height={120} /></div>
        </div>

        {/* Duration + calories */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <div className="field-label" style={{ marginBottom: 10 }}>Avg duration</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span className="num" style={{ fontSize: 26, color: 'var(--text)' }}>54</span>
              <span style={{ fontSize: 12, color: 'var(--text-mut)', fontWeight: 600 }}>min</span>
            </div>
            <div style={{ marginTop: 14 }}><MiniBars data={DB.DURATION_TREND.slice(-7)} height={56} highlightLast /></div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div className="field-label" style={{ marginBottom: 10 }}>Avg calories</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span className="num" style={{ fontSize: 26, color: 'var(--text)' }}>2.4k</span>
              <span style={{ fontSize: 12, color: 'var(--text-mut)', fontWeight: 600 }}>kcal</span>
            </div>
            <div style={{ marginTop: 14 }}><MiniBars data={DB.CAL_TREND.slice(-7)} height={56} highlightLast /></div>
          </div>
        </div>

        {/* Training frequency */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div className="field-label" style={{ margin: 0 }}>Training frequency</div>
            <span className="small" style={{ fontWeight: 700, color: 'var(--text-2)' }}>4.3 / week avg</span>
          </div>
          <MiniBars data={DB.FREQ} labels={weekLabels} height={84} highlightLast />
        </div>

        {/* Muscle-group distribution */}
        <div className="card">
          <div className="field-label" style={{ marginBottom: 16 }}>Muscle-group distribution</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Donut data={DB.MUSCLE_DIST} />
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <div>
                  <div className="num" style={{ fontSize: 24, color: 'var(--text)' }}>{DB.WORKOUTS.length}</div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mut)' }}>workouts</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {DB.MUSCLE_DIST.map((d, i) => (
                <div key={d.group} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: colors[i % colors.length], flexShrink: 0 }} />
                  <span className="small" style={{ flex: 1, color: 'var(--text-2)', fontWeight: 600 }}>{d.group}</span>
                  <span className="num" style={{ fontSize: 14, color: 'var(--text)' }}>{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Pad>
    </Screen>
  );
}

Object.assign(window, { AnalyticsScreen, Donut });
