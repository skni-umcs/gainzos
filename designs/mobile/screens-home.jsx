/* ============================================================
   GainzOS — Home / Dashboard  (3 layout variants for Tweaks)
   variant: 'rings' | 'hero' | 'editorial'
   ============================================================ */

function HomeGreeting({ ns }) {
  const d = new Date('2026-06-13T08:12:00');
  const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  return (
    <Pad>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Good morning</div>
          <h1 className="display" style={{ fontSize: 38, color: 'var(--text)' }}>{DB.TODAY.greetingName}</h1>
          <div className="small" style={{ marginTop: 4 }}>{dateStr}</div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 999, whiteSpace: 'nowrap',
          background: 'var(--surface-2)', border: '1px solid var(--line)',
        }}>
          <Icon name="fire" size={16} fill={true} color="var(--warning)" />
          <span className="num" style={{ fontSize: 17, color: 'var(--text)' }}>{DB.TODAY.streak}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-mut)' }}>days</span>
        </div>
      </div>
    </Pad>
  );
}

function StartCTA({ nav, big }) {
  const next = DB.tplById('push-a');
  return (
    <div onClick={() => nav('workout', { templateId: next.id, fresh: true })} style={{
      position: 'relative', borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
      padding: big ? '24px 22px' : '20px',
      background: 'radial-gradient(120% 140% at 0% 0%, rgba(219,144,255,0.28), transparent 55%), var(--accent-grad)',
      boxShadow: 'var(--accent-glow)',
    }}>
      <div style={{ position: 'absolute', right: -28, top: -28, opacity: 0.18, transform: 'rotate(-12deg)' }}>
        <Icon name="dumbbell" size={big ? 150 : 116} stroke={1.4} color="#fff" />
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Today’s session</div>
        <div className="display" style={{ fontSize: big ? 36 : 30, color: '#fff', marginTop: 6 }}>{next.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8, color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}><Icon name="list" size={15} stroke={2.2} />{next.items.length} exercises</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap' }}><Icon name="clock" size={15} stroke={2.2} />~52 min</span>
        </div>
        <div style={{
          marginTop: big ? 18 : 14, display: 'inline-flex', alignItems: 'center', gap: 9, whiteSpace: 'nowrap',
          background: '#fff', color: 'var(--accent-deep)', fontWeight: 800, fontSize: 15,
          padding: '13px 20px', borderRadius: 999,
        }}>
          <Icon name="play" size={17} fill={true} />Start training
        </div>
      </div>
    </div>
  );
}

function CalorieMod({ variant }) {
  const { calories, calorieGoal, workoutsDone, workoutsPlanned } = DB.TODAY;
  if (variant === 'rings') {
    return (
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-around' }}>
        <div style={{ textAlign: 'center' }}>
          <Ring value={calories} max={calorieGoal} size={112} stroke={10}>
            <div className="num" style={{ fontSize: 30, color: 'var(--text)' }}>{calories}</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mut)' }}>/ {calorieGoal} kcal</div>
          </Ring>
          <div className="small" style={{ marginTop: 8, fontWeight: 700, color: 'var(--text-2)' }}>Calories</div>
        </div>
        <div style={{ width: 1, height: 96, background: 'var(--line)' }} />
        <div style={{ textAlign: 'center' }}>
          <Ring value={workoutsDone} max={workoutsPlanned} size={112} stroke={10}>
            <div className="num" style={{ fontSize: 32, color: 'var(--text)' }}>{workoutsDone}<span style={{ color: 'var(--text-mut)', fontSize: 22 }}>/{workoutsPlanned}</span></div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mut)' }}>done</div>
          </Ring>
          <div className="small" style={{ marginTop: 8, fontWeight: 700, color: 'var(--text-2)' }}>Workouts</div>
        </div>
      </div>
    );
  }
  // bars layout (hero + editorial)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Icon name="fire" size={17} fill={true} color="var(--accent-br)" />
          <span className="small" style={{ fontWeight: 700, color: 'var(--text-2)' }}>Calories</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span className="num" style={{ fontSize: 28, color: 'var(--text)' }}>{calories.toLocaleString()}</span>
          <span style={{ fontSize: 12, color: 'var(--text-mut)', fontWeight: 600 }}>/{calorieGoal.toLocaleString()}</span>
        </div>
        <div style={{ marginTop: 12 }}><Bar value={calories} max={calorieGoal} /></div>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <Icon name="dumbbell" size={17} stroke={2.2} color="var(--accent-br)" />
          <span className="small" style={{ fontWeight: 700, color: 'var(--text-2)' }}>Workouts</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span className="num" style={{ fontSize: 28, color: 'var(--text)' }}>{workoutsDone}</span>
          <span style={{ fontSize: 12, color: 'var(--text-mut)', fontWeight: 600 }}>/{workoutsPlanned} planned</span>
        </div>
        <div style={{ marginTop: 12 }}><Bar value={workoutsDone} max={workoutsPlanned} /></div>
      </div>
    </div>
  );
}

function QuoteCard({ editorial }) {
  const q = DB.QUOTE;
  return (
    <div style={{
      position: 'relative', borderRadius: 20, padding: editorial ? '26px 22px' : '20px',
      background: editorial ? 'var(--accent-grad-soft)' : 'var(--surface-2)',
      border: '1px solid ' + (editorial ? 'var(--accent-line)' : 'var(--line)'), overflow: 'hidden',
    }}>
      <div className="display" style={{ position: 'absolute', top: -18, left: 10, fontSize: 110, lineHeight: 1, color: 'var(--accent)', opacity: 0.16 }}>“</div>
      <p style={{
        position: 'relative', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500,
        fontSize: editorial ? 22 : 18, lineHeight: 1.2, color: 'var(--text)', letterSpacing: '0.005em', textWrap: 'pretty',
      }}>{q.text}</p>
      <div style={{ marginTop: 12, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--accent-br)', textTransform: 'uppercase' }}>— {q.author}</div>
    </div>
  );
}

function RecentActivity({ nav, ns }) {
  return (
    <Pad>
      <SectionHead title="Recent activity" action="History" onAction={() => nav('analytics')} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {DB.WORKOUTS.slice(0, 3).map(w => {
          const t = DB.tplById(w.template);
          return (
            <div key={w.id} onClick={() => nav('templateDetail', { id: t.id })} className="card" style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: 12, cursor: 'pointer',
            }}>
              <Img ns={ns} slot={t.slot} radius={13} ph="" style={{ width: 52, height: 52 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="h3" style={{ color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.name}</div>
                <div className="small" style={{ marginTop: 2 }}>{DB.relDate(w.date)} · {Math.round(w.duration / 60)} min</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="num" style={{ fontSize: 18, color: 'var(--text)' }}>{(w.volume / 1000).toFixed(1)}t</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mut)' }}>volume</div>
              </div>
            </div>
          );
        })}
      </div>
    </Pad>
  );
}

function HomeScreen({ nav, ns = 'home', variant = 'rings' }) {
  return (
    <Screen>
      <AppHeader ns={ns} onProfile={() => nav('profile')} right={
        <button className="btn-icon" onClick={() => nav('library')}><Icon name="search" size={20} stroke={2.1} /></button>
      } />
      <div className="rise" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <HomeGreeting ns={ns} />

        {variant === 'hero' && <Pad><StartCTA nav={nav} big /></Pad>}

        <Pad><CalorieMod variant={variant} /></Pad>

        {variant !== 'hero' && <Pad><StartCTA nav={nav} /></Pad>}

        <Pad><QuoteCard editorial={variant === 'editorial'} /></Pad>

        <RecentActivity nav={nav} ns={ns} />
      </div>
    </Screen>
  );
}

Object.assign(window, { HomeScreen, StartCTA, QuoteCard });
