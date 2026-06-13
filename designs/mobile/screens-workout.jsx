/* ============================================================
   GainzOS — Active Workout session (headline screen)
   Live elapsed clock · per-set logging · driven rest timer
   ============================================================ */

function SetRow({ idx, set, done, onToggle }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '34px 1fr 1fr 46px', alignItems: 'center', gap: 8,
      padding: '9px 12px', borderRadius: 12,
      background: done ? 'var(--accent-soft)' : 'var(--surface-3)',
      border: '1px solid ' + (done ? 'var(--accent-line)' : 'transparent'),
      transition: 'background .2s ease, border-color .2s ease',
    }}>
      <div className="num" style={{ fontSize: 16, color: done ? 'var(--accent-br)' : 'var(--text-mut)', textAlign: 'center' }}>{idx + 1}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="num" style={{ fontSize: 17, color: 'var(--text)' }}>{set.weight ? set.weight : '—'}</span>
        <span style={{ fontSize: 11, color: 'var(--text-mut)', fontWeight: 600 }}>{set.weight ? 'kg' : ''}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="num" style={{ fontSize: 17, color: 'var(--text)' }}>{set.reps ? set.reps : set.duration + 's'}</span>
        <span style={{ fontSize: 11, color: 'var(--text-mut)', fontWeight: 600 }}>{set.reps ? 'reps' : ''}</span>
      </div>
      <button onClick={onToggle} style={{
        justifySelf: 'end', width: 34, height: 34, borderRadius: 10, cursor: 'pointer',
        border: '1.5px solid ' + (done ? 'transparent' : 'var(--line-strong)'),
        background: done ? 'var(--accent-grad)' : 'transparent',
        display: 'grid', placeItems: 'center', transition: 'all .15s ease',
      }}>
        <Icon name="check" size={18} stroke={3} color={done ? '#fff' : 'var(--text-faint)'} />
      </button>
    </div>
  );
}

function WorkoutExercise({ item, ns, done, onToggleSet, current }) {
  const ex = DB.exById(item.ex);
  const sets = Array.from({ length: item.sets }, () => ({ reps: item.reps, weight: item.weight, duration: item.duration }));
  const completed = done.filter(Boolean).length;
  return (
    <div className="card" style={{
      padding: 14, borderColor: current ? 'var(--accent-line)' : 'var(--line)',
      boxShadow: current ? '0 0 0 1px var(--accent-line)' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <Img ns={ns} slot={ex.slot} radius={13} ph="" style={{ width: 50, height: 50 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="h3" style={{ color: 'var(--text)' }}>{ex.name}</div>
          <div className="small" style={{ marginTop: 2 }}>{ex.primary} · {item.sets}×{item.reps || item.duration + 's'}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="num" style={{ fontSize: 16, color: completed === item.sets ? 'var(--success)' : 'var(--text-2)' }}>{completed}/{item.sets}</div>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mut)' }}>sets</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sets.map((s, i) => (
          <SetRow key={i} idx={i} set={s} done={done[i]} onToggle={() => onToggleSet(i, item.rest)} />
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: 'var(--text-mut)', fontSize: 12, fontWeight: 600 }}>
        <Icon name="timer" size={14} stroke={2.2} />Rest {item.rest}s between sets
      </div>
    </div>
  );
}

function RestTimer({ rest, onSkip, onAdd, onDone }) {
  const { remaining, total } = rest;
  React.useEffect(() => { if (remaining <= 0) onDone(); }, [remaining]);
  return (
    <div className="rise" style={{
      position: 'absolute', left: 12, right: 12, bottom: 12, zIndex: 40,
      background: 'rgba(24,24,28,0.94)', backdropFilter: 'blur(20px)',
      border: '1px solid var(--accent-line)', borderRadius: 22, padding: 16,
      display: 'flex', alignItems: 'center', gap: 16, boxShadow: 'var(--sh-3)',
    }}>
      <Ring value={remaining} max={total} size={74} stroke={7}>
        <div className="num" style={{ fontSize: 22, color: 'var(--text)' }}>{remaining}</div>
      </Ring>
      <div style={{ flex: 1 }}>
        <div className="eyebrow" style={{ color: 'var(--accent-br)' }}>Rest</div>
        <div className="display" style={{ fontSize: 22, color: 'var(--text)' }}>Recover</div>
        <div className="small" style={{ marginTop: 1 }}>Next set in {remaining}s</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={onAdd} className="btn-icon" style={{ width: 38, height: 38, background: 'var(--surface-3)' }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text)' }}>+15</span>
        </button>
        <button onClick={onSkip} className="btn-icon" style={{ width: 38, height: 38, background: 'var(--accent-grad)' }}>
          <Icon name="play" size={16} fill={true} color="#fff" />
        </button>
      </div>
    </div>
  );
}

function WorkoutScreen({ nav, ns = 'wk', templateId = 'push-a', frozen }) {
  const tpl = DB.tplById(templateId) || DB.TEMPLATES[0];
  const totalSets = tpl.items.reduce((a, it) => a + it.sets, 0);

  const [elapsed, setElapsed] = React.useState(() => {
    if (frozen) return 1937;
    const s = Number(localStorage.getItem('gainzos-wk-elapsed') || 0);
    return s || 0;
  });
  const [running, setRunning] = React.useState(!frozen);
  const [doneMap, setDoneMap] = React.useState(() => {
    if (frozen) return { 0: [true, true, true, false], 1: [true, false, false] };
    try { return JSON.parse(localStorage.getItem('gainzos-wk-done') || '{}'); } catch { return {}; }
  });
  const [rest, setRest] = React.useState(null);

  // elapsed clock
  React.useEffect(() => {
    if (!running || frozen) return;
    const t = setInterval(() => setElapsed(e => {
      const n = e + 1; localStorage.setItem('gainzos-wk-elapsed', n); return n;
    }), 1000);
    return () => clearInterval(t);
  }, [running, frozen]);

  // rest countdown
  React.useEffect(() => {
    if (!rest || frozen) return;
    const t = setInterval(() => setRest(r => r ? { ...r, remaining: r.remaining - 1 } : r), 1000);
    return () => clearInterval(t);
  }, [rest, frozen]);

  const completedSets = Object.values(doneMap).reduce((a, arr) => a + (arr ? arr.filter(Boolean).length : 0), 0);

  const toggleSet = (exIdx, setIdx, restSecs) => {
    setDoneMap(prev => {
      const arr = (prev[exIdx] || []).slice();
      arr[setIdx] = !arr[setIdx];
      const next = { ...prev, [exIdx]: arr };
      localStorage.setItem('gainzos-wk-done', JSON.stringify(next));
      if (arr[setIdx] && !frozen) setRest({ remaining: restSecs, total: restSecs });
      return next;
    });
  };

  const curExIdx = tpl.items.findIndex((it, i) => {
    const arr = doneMap[i] || [];
    return arr.filter(Boolean).length < it.sets;
  });

  return (
    <div style={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* header */}
      <div style={{ padding: '12px 16px 14px', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn-icon" onClick={() => nav('home')}><Icon name="chevD" size={22} stroke={2.2} /></button>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div className="eyebrow" style={{ color: 'var(--accent-br)' }}>Active session</div>
            <div className="h3" style={{ color: 'var(--text)' }}>{tpl.name}</div>
          </div>
          <button className="btn-icon" onClick={() => setRunning(r => !r)} style={{ background: 'var(--surface-3)' }}>
            <Icon name={running ? 'pause' : 'play'} size={18} fill={!running} stroke={2.4} />
          </button>
        </div>
        {/* live stats strip */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <div style={{ flex: 1, background: 'var(--surface-2)', borderRadius: 14, padding: '10px 12px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-mut)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Icon name="clock" size={13} stroke={2.2} />Elapsed</div>
            <div className="num" style={{ fontSize: 26, color: 'var(--text)', marginTop: 2 }}>{DB.fmtClock(elapsed)}</div>
          </div>
          <div style={{ flex: 1, background: 'var(--surface-2)', borderRadius: 14, padding: '10px 12px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-mut)', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <Icon name="check" size={13} stroke={2.6} />Sets</div>
            <div className="num" style={{ fontSize: 26, color: 'var(--text)', marginTop: 2 }}>{completedSets}<span style={{ color: 'var(--text-mut)', fontSize: 18 }}>/{totalSets}</span></div>
          </div>
        </div>
        <div style={{ marginTop: 12 }}><Bar value={completedSets} max={totalSets} height={6} /></div>
      </div>

      {/* exercise list */}
      <div className="noscroll" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 120px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {tpl.items.map((it, i) => (
            <WorkoutExercise key={i} item={it} ns={ns} done={doneMap[i] || []} current={i === curExIdx}
              onToggleSet={(setIdx, restSecs) => toggleSet(i, setIdx, restSecs)} />
          ))}
        </div>
        <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 18 }}
          onClick={() => { localStorage.removeItem('gainzos-wk-elapsed'); localStorage.removeItem('gainzos-wk-done'); nav('workoutDone', { templateId: tpl.id, elapsed }); }}>
          <Icon name="check" size={19} stroke={2.6} />Finish & log workout
        </button>
      </div>

      {rest && <RestTimer rest={rest} onSkip={() => setRest(null)} onDone={() => setRest(null)} onAdd={() => setRest(r => ({ remaining: r.remaining + 15, total: r.total + 15 }))} />}
    </div>
  );
}

/* simple completion summary */
function WorkoutDoneScreen({ nav, ns = 'wk', templateId = 'push-a', elapsed = 3120 }) {
  const tpl = DB.tplById(templateId) || DB.TEMPLATES[0];
  const vol = tpl.items.reduce((a, it) => a + it.sets * it.reps * (it.weight || 0), 0);
  return (
    <Screen>
      <div style={{ padding: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="rise" style={{ width: 92, height: 92, borderRadius: 30, background: 'var(--accent-grad)', display: 'grid', placeItems: 'center', boxShadow: 'var(--accent-glow)', marginBottom: 18 }}>
          <Icon name="check" size={48} stroke={3} color="#fff" />
        </div>
        <div className="eyebrow">Session complete</div>
        <h1 className="display" style={{ fontSize: 36, color: 'var(--text)', marginTop: 6 }}>Crushed it.</h1>
        <p className="body" style={{ marginTop: 6, maxWidth: 260, textWrap: 'pretty' }}>{tpl.name} logged. Recovery starts now.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 26, width: '100%' }}>
          {[['clock', DB.fmtClock(elapsed), 'Duration'], ['weight', (vol / 1000).toFixed(1) + 't', 'Volume'], ['list', tpl.items.length, 'Exercises']].map(([ic, v, l]) => (
            <div key={l} className="card" style={{ padding: 14 }}>
              <Icon name={ic} size={18} stroke={2.2} color="var(--accent-br)" style={{ margin: '0 auto 8px' }} />
              <div className="num" style={{ fontSize: 22, color: 'var(--text)' }}>{v}</div>
              <div className="small" style={{ fontSize: 11 }}>{l}</div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 26 }} onClick={() => nav('home')}>Back to home</button>
        <button className="btn btn-ghost btn-block" style={{ marginTop: 10 }} onClick={() => nav('analytics')}>View analytics</button>
      </div>
    </Screen>
  );
}

Object.assign(window, { WorkoutScreen, WorkoutDoneScreen });
