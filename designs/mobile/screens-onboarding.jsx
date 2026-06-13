/* ============================================================
   GainzOS — Onboarding / Auth: login · register · metrics
   ============================================================ */

function AuthField({ label, type = 'text', placeholder, icon }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div style={{ position: 'relative' }}>
        {icon && <Icon name={icon} size={18} stroke={2} color="var(--text-mut)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />}
        <input className="input" type={type} placeholder={placeholder} style={{ paddingLeft: icon ? 42 : 15 }} />
      </div>
    </div>
  );
}

function SocialRow() {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      {[['google', 'Google'], ['apple', 'Apple']].map(([ic, l]) => (
        <button key={l} className="btn btn-secondary" style={{ flex: 1 }}>
          <Icon name={ic} size={18} stroke={2} />{l}
        </button>
      ))}
    </div>
  );
}

function MetricsStep({ onDone }) {
  const [gender, setGender] = React.useState('Male');
  const [weight, setWeight] = React.useState(82);
  const [height, setHeight] = React.useState(181);
  const [activity, setActivity] = React.useState('Highly Active');
  const [goal, setGoal] = React.useState('Gain Muscle');

  const Slider = ({ label, value, set, min, max, unit }) => (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
        <label className="field-label" style={{ margin: 0 }}>{label}</label>
        <span><span className="num" style={{ fontSize: 22, color: 'var(--text)' }}>{value}</span><span style={{ fontSize: 12, color: 'var(--text-mut)', fontWeight: 600, marginLeft: 3 }}>{unit}</span></span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => set(+e.target.value)}
        style={{ width: '100%', accentColor: '#ce75fa', height: 6 }} />
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <label className="field-label">Gender</label>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Male', 'Female', 'Other'].map(g => <Chip key={g} label={g} active={gender === g} onClick={() => setGender(g)} />)}
        </div>
      </div>
      <div>
        <label className="field-label">Birth date</label>
        <input className="input" type="text" defaultValue="22 / 03 / 1994" />
      </div>
      <Slider label="Weight" value={weight} set={setWeight} min={40} max={160} unit="kg" />
      <Slider label="Height" value={height} set={setHeight} min={140} max={210} unit="cm" />
      <div>
        <label className="field-label">Activity level</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {DB.ACTIVITY_LEVELS.map(a => <Chip key={a} label={a} active={activity === a} onClick={() => setActivity(a)} />)}
        </div>
      </div>
      <div>
        <label className="field-label">Your goal</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[['Lose Weight', 'arrowDown'], ['Maintain', 'minus'], ['Gain Muscle', 'arrowUp']].map(([g, ic]) => {
            const on = goal === g;
            return (
              <button key={g} onClick={() => setGoal(g)} style={{
                display: 'flex', alignItems: 'center', gap: 13, padding: '15px 16px', borderRadius: 16, cursor: 'pointer',
                background: on ? 'var(--accent-soft)' : 'var(--surface-2)',
                border: '1.5px solid ' + (on ? 'var(--accent-line)' : 'var(--line)'), textAlign: 'left',
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: on ? 'var(--accent-grad)' : 'var(--surface-3)', display: 'grid', placeItems: 'center', color: on ? '#fff' : 'var(--text-2)' }}>
                  <Icon name={ic} size={19} stroke={2.4} />
                </div>
                <span className="h3" style={{ flex: 1, color: on ? 'var(--text)' : 'var(--text-2)' }}>{g}</span>
                <div style={{ width: 22, height: 22, borderRadius: 999, border: '2px solid ' + (on ? 'var(--accent)' : 'var(--line-strong)'), display: 'grid', placeItems: 'center' }}>
                  {on && <div style={{ width: 11, height: 11, borderRadius: 999, background: 'var(--accent)' }} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      <button className="btn btn-primary btn-block btn-lg" onClick={onDone}>
        <Icon name="check" size={18} stroke={2.6} />Start training
      </button>
    </div>
  );
}

function OnboardingScreen({ nav, ns = 'ob', start = 'login' }) {
  const [step, setStep] = React.useState(start); // login | register | metrics
  const steps = ['login', 'register', 'metrics'];

  if (step === 'metrics') {
    return (
      <div style={{ height: '100%' }}>
        <BackHeader title="About you" onBack={() => setStep('register')} />
        <Screen>
          <Pad>
            <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
              {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= 2 ? 'var(--accent)' : 'var(--surface-3)' }} />)}
            </div>
            <h1 className="display" style={{ fontSize: 30, color: 'var(--text)' }}>Let’s personalize</h1>
            <p className="body" style={{ margin: '6px 0 24px', textWrap: 'pretty' }}>We use these to calculate calories and tailor your plan.</p>
            <MetricsStep onDone={() => nav('home')} />
          </Pad>
        </Screen>
      </div>
    );
  }

  const isLogin = step === 'login';
  return (
    <Screen pad={false}>
      {/* hero */}
      <Img ns={ns} slot="auth-hero" radius={0} ph="Athlete hero" scrim scrimStrength={0.97} style={{ width: '100%', height: 300 }}>
        <div style={{ position: 'absolute', top: 24, left: 24 }}><Logo size={28} /></div>
        <div style={{ position: 'absolute', left: 24, right: 24, bottom: 22 }}>
          <h1 className="display" style={{ fontSize: 44, color: '#fff', lineHeight: 0.92 }}>TRAIN<br />WITH INTENT.</h1>
          <p style={{ margin: '10px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.78)', fontWeight: 500, maxWidth: 280 }}>Track every set, plan every session, watch every gain.</p>
        </div>
      </Img>

      <Pad style={{ marginTop: 26 }}>
        {/* tab toggle */}
        <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: 999, padding: 4, marginBottom: 24 }}>
          {[['login', 'Log in'], ['register', 'Sign up']].map(([id, l]) => (
            <button key={id} onClick={() => setStep(id)} style={{
              flex: 1, padding: '11px 0', borderRadius: 999, border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
              background: step === id ? 'var(--accent-grad)' : 'transparent',
              color: step === id ? '#fff' : 'var(--text-mut)', transition: 'all .2s ease',
            }}>{l}</button>
          ))}
        </div>

        <div className="rise" key={step} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {!isLogin && <AuthField label="Username" placeholder="marcus_lifts" icon="user" />}
          <AuthField label="Email" type="email" placeholder="you@gainzos.app" icon="mail" />
          <AuthField label="Password" type="password" placeholder="••••••••" icon="lock" />
          {isLogin && <button style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: 'var(--accent-br)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>Forgot password?</button>}

          <button className="btn btn-primary btn-block btn-lg" style={{ marginTop: 4 }}
            onClick={() => isLogin ? nav('home') : setStep('metrics')}>
            {isLogin ? 'Log in' : 'Continue'}<Icon name="chevR" size={18} stroke={2.4} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '6px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span className="small" style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          <SocialRow />
        </div>
      </Pad>
    </Screen>
  );
}

Object.assign(window, { OnboardingScreen });
