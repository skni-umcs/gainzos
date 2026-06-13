/* ============================================================
   GainzOS — Shared UI primitives + icon set
   Exports to window. Loaded after React + theme.css.
   ============================================================ */

/* ---------------- Icons (24x24 stroke, currentColor) ---------------- */
const ICONS = {
  home: 'M3 10.8 12 3l9 7.8M5 9.5V21h5v-6h4v6h5V9.5',
  dumbbell: 'M6.5 6.5v11M3.5 9v6M17.5 6.5v11M20.5 9v6M6.5 12h11',
  layers: 'M12 3 3 8l9 5 9-5-9-5ZM3 13l9 5 9-5M3 8v0',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0',
  play: 'M7 5.5v13l11-6.5-11-6.5Z',
  pause: 'M8 5v14M16 5v14',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  check: 'M5 12.5 10 17.5 19.5 6.5',
  chevR: 'M9 6l6 6-6 6',
  chevL: 'M15 6l-6 6 6 6',
  chevD: 'M6 9l6 6 6-6',
  x: 'M6 6l12 12M18 6 6 18',
  clock: 'M12 7v5l3.5 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4',
  edit: 'M4 20h4L18.5 9.5a2 2 0 0 0-2.8-2.8L5 17.2V20ZM14.5 7.5l2.8 2.8',
  flame: 'M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.7-2.5 1.5-3.2C9 9.5 10.5 7 12 3Z',
  arrowUp: 'M12 19V5M6 11l6-6 6 6',
  arrowDown: 'M12 5v14M6 13l6 6 6-6',
  lock: 'M6 11V8a6 6 0 0 1 12 0v3M5 11h14v9H5v-9Z',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z',
  trophy: 'M7 4h10v4a5 5 0 0 1-10 0V4ZM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 17h6M10 17l.5-3h3l.5 3M8 21h8',
  calendar: 'M4 7h16v13H4V7ZM8 3v4M16 3v4M4 11h16',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 13.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 6.7 19.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H2a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 3.7 6.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3 1.6 1.6 0 0 0 1-1.5V2a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8 1.6 1.6 0 0 0 1.5 1H22a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z',
  mail: 'M3 6h18v12H3V6ZM3 7l9 6 9-6',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01',
  scale: 'M5 7h14l2 12H3L5 7ZM9 7a3 3 0 0 1 6 0',
  ruler: 'M5 9 9 5l10 10-4 4L5 9ZM8 8l1.5 1.5M11 11l1.5 1.5M14 14l1.5 1.5',
  heart: 'M12 20s-7-4.6-7-9.5A3.5 3.5 0 0 1 12 7a3.5 3.5 0 0 1 7 3.5C19 15.4 12 20 12 20Z',
  dots: 'M12 6h.01M12 12h.01M12 18h.01',
  filter: 'M3 5h18l-7 8v5l-4 2v-7L3 5Z',
  camera: 'M4 8h3l2-2h6l2 2h3v11H4V8ZM12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  bolt: 'M13 3 4 14h6l-1 7 9-11h-6l1-7Z',
  timer: 'M12 8v5l3 2M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM9 2h6M12 4v2',
  reps: 'M3 12h4l2-6 4 14 2-8h6',
  weight: 'M7 9h10l1.5 9h-13L7 9ZM9.5 9V7a2.5 2.5 0 0 1 5 0v2',
  fire: 'M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.7-2.5 1.5-3.2C9 9.5 10.5 7 12 3Z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  grid: 'M4 4h7v7H4V4ZM13 4h7v7h-7V4ZM4 13h7v7H4v-7ZM13 13h7v7h-7v-7Z',
  pencilStat: 'M4 20h4L18.5 9.5a2 2 0 0 0-2.8-2.8L5 17.2V20Z',
  google: 'M21 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.1a4.4 4.4 0 0 1-1.9 2.9v2.4h3.1c1.8-1.7 2.7-4.1 2.7-7.1Z',
  apple: 'M16 3c.1 1.2-.4 2.3-1.1 3.1-.7.9-1.9 1.5-3 1.4-.1-1.1.4-2.3 1.1-3 .7-.8 2-1.4 3-1.5ZM19 17c-.5 1.2-.8 1.7-1.5 2.7-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9s-2.3.9-3.7.9c-1.6 0-2.8-1.6-3.8-2.9C0 16.5-.3 11 1.8 8.3 3 6.8 4.7 6 6.4 6c1.6 0 2.7 1 3.9 1 1.2 0 2-1 3.9-1 1.4 0 2.9.8 4 2.1-3.5 1.9-2.9 6.9.8 8.9Z',
};

function Icon({ name, size = 22, stroke = 2, fill = false, style, color }) {
  const d = ICONS[name];
  const solid = ['play', 'pause', 'flame', 'fire', 'bolt'].includes(name) && fill !== false ? true : fill;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={solid ? 'currentColor' : 'none'}
      stroke={solid ? 'none' : 'currentColor'}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ color, display: 'block', flexShrink: 0, ...style }}>
      <path d={d} />
    </svg>
  );
}

/* ---------------- Image slot wrapper ---------------- */
function Img({ ns, slot, ph = 'Drop image', radius = 14, shape = 'rounded', fit = 'cover', style, scrim = false, scrimStrength = 0.92, children, className }) {
  const id = ns ? `${ns}__${slot}` : slot;
  const showText = ph && ph.trim();
  return (
    <div className={className} style={{
      position: 'relative', overflow: 'hidden', borderRadius: radius,
      background: 'linear-gradient(140deg, var(--surface-2), var(--surface-3))',
      ...style,
    }}>
      <image-slot
        id={id} placeholder={showText ? ph : ' '} shape={shape} radius={String(radius)} fit={fit}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'var(--text-mut)', fontSize: showText ? undefined : 0 }}
      ></image-slot>
      {scrim && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: radius,
          background: `linear-gradient(to top, rgba(8,8,10,${scrimStrength}) 0%, rgba(8,8,10,${scrimStrength * 0.45}) 38%, rgba(8,8,10,0) 72%)`,
        }} />
      )}
      {children != null && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>{children}</div>
      )}
    </div>
  );
}

/* ---------------- Progress ring (animated SVG) ---------------- */
function Ring({ value = 0, max = 100, size = 132, stroke = 11, label, sub, color = 'url(#ringGrad)', track = 'var(--surface-3)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, value / max));
  const [draw, setDraw] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setDraw(pct), 80);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-br)" />
            <stop offset="100%" stopColor="var(--accent-deep)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c}
          strokeDashoffset={c * (1 - draw)}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.3,.7,.2,1)' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 1,
      }}>
        {children || (<>
          <div className="num" style={{ fontSize: size * 0.30, color: 'var(--text)' }}>{label}</div>
          {sub && <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-mut)' }}>{sub}</div>}
        </>)}
      </div>
    </div>
  );
}

/* ---------------- Progress bar ---------------- */
function Bar({ value = 0, max = 100, color, height = 8 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="progress" style={{ height }}>
      <i style={{ width: `${pct}%`, background: color || 'var(--accent-grad)' }} />
    </div>
  );
}

/* ---------------- Stat tile ---------------- */
function StatTile({ icon, value, unit, label, delta, deltaUp, accent }) {
  return (
    <div className="card" style={{ padding: 16, background: 'var(--surface-1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        {icon && (
          <div style={{
            width: 34, height: 34, borderRadius: 10, display: 'grid', placeItems: 'center',
            background: accent ? 'var(--accent-soft)' : 'var(--surface-3)',
            color: accent ? 'var(--accent-br)' : 'var(--text-2)',
          }}>
            <Icon name={icon} size={18} stroke={2} />
          </div>
        )}
        {delta != null && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 700,
            color: deltaUp ? 'var(--success)' : 'var(--error)',
          }}>
            <Icon name={deltaUp ? 'arrowUp' : 'arrowDown'} size={13} stroke={2.6} />{delta}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span className="num" style={{ fontSize: 30, color: 'var(--text)' }}>{value}</span>
        {unit && <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-mut)' }}>{unit}</span>}
      </div>
      <div className="small" style={{ marginTop: 2 }}>{label}</div>
    </div>
  );
}

/* ---------------- Section header ---------------- */
function SectionHead({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
      <h2 className="h2" style={{ color: 'var(--text)' }}>{title}</h2>
      {action && (
        <button onClick={onAction} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          color: 'var(--accent-br)', fontSize: 13.5, fontWeight: 700, fontFamily: 'var(--font-body)',
          display: 'inline-flex', alignItems: 'center', gap: 2,
        }}>{action}<Icon name="chevR" size={15} stroke={2.4} /></button>
      )}
    </div>
  );
}

/* ---------------- Chip ---------------- */
function Chip({ label, active, onClick, icon }) {
  return (
    <button className={'chip' + (active ? ' is-active' : '')} onClick={onClick}>
      {icon && <Icon name={icon} size={14} stroke={2.2} />}{label}
    </button>
  );
}

/* ---------------- Empty state ---------------- */
function EmptyState({ icon = 'dumbbell', title, body, cta, onCta }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: 72, height: 72, borderRadius: 22, display: 'grid', placeItems: 'center',
        background: 'var(--accent-grad-soft)', color: 'var(--accent-br)',
        border: '1px solid var(--accent-line)', marginBottom: 8,
      }}>
        <Icon name={icon} size={32} stroke={1.8} />
      </div>
      <h3 className="h3" style={{ color: 'var(--text)' }}>{title}</h3>
      <p className="small" style={{ maxWidth: 240, textWrap: 'pretty' }}>{body}</p>
      {cta && <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={onCta}>{cta}</button>}
    </div>
  );
}

/* ---------------- Loading list skeleton ---------------- */
function SkeletonRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0' }}>
      <div className="skeleton" style={{ width: 56, height: 56, borderRadius: 14 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton" style={{ width: '62%', height: 14, borderRadius: 6, marginBottom: 8 }} />
        <div className="skeleton" style={{ width: '40%', height: 11, borderRadius: 6 }} />
      </div>
    </div>
  );
}

/* ---------------- Muscle pill ---------------- */
function MusclePill({ name, secondary }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 11px', borderRadius: 999,
      fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
      background: secondary ? 'var(--surface-3)' : 'var(--accent-soft)',
      color: secondary ? 'var(--text-2)' : 'var(--accent-br)',
      border: '1px solid ' + (secondary ? 'transparent' : 'var(--accent-line)'),
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: secondary ? 'var(--text-mut)' : 'var(--accent)' }} />
      {name}
    </span>
  );
}

/* ---------------- Mini bar chart ---------------- */
function MiniBars({ data, color = 'var(--accent-grad)', height = 92, labels, highlightLast }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
          <div style={{
            width: '100%', borderRadius: 5,
            height: `${(v / max) * 100}%`,
            background: (highlightLast && i === data.length - 1) ? 'var(--accent-grad)' : (i === data.length - 1 ? color : 'var(--surface-4)'),
            transition: 'height .7s cubic-bezier(.3,.7,.2,1)',
          }} />
          {labels && <span style={{ fontSize: 9, color: 'var(--text-faint)', fontWeight: 600 }}>{labels[i]}</span>}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Line chart (SVG, smooth) ---------------- */
function LineChart({ data, height = 120, color = 'var(--accent-br)', fill = true }) {
  const w = 320, pad = 8;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => [pad + i * step, height - pad - ((v - min) / range) * (height - pad * 2)]);
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = path + ` L${pts[pts.length - 1][0]} ${height} L${pts[0][0]} ${height} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lcFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.32" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill="url(#lcFill)" />}
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => i === pts.length - 1 && (
        <circle key={i} cx={p[0]} cy={p[1]} r="4" fill={color} stroke="var(--bg)" strokeWidth="2.5" />
      ))}
    </svg>
  );
}

Object.assign(window, {
  Icon, ICONS, Img, Ring, Bar, StatTile, SectionHead, Chip, EmptyState,
  SkeletonRow, MusclePill, MiniBars, LineChart,
});
