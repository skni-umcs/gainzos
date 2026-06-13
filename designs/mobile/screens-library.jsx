/* ============================================================
   GainzOS — Exercise library: types · list · detail (video)
   ============================================================ */

function ForceBadge({ force }) {
  const map = { Push: 'var(--accent-br)', Pull: '#7dd3fc', Static: 'var(--text-2)' };
  return (
    <span className="badge" style={{ textTransform: 'none', fontWeight: 700, fontSize: 10.5, color: map[force] || 'var(--text-2)', background: 'var(--surface-3)' }}>
      <span style={{ width: 5, height: 5, borderRadius: 999, background: map[force] || 'var(--text-2)' }} />{force}
    </span>
  );
}

function LibraryScreen({ nav, ns = 'lib' }) {
  return (
    <Screen>
      <AppHeader ns={ns} onProfile={() => nav('profile')} />
      <Pad>
        <div className="eyebrow" style={{ marginBottom: 4 }}>Explore</div>
        <h1 className="display" style={{ fontSize: 34, color: 'var(--text)', marginBottom: 16 }}>Exercise library</h1>
        <div style={{ position: 'relative', marginBottom: 22 }}>
          <Icon name="search" size={19} stroke={2.1} color="var(--text-mut)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          <input className="input" placeholder="Search exercises…" style={{ paddingLeft: 42 }} />
        </div>
        <SectionHead title="Categories" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {DB.TYPES.map(t => (
            <div key={t.id} onClick={() => nav('exerciseList', { type: t.id })} style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', aspectRatio: '1 / 0.92' }}>
              <Img ns={ns} slot={t.slot} radius={18} ph=" " scrim scrimStrength={0.9} style={{ position: 'absolute', inset: 0 }}>
                <div style={{ position: 'absolute', left: 14, bottom: 12, right: 12 }}>
                  <div className="display" style={{ fontSize: 22, color: '#fff' }}>{t.name}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.04em' }}>{t.count} exercises</div>
                </div>
              </Img>
            </div>
          ))}
        </div>
      </Pad>
    </Screen>
  );
}

function ExerciseRow({ ex, ns, nav }) {
  return (
    <div onClick={() => nav('exerciseDetail', { id: ex.id })} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', cursor: 'pointer' }}>
      <Img ns={ns} slot={ex.slot} radius={14} ph="" style={{ width: 60, height: 60 }}>
        {ex.video && <div style={{ position: 'absolute', right: 6, bottom: 6, width: 20, height: 20, borderRadius: 999, background: 'rgba(20,20,23,0.78)', display: 'grid', placeItems: 'center' }}><Icon name="play" size={11} fill={true} color="#fff" /></div>}
      </Img>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="h3" style={{ color: 'var(--text)' }}>{ex.name}</div>
        <div className="small" style={{ marginTop: 3, display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ color: 'var(--text-2)' }}>{ex.primary}</span>
          <span style={{ color: 'var(--text-faint)' }}>·</span>
          <span>{ex.secondary}</span>
        </div>
      </div>
      <ForceBadge force={ex.force} />
    </div>
  );
}

function ExerciseListScreen({ nav, ns = 'exl', type = 'chest' }) {
  const t = DB.TYPES.find(x => x.id === type) || DB.TYPES[0];
  const [loading, setLoading] = React.useState(true);
  const [force, setForce] = React.useState('All');
  React.useEffect(() => { const id = setTimeout(() => setLoading(false), 1100); return () => clearTimeout(id); }, []);
  let list = DB.EX.filter(e => e.type === type);
  if (force !== 'All') list = list.filter(e => e.force === force);
  return (
    <div style={{ height: '100%' }}>
      <BackHeader title={t.name} onBack={() => nav('library')} right={<button className="btn-icon"><Icon name="filter" size={18} stroke={2.1} /></button>} />
      <Screen>
        <Pad>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8, paddingBottom: 6 }}>
            {['All', 'Push', 'Pull', 'Static'].map(f => <Chip key={f} label={f} active={force === f} onClick={() => setForce(f)} />)}
          </div>
          {loading ? (
            <div>{Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}</div>
          ) : list.length === 0 ? (
            <EmptyState icon="search" title="No matches" body="No exercises match this filter. Try a different force type." />
          ) : (
            <div>
              {list.map((ex, i) => (
                <div key={ex.id} style={{ borderTop: i ? '1px solid var(--line)' : 'none' }}>
                  <ExerciseRow ex={ex} ns={ns} nav={nav} />
                </div>
              ))}
            </div>
          )}
        </Pad>
      </Screen>
    </div>
  );
}

function VideoHero({ ns, ex }) {
  const [playing, setPlaying] = React.useState(false);
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setT(p => (p >= 100 ? (setPlaying(false), 0) : p + 1.4)), 60);
    return () => clearInterval(id);
  }, [playing]);
  return (
    <Img ns={ns} slot={ex.slot} radius={0} ph="Exercise demo" scrim={!playing} scrimStrength={0.75} style={{ width: '100%', height: 300 }}>
      {/* center play / pause */}
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'auto' }}>
        <button onClick={() => setPlaying(p => !p)} style={{
          width: 66, height: 66, borderRadius: 999, border: 'none', cursor: 'pointer',
          background: 'rgba(20,20,23,0.55)', backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.25)',
          display: 'grid', placeItems: 'center', transition: 'transform .15s ease',
        }}>
          <Icon name={playing ? 'pause' : 'play'} size={26} fill={true} color="#fff" style={{ marginLeft: playing ? 0 : 3 }} />
        </button>
      </div>
      {ex.video && (
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14, pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontVariantNumeric: 'tabular-nums' }}>0:{String(Math.floor(t / 100 * 24)).padStart(2, '0')}</span>
            <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: t + '%', background: 'var(--accent-grad)', borderRadius: 999 }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>0:24</span>
          </div>
        </div>
      )}
      <div style={{ position: 'absolute', top: 14, right: 14 }}>
        <span className="badge" style={{ background: 'rgba(20,20,23,0.6)', backdropFilter: 'blur(6px)', color: 'var(--accent-br)' }}>
          <Icon name="play" size={11} fill={true} />Demo video
        </span>
      </div>
    </Img>
  );
}

function ExerciseDetailScreen({ nav, ns = 'exd', id = 'bench' }) {
  const ex = DB.exById(id) || DB.EX[0];
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BackHeader transparent onBack={() => nav('library')} right={<button className="btn-icon" style={{ background: 'rgba(20,20,23,0.55)', backdropFilter: 'blur(8px)' }}><Icon name="plus" size={20} stroke={2.4} /></button>} />
      <Screen>
        <VideoHero ns={ns} ex={ex} />
        <Pad style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <ForceBadge force={ex.force} />
            <span className="badge" style={{ textTransform: 'capitalize', fontWeight: 700, background: 'var(--surface-3)', color: 'var(--text-2)' }}>{ex.type}</span>
          </div>
          <h1 className="display" style={{ fontSize: 34, color: 'var(--text)' }}>{ex.name}</h1>
          <p className="body" style={{ marginTop: 12, textWrap: 'pretty' }}>{ex.desc}</p>

          <div style={{ margin: '22px 0' }}>
            <div className="field-label">Targeted muscles</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <MusclePill name={ex.primary} />
              <MusclePill name={ex.secondary} secondary />
            </div>
          </div>

          <div className="card" style={{ background: 'var(--surface-2)' }}>
            <div className="field-label" style={{ marginBottom: 12 }}>How to perform</div>
            <ol style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(DB.CUES[ex.id] || [ex.desc]).map((s, i) => (
                <li key={i} style={{ display: 'flex', gap: 12 }}>
                  <span className="num" style={{ width: 24, height: 24, borderRadius: 8, background: 'var(--accent-soft)', color: 'var(--accent-br)', display: 'grid', placeItems: 'center', fontSize: 13, flexShrink: 0 }}>{i + 1}</span>
                  <span className="small" style={{ color: 'var(--text-2)', lineHeight: 1.5 }}>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Pad>
      </Screen>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, background: 'linear-gradient(to top, var(--bg) 70%, transparent)' }}>
        <button className="btn btn-primary btn-block btn-lg" onClick={() => nav('templateBuilder', {})}>
          <Icon name="plus" size={18} stroke={2.6} />Add to template
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { LibraryScreen, ExerciseListScreen, ExerciseDetailScreen, ForceBadge });
