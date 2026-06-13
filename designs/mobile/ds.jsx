/* ============================================================
   GainzOS — Design System reference page
   ============================================================ */

function Swatch({ name, value, hex, text = '#fff', border }) {
  return (
    <div>
      <div style={{
        height: 72, borderRadius: 14, background: value,
        border: border ? '1px solid var(--line-2)' : 'none',
        display: 'flex', alignItems: 'flex-end', padding: 10,
      }}>
        {text && <span style={{ fontSize: 11, fontWeight: 700, color: text, opacity: 0.9 }}> </span>}
      </div>
      <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{name}</div>
      <div style={{ fontSize: 11.5, color: 'var(--text-mut)', fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>{hex}</div>
    </div>
  );
}

function Panel({ title, sub, children, span }) {
  return (
    <section className="card" style={{ padding: 24, gridColumn: span ? `span ${span}` : 'auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h2 className="h2" style={{ color: 'var(--text)' }}>{title}</h2>
        {sub && <p className="small" style={{ marginTop: 4 }}>{sub}</p>}
      </div>
      {children}
    </section>
  );
}

function Label({ children }) {
  return <div className="eyebrow" style={{ marginBottom: 12 }}>{children}</div>;
}

function DSApp() {
  const [chip, setChip] = React.useState('Chest');
  const [tab, setTab] = React.useState('home');
  return (
    <div style={{ maxWidth: 1140, margin: '0 auto', padding: '56px 28px 96px' }}>
      {/* header */}
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <Logo size={40} />
          <h1 className="display" style={{ fontSize: 56, color: 'var(--text)', marginTop: 18 }}>DESIGN SYSTEM</h1>
          <p className="body" style={{ maxWidth: 560, marginTop: 8, fontSize: 16 }}>
            A dark, premium fitness system. Near-black surfaces layered for depth, a single purple accent for brand and action, and condensed type for power numbers.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="badge badge-accent">Dark theme</span>
          <span className="badge">Mobile · Portrait</span>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 32 }}>

        {/* COLORS */}
        <Panel title="Surfaces" sub="Depth comes from layered shades, not outlines." span={2}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            <Swatch name="Base" value="#0e0e10" hex="#0E0E10" border />
            <Swatch name="Surface 1" value="#161619" hex="#161619" border />
            <Swatch name="Surface 2" value="#1e1e23" hex="#1E1E23" border />
            <Swatch name="Surface 3" value="#292931" hex="#292931" border />
            <Swatch name="Surface 4" value="#34343d" hex="#34343D" border />
          </div>
        </Panel>

        <Panel title="Brand accent" sub="Purple only — the sole decorative color.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
            <Swatch name="Accent" value="#ce75fa" hex="#CE75FA" text="#15071f" />
            <Swatch name="Light" value="#db90ff" hex="#DB90FF" text="#15071f" />
            <Swatch name="Deep" value="#894bff" hex="#894BFF" />
          </div>
          <div style={{ height: 56, borderRadius: 14, background: 'var(--accent-grad)', display: 'flex', alignItems: 'center', paddingLeft: 16 }}>
            <span style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}>Gradient · 135° light → deep</span>
          </div>
        </Panel>

        <Panel title="Text & status" sub="Status colors are reserved for state — never decoration.">
          <Label>Text tiers</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
            {[['Primary', 'var(--text)', '#F6F5F8'], ['Secondary', 'var(--text-2)', '#B6B4C2'], ['Muted', 'var(--text-mut)', '#7B7989'], ['Faint', 'var(--text-faint)', '#54525E']].map(([l, c, h]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: c }}>{l} text</span>
                <span style={{ fontSize: 12, color: 'var(--text-mut)', fontFamily: 'var(--font-display)' }}>{h}</span>
              </div>
            ))}
          </div>
          <Label>Semantic</Label>
          <div style={{ display: 'flex', gap: 10 }}>
            <span className="badge badge-success"><Icon name="check" size={12} stroke={3} />Success</span>
            <span className="badge badge-error"><Icon name="x" size={12} stroke={3} />Error</span>
            <span className="badge badge-warning"><Icon name="flame" size={12} fill />Warning</span>
          </div>
        </Panel>

        {/* TYPOGRAPHY */}
        <Panel title="Typography" sub="Saira Condensed for display & numbers · Hanken Grotesk for body." span={2}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 32 }}>
            <div>
              <Label>Display · Saira Condensed</Label>
              <div className="num" style={{ fontSize: 84, color: 'var(--text)', lineHeight: 0.9 }}>1,840</div>
              <div className="display" style={{ fontSize: 40, color: 'var(--text)', marginTop: 4 }}>PUSH DAY A</div>
              <div style={{ display: 'flex', gap: 18, marginTop: 16, alignItems: 'baseline' }}>
                <span className="num" style={{ fontSize: 36, color: 'var(--accent-br)' }}>54:12</span>
                <span className="num" style={{ fontSize: 36, color: 'var(--text)' }}>355t</span>
                <span className="num" style={{ fontSize: 36, color: 'var(--text)' }}>14.8%</span>
              </div>
            </div>
            <div>
              <Label>Type scale</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Display', 'h1', 30], ['Heading', 'h2', 23], ['Title', 'h3', 17]].map(([l, cls, px]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                    <span className={cls} style={{ color: 'var(--text)' }}>{l}</span>
                    <span style={{ fontSize: 11, color: 'var(--text-mut)', fontFamily: 'var(--font-display)' }}>{px}px</span>
                  </div>
                ))}
                <p className="body" style={{ marginTop: 4 }}>Body — 15px Hanken Grotesk. High legibility on dark with dimmed secondary text for hierarchy.</p>
                <p className="small">Small / caption — 13px muted.</p>
                <div className="eyebrow">Eyebrow · 11px tracked</div>
              </div>
            </div>
          </div>
        </Panel>

        {/* SPACING + RADII */}
        <Panel title="Spacing & radii" sub="4px base scale · soft, generous corners.">
          <Label>Spacing</Label>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 24 }}>
            {[4, 8, 12, 16, 24, 32, 40].map(s => (
              <div key={s} style={{ textAlign: 'center' }}>
                <div style={{ width: 22, height: s, background: 'var(--accent-grad)', borderRadius: 4 }} />
                <div style={{ fontSize: 10, color: 'var(--text-mut)', marginTop: 6, fontFamily: 'var(--font-display)' }}>{s}</div>
              </div>
            ))}
          </div>
          <Label>Radii</Label>
          <div style={{ display: 'flex', gap: 12 }}>
            {[['sm', 11], ['md', 14], ['lg', 18], ['xl', 24], ['2xl', 30]].map(([l, r]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ width: 52, height: 52, background: 'var(--surface-3)', borderTopLeftRadius: r, border: '1px solid var(--line-2)' }} />
                <div style={{ fontSize: 10, color: 'var(--text-mut)', marginTop: 6, fontFamily: 'var(--font-display)' }}>{r}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Elevation">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[['Card · hairline', 'var(--sh-1)'], ['Raised', 'var(--sh-2)'], ['Overlay / sheet', 'var(--sh-3)'], ['Accent glow', 'var(--accent-glow)']].map(([l, sh]) => (
              <div key={l} style={{ height: 48, borderRadius: 14, background: 'var(--surface-2)', border: '1px solid var(--line)', boxShadow: sh, display: 'flex', alignItems: 'center', paddingLeft: 16, fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>{l}</div>
            ))}
          </div>
        </Panel>

        {/* COMPONENTS */}
        <Panel title="Buttons" sub="Pill-shaped. Gradient for primary action.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
            <button className="btn btn-primary"><Icon name="play" size={16} fill />Start training</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-ghost">Ghost</button>
            <button className="btn-icon"><Icon name="plus" size={20} stroke={2.4} /></button>
          </div>
        </Panel>

        <Panel title="Chips & badges">
          <Label>Filter chips</Label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {['Chest', 'Back', 'Legs', 'Arms'].map(c => <Chip key={c} label={c} active={chip === c} onClick={() => setChip(c)} />)}
          </div>
          <Label>Badges</Label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span className="badge badge-accent"><Icon name="globe" size={12} stroke={2.4} />Public</span>
            <span className="badge"><Icon name="lock" size={12} stroke={2.4} />Private</span>
            <ForceBadge force="Push" />
            <ForceBadge force="Pull" />
          </div>
        </Panel>

        <Panel title="Inputs">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="field-label">Email</label>
              <input className="input" defaultValue="marcus@gainzos.app" />
            </div>
            <div>
              <label className="field-label">Search</label>
              <div style={{ position: 'relative' }}>
                <Icon name="search" size={18} stroke={2.1} color="var(--text-mut)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
                <input className="input" placeholder="Search exercises…" style={{ paddingLeft: 42 }} />
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Progress">
          <Label>Bar</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <Bar value={68} max={100} />
            <Bar value={34} max={100} />
          </div>
          <Label>Rings</Label>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Ring value={68} max={100} size={96} stroke={9}><div className="num" style={{ fontSize: 26, color: 'var(--text)' }}>68%</div></Ring>
            <Ring value={1} max={2} size={96} stroke={9}><div className="num" style={{ fontSize: 28, color: 'var(--text)' }}>1<span style={{ color: 'var(--text-mut)', fontSize: 18 }}>/2</span></div></Ring>
          </div>
        </Panel>

        <Panel title="Stat tiles & data viz">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <StatTile icon="flame" value="1,840" unit="kcal" label="Calories" delta="12%" deltaUp accent />
            <StatTile icon="weight" value="355" unit="t" label="Volume" delta="18%" deltaUp />
          </div>
          <div className="card" style={{ background: 'var(--surface-2)', padding: 16 }}>
            <Label>Volume · 12 wk</Label>
            <LineChart data={DB.VOLUME_TREND} height={80} />
          </div>
        </Panel>

        <Panel title="List row & muscles">
          <div className="card" style={{ background: 'var(--surface-2)', padding: 14, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 13, background: 'var(--accent-grad-soft)', border: '1px solid var(--accent-line)', display: 'grid', placeItems: 'center', color: 'var(--accent-br)' }}><Icon name="dumbbell" size={24} stroke={2} /></div>
              <div style={{ flex: 1 }}>
                <div className="h3" style={{ color: 'var(--text)' }}>Barbell Bench Press</div>
                <div className="small" style={{ marginTop: 2 }}>Middle Chest · 4×8</div>
              </div>
              <Icon name="chevR" size={18} stroke={2} color="var(--text-faint)" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <MusclePill name="Middle Chest" />
            <MusclePill name="Triceps" secondary />
          </div>
        </Panel>

        <Panel title="Tab bar">
          <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid var(--line)' }}>
            <TabBar active={tab} onTab={setTab} />
          </div>
        </Panel>

        <Panel title="Empty & loading states">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'center' }}>
            <div className="card" style={{ background: 'var(--surface-2)', padding: 8 }}>
              <EmptyState icon="search" title="No matches" body="Try a different filter." />
            </div>
            <div className="card" style={{ background: 'var(--surface-2)' }}>
              <SkeletonRow /><SkeletonRow /><SkeletonRow />
            </div>
          </div>
        </Panel>

      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<DSApp />);
