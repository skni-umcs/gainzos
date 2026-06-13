/* ============================================================
   GainzOS — Profile: user · body metrics · progress · edit
   ============================================================ */

function MetricEditRow({ label, value, unit, onEdit }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0' }}>
      <span className="small" style={{ fontWeight: 700, color: 'var(--text-2)' }}>{label}</span>
      <button onClick={onEdit} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <span style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span className="num" style={{ fontSize: 18, color: 'var(--text)' }}>{value}</span>
          {unit && <span style={{ fontSize: 12, color: 'var(--text-mut)', fontWeight: 600 }}>{unit}</span>}
        </span>
        <Icon name="pencilStat" size={15} stroke={2} color="var(--text-mut)" />
      </button>
    </div>
  );
}

function ProfileScreen({ nav, ns = 'pf' }) {
  const m = DB.METRICS, u = DB.USER;
  const wNow = DB.WEIGHT_TREND[DB.WEIGHT_TREND.length - 1];
  const wDelta = (wNow - DB.WEIGHT_TREND[0]).toFixed(1);
  return (
    <Screen>
      {/* cover + avatar */}
      <div style={{ position: 'relative' }}>
        <div style={{ height: 120, background: 'radial-gradient(120% 160% at 80% 0%, rgba(219,144,255,0.4), transparent 60%), var(--accent-grad)', opacity: 0.9 }} />
        <div style={{ position: 'absolute', top: 14, right: 16 }}>
          <button className="btn-icon" onClick={() => nav('onboarding')} style={{ background: 'rgba(20,20,23,0.4)', backdropFilter: 'blur(8px)' }}><Icon name="settings" size={19} stroke={2} /></button>
        </div>
        <div style={{ padding: '0 20px', marginTop: -42 }}>
          <Img ns={ns} slot="avatar" shape="circle" radius={42} ph="Photo" style={{ width: 84, height: 84, border: '4px solid var(--bg)' }} />
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 10 }}>
            <div>
              <h1 className="display" style={{ fontSize: 30, color: 'var(--text)' }}>{u.username}</h1>
              <div className="small" style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}><Icon name="mail" size={13} stroke={2} />{u.email}</div>
            </div>
            <span className="badge badge-accent" style={{ textTransform: 'none', fontSize: 12, padding: '6px 11px' }}><Icon name="target" size={13} stroke={2.2} />{m.goal}</span>
          </div>
        </div>
      </div>

      <Pad style={{ marginTop: 20 }}>
        {/* quick metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10 }}>
          {[[m.weight, 'kg', 'Weight'], [m.height, 'cm', 'Height'], [m.age, 'yr', 'Age'], [m.bodyFat, '%', 'Body fat']].map(([v, un, l]) => (
            <div key={l} className="card" style={{ padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 1 }}>
                <span className="num" style={{ fontSize: 21, color: 'var(--text)' }}>{v}</span>
                <span style={{ fontSize: 10, color: 'var(--text-mut)', fontWeight: 600 }}>{un}</span>
              </div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-mut)', marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* weight progress */}
        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div className="field-label" style={{ marginBottom: 6 }}>Weight progress · 12 wk</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="num" style={{ fontSize: 32, color: 'var(--text)' }}>{wNow}</span>
                <span style={{ fontSize: 14, color: 'var(--text-mut)', fontWeight: 700 }}>kg</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 13, fontWeight: 700, color: 'var(--success)' }}>
                  <Icon name="arrowUp" size={14} stroke={2.6} />+{wDelta} kg
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 10 }}><LineChart data={DB.WEIGHT_TREND} height={96} /></div>
        </div>

        {/* body measurements */}
        <div className="card" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div className="field-label" style={{ margin: 0 }}>Body measurements</div>
            <Icon name="ruler" size={16} stroke={2} color="var(--text-mut)" />
          </div>
          {[['Biceps', m.biceps, 'cm'], ['Chest', m.chest, 'cm'], ['Waist', m.waist, 'cm'], ['Body fat', m.bodyFat, '%']].map(([l, v, un], i) => (
            <div key={l} style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}>
              <MetricEditRow label={l} value={v} unit={un} onEdit={() => {}} />
            </div>
          ))}
        </div>

        {/* profile attributes */}
        <div className="card" style={{ marginTop: 16 }}>
          <div className="field-label" style={{ marginBottom: 4 }}>Profile</div>
          {[['Gender', m.gender, 'user'], ['Birth date', 'Mar 22, 1994', 'calendar'], ['Activity level', m.activity, 'bolt'], ['Goal', m.goal, 'target']].map(([l, v, ic], i) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 0', borderTop: i ? '1px solid var(--line)' : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'var(--surface-3)', display: 'grid', placeItems: 'center', color: 'var(--text-2)' }}>
                <Icon name={ic} size={16} stroke={2} />
              </div>
              <span className="small" style={{ flex: 1, fontWeight: 700, color: 'var(--text-2)' }}>{l}</span>
              <span className="small" style={{ fontWeight: 700, color: 'var(--text)' }}>{v}</span>
              <Icon name="chevR" size={16} stroke={2} color="var(--text-faint)" />
            </div>
          ))}
        </div>

        <button className="btn btn-ghost btn-block" style={{ marginTop: 16, color: 'var(--error)', borderColor: 'var(--error-soft)' }} onClick={() => nav('onboarding')}>
          Log out
        </button>
      </Pad>
    </Screen>
  );
}

Object.assign(window, { ProfileScreen });
