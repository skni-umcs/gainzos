/* ============================================================
   GainzOS — Templates: list · detail · builder
   ============================================================ */

function GroupChips({ groups, max }) {
  const show = max ? groups.slice(0, max) : groups;
  const extra = max && groups.length > max ? groups.length - max : 0;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {show.map(g => <span key={g} className="badge" style={{ textTransform: 'none', fontWeight: 600, fontSize: 11 }}>{g}</span>)}
      {extra > 0 && <span className="badge" style={{ textTransform: 'none' }}>+{extra}</span>}
    </div>
  );
}

function TemplateCard({ tpl, ns, nav }) {
  return (
    <div onClick={() => nav('templateDetail', { id: tpl.id })} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
      <Img ns={ns} slot={tpl.slot} radius={0} ph="Template cover" scrim scrimStrength={0.86} style={{ width: '100%', height: 116 }}>
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span className="badge" style={{ background: 'rgba(20,20,23,0.7)', backdropFilter: 'blur(6px)', color: tpl.public ? 'var(--accent-br)' : 'var(--text-2)' }}>
            <Icon name={tpl.public ? 'globe' : 'lock'} size={12} stroke={2.2} />{tpl.public ? 'Public' : 'Private'}
          </span>
        </div>
        <div style={{ position: 'absolute', left: 14, bottom: 12, right: 14 }}>
          <div className="display" style={{ fontSize: 24, color: '#fff' }}>{tpl.name}</div>
        </div>
      </Img>
      <div style={{ padding: 14 }}>
        <p className="small" style={{ color: 'var(--text-2)', marginBottom: 12, textWrap: 'pretty' }}>{tpl.desc}</p>
        <GroupChips groups={tpl.groups} max={3} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12, color: 'var(--text-mut)', fontSize: 12.5, fontWeight: 600 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="list" size={15} stroke={2.2} />{tpl.items.length} exercises</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon name="dumbbell" size={15} stroke={2.2} />{tpl.items.reduce((a, i) => a + i.sets, 0)} sets</span>
        </div>
      </div>
    </div>
  );
}

function TemplatesScreen({ nav, ns = 'tpl' }) {
  const [tab, setTab] = React.useState('all');
  const list = DB.TEMPLATES.filter(t => tab === 'all' || (tab === 'public' ? t.public : !t.public));
  return (
    <Screen>
      <AppHeader ns={ns} onProfile={() => nav('profile')} />
      <Pad>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>Your library</div>
            <h1 className="display" style={{ fontSize: 34, color: 'var(--text)' }}>Templates</h1>
          </div>
          <button className="btn btn-primary" style={{ padding: '11px 16px' }} onClick={() => nav('templateBuilder', {})}>
            <Icon name="plus" size={18} stroke={2.6} />New
          </button>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
          {[['all', 'All'], ['public', 'Public'], ['private', 'Private']].map(([id, l]) => (
            <Chip key={id} label={l} active={tab === id} onClick={() => setTab(id)} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {list.map(t => <TemplateCard key={t.id} tpl={t} ns={ns} nav={nav} />)}
        </div>
      </Pad>
    </Screen>
  );
}

function TemplateDetailScreen({ nav, ns = 'tpld', id = 'push-a' }) {
  const tpl = DB.tplById(id) || DB.TEMPLATES[0];
  const sets = tpl.items.reduce((a, i) => a + i.sets, 0);
  const est = Math.round(tpl.items.reduce((a, i) => a + i.sets * (i.rest + 40), 0) / 60);
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BackHeader transparent onBack={() => nav('templates')} right={
        <button className="btn-icon" style={{ background: 'rgba(20,20,23,0.55)', backdropFilter: 'blur(8px)' }}><Icon name="edit" size={19} stroke={2.1} /></button>
      } />
      <Screen>
        <Img ns={ns} slot={tpl.slot} radius={0} ph="Template cover" scrim scrimStrength={0.95} style={{ width: '100%', height: 240 }}>
          <div style={{ position: 'absolute', left: 20, right: 20, bottom: 18 }}>
            <div style={{ marginBottom: 8 }}>
              <span className="badge" style={{ background: 'rgba(20,20,23,0.6)', backdropFilter: 'blur(6px)', color: tpl.public ? 'var(--accent-br)' : 'var(--text-2)' }}>
                <Icon name={tpl.public ? 'globe' : 'lock'} size={12} stroke={2.2} />{tpl.public ? 'Public' : 'Private'}
              </span>
            </div>
            <h1 className="display" style={{ fontSize: 38, color: '#fff' }}>{tpl.name}</h1>
          </div>
        </Img>
        <Pad style={{ marginTop: 18 }}>
          <p className="body" style={{ textWrap: 'pretty' }}>{tpl.desc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, margin: '18px 0' }}>
            {[[tpl.items.length, 'Exercises'], [sets, 'Total sets'], ['~' + est, 'Minutes']].map(([v, l]) => (
              <div key={l} className="card" style={{ padding: 14, textAlign: 'center' }}>
                <div className="num" style={{ fontSize: 24, color: 'var(--text)' }}>{v}</div>
                <div className="small" style={{ fontSize: 11 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 18 }}>
            <div className="field-label">Target muscle groups</div>
            <GroupChips groups={tpl.groups} />
          </div>
          <SectionHead title="Exercises" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tpl.items.map((it, i) => {
              const ex = DB.exById(it.ex);
              return (
                <div key={i} onClick={() => nav('exerciseDetail', { id: ex.id })} className="card" style={{ display: 'flex', alignItems: 'center', gap: 13, padding: 12, cursor: 'pointer' }}>
                  <div className="num" style={{ fontSize: 15, color: 'var(--text-mut)', width: 18, textAlign: 'center' }}>{i + 1}</div>
                  <Img ns={ns} slot={ex.slot} radius={12} ph="" style={{ width: 48, height: 48 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="h3" style={{ color: 'var(--text)' }}>{ex.name}</div>
                    <div className="small" style={{ marginTop: 2 }}>{it.sets} × {it.reps || it.duration + 's'}{it.weight ? ' × ' + it.weight + 'kg' : ''}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-mut)', fontSize: 12, fontWeight: 600 }}>
                    <Icon name="timer" size={14} stroke={2.2} />{it.rest}s
                  </div>
                </div>
              );
            })}
          </div>
        </Pad>
      </Screen>
      {/* sticky start */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, background: 'linear-gradient(to top, var(--bg) 70%, transparent)' }}>
        <button className="btn btn-primary btn-block btn-lg" onClick={() => nav('workout', { templateId: tpl.id, fresh: true })}>
          <Icon name="play" size={18} fill={true} />Start workout
        </button>
      </div>
    </div>
  );
}

/* ---------------- Template builder ---------------- */
function Stepper({ value, onDec, onInc, unit, w = 70 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button onClick={onDec} className="btn-icon" style={{ width: 30, height: 30, background: 'var(--surface-3)' }}><Icon name="minus" size={15} stroke={2.6} /></button>
      <div style={{ width: w, textAlign: 'center' }}>
        <span className="num" style={{ fontSize: 18, color: 'var(--text)' }}>{value}</span>
        {unit && <span style={{ fontSize: 11, color: 'var(--text-mut)', fontWeight: 600, marginLeft: 2 }}>{unit}</span>}
      </div>
      <button onClick={onInc} className="btn-icon" style={{ width: 30, height: 30, background: 'var(--surface-3)' }}><Icon name="plus" size={15} stroke={2.6} /></button>
    </div>
  );
}

function TemplateBuilderScreen({ nav, ns = 'tplb' }) {
  const [name, setName] = React.useState('');
  const [groups, setGroups] = React.useState(['Chest']);
  const [items, setItems] = React.useState([
    { ex: 'bench', sets: 4, reps: 8, rest: 120, weight: 80 },
    { ex: 'incline', sets: 3, reps: 10, rest: 90, weight: 28 },
  ]);
  const [picker, setPicker] = React.useState(false);

  const toggleGroup = g => setGroups(p => p.includes(g) ? p.filter(x => x !== g) : [...p, g]);
  const upd = (i, k, d, min = 0, step = 1) => setItems(p => p.map((it, idx) => idx === i ? { ...it, [k]: Math.max(min, it[k] + d * step) } : it));
  const addEx = id => { setItems(p => [...p, { ex: id, sets: 3, reps: 10, rest: 90, weight: 20 }]); setPicker(false); };
  const removeEx = i => setItems(p => p.filter((_, idx) => idx !== i));

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <BackHeader title="New template" onBack={() => nav('templates')} />
      <Screen style={{ paddingBottom: 100 }}>
        <Pad>
          <div style={{ marginBottom: 18 }}>
            <label className="field-label">Template name</label>
            <input className="input" placeholder="e.g. Push Day A" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label className="field-label">Target muscle groups</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {Object.keys(DB.MUSCLES).map(g => <Chip key={g} label={g} active={groups.includes(g)} onClick={() => toggleGroup(g)} />)}
            </div>
          </div>
          <SectionHead title={`Exercises · ${items.length}`} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((it, i) => {
              const ex = DB.exById(it.ex);
              return (
                <div key={i} className="card" style={{ padding: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <Img ns={ns} slot={ex.slot} radius={11} ph="" style={{ width: 44, height: 44 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="h3" style={{ color: 'var(--text)' }}>{ex.name}</div>
                      <div className="small" style={{ marginTop: 1 }}>{ex.primary}</div>
                    </div>
                    <button onClick={() => removeEx(i)} className="btn-icon" style={{ width: 32, height: 32, background: 'transparent' }}><Icon name="x" size={17} stroke={2.2} color="var(--text-mut)" /></button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {[['Sets', 'sets', '', 1, 1], ['Reps', 'reps', '', 1, 1], ['Rest', 'rest', 's', 0, 15], ['Weight', 'weight', 'kg', 0, 2.5]].map(([label, key, unit, min, step]) => (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
                        <span className="small" style={{ fontWeight: 700, color: 'var(--text-2)' }}>{label}</span>
                        <Stepper value={it[key]} unit={unit} onDec={() => upd(i, key, -1, min, step)} onInc={() => upd(i, key, 1, min, step)} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <button className="btn btn-ghost btn-block" onClick={() => setPicker(true)} style={{ borderStyle: 'dashed' }}>
              <Icon name="plus" size={18} stroke={2.4} />Add exercise
            </button>
          </div>
        </Pad>
      </Screen>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, background: 'linear-gradient(to top, var(--bg) 70%, transparent)' }}>
        <button className="btn btn-primary btn-block btn-lg" onClick={() => nav('templates')} disabled={!items.length}>
          <Icon name="check" size={18} stroke={2.6} />Save template
        </button>
      </div>

      {/* exercise picker sheet */}
      {picker && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 50, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div onClick={() => setPicker(false)} style={{ position: 'absolute', inset: 0, background: 'var(--scrim)' }} />
          <div className="rise" style={{ position: 'relative', background: 'var(--surface-1)', borderRadius: '24px 24px 0 0', borderTop: '1px solid var(--line-2)', maxHeight: '74%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px 10px' }}>
              <div style={{ width: 40, height: 4, borderRadius: 999, background: 'var(--surface-4)', margin: '0 auto 14px' }} />
              <h2 className="h2" style={{ color: 'var(--text)' }}>Add exercise</h2>
            </div>
            <div className="noscroll" style={{ overflowY: 'auto', padding: '4px 12px 20px' }}>
              {DB.EX.map(ex => (
                <div key={ex.id} onClick={() => addEx(ex.id)} style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '10px 8px', borderRadius: 14, cursor: 'pointer' }}>
                  <Img ns={ns + '-pick'} slot={ex.slot} radius={11} ph="" style={{ width: 44, height: 44 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="h3" style={{ color: 'var(--text)' }}>{ex.name}</div>
                    <div className="small" style={{ marginTop: 1 }}>{ex.primary} · {ex.type}</div>
                  </div>
                  <Icon name="plus" size={20} stroke={2.4} color="var(--accent-br)" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { TemplatesScreen, TemplateDetailScreen, TemplateBuilderScreen });
