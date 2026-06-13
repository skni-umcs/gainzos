/* ============================================================
   GainzOS — Common screen chrome: Logo, AppHeader, BackHeader,
   TabBar, Screen scroll wrapper
   ============================================================ */

function Logo({ size = 26, showWord = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.32, background: 'var(--accent-grad)',
        display: 'grid', placeItems: 'center', boxShadow: 'var(--accent-glow)', flexShrink: 0,
      }}>
        <Icon name="bolt" size={size * 0.62} fill={true} color="#fff" />
      </div>
      {showWord && (
        <span className="display" style={{ fontSize: size * 0.86, letterSpacing: '0.01em', color: 'var(--text)' }}>
          GAINZ<span className="grad-text">OS</span>
        </span>
      )}
    </div>
  );
}

/* App header — brand left, avatar right */
function AppHeader({ ns = 'app', onProfile, right }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px 12px', position: 'sticky', top: 0, zIndex: 20,
      background: 'linear-gradient(to bottom, var(--bg) 70%, rgba(14,14,16,0))',
      backdropFilter: 'blur(4px)',
    }}>
      <Logo size={26} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {right}
        <button onClick={onProfile} style={{ padding: 0, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 999 }}>
          <Img ns={ns} slot="avatar" shape="circle" radius={19} ph=" " style={{ width: 38, height: 38, border: '1.5px solid var(--line-2)' }} />
        </button>
      </div>
    </div>
  );
}

/* Back / push-screen header */
function BackHeader({ title, onBack, right, transparent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px', position: transparent ? 'absolute' : 'sticky', top: 0, left: 0, right: 0, zIndex: 30,
      background: transparent ? 'transparent' : 'linear-gradient(to bottom, var(--bg) 78%, rgba(14,14,16,0))',
    }}>
      <button className="btn-icon" onClick={onBack} style={{
        background: transparent ? 'rgba(20,20,23,0.55)' : 'var(--surface-3)',
        backdropFilter: transparent ? 'blur(8px)' : 'none', width: 40, height: 40,
      }}>
        <Icon name="chevL" size={22} stroke={2.2} />
      </button>
      {title && <h2 className="h2" style={{ flex: 1, color: 'var(--text)' }}>{title}</h2>}
      {!title && <div style={{ flex: 1 }} />}
      {right}
    </div>
  );
}

/* Scrollable screen body */
function Screen({ children, pad = true, style }) {
  return (
    <div className="noscroll" style={{
      height: '100%', overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      padding: pad ? '0 0 24px' : 0, ...style,
    }}>
      {children}
    </div>
  );
}
function Pad({ children, style }) {
  return <div style={{ padding: '0 20px', ...style }}>{children}</div>;
}

/* Bottom tab bar — Home · Workout · Templates · Analytics · Profile */
const TABS = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'workout', label: 'Workout', icon: 'dumbbell' },
  { id: 'templates', label: 'Plans', icon: 'layers' },
  { id: 'analytics', label: 'Stats', icon: 'chart' },
  { id: 'profile', label: 'Profile', icon: 'user' },
];
function TabBar({ active, onTab }) {
  return (
    <div className="tabbar" style={{ padding: '8px 6px 6px' }}>
      {TABS.map(t => {
        const on = active === t.id;
        return (
          <button key={t.id} onClick={() => onTab(t.id)} style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            padding: '4px 0', color: on ? 'var(--accent-br)' : 'var(--text-mut)',
            transition: 'color .18s ease', position: 'relative',
          }}>
            <div style={{
              display: 'grid', placeItems: 'center', width: 46, height: 30, borderRadius: 999,
              background: on ? 'var(--accent-soft)' : 'transparent', transition: 'background .2s ease',
            }}>
              <Icon name={t.icon} size={21} stroke={on ? 2.4 : 2} />
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.02em' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { Logo, AppHeader, BackHeader, Screen, Pad, TabBar, TABS });
