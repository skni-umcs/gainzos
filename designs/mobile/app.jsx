/* ============================================================
   GainzOS — Prototype app shell: navigation + tweaks
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeLayout": "rings",
  "accent": ["#ce75fa", "#db90ff", "#894bff"],
  "jump": "home"
}/*EDITMODE-END*/;

// which screens keep the bottom tab bar
const TAB_SCREENS = ['home', 'templates', 'analytics', 'profile', 'library'];
// map any screen to the tab it belongs under (for highlight)
const TAB_OF = {
  home: 'home', templates: 'templates', templateDetail: 'templates', templateBuilder: 'templates',
  analytics: 'analytics', profile: 'profile',
  workout: 'workout', workoutDone: 'workout',
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState({ screen: 'home', params: {} });

  // apply accent tweak -> CSS vars (rings/charts/gradients all read these)
  React.useEffect(() => {
    const [a, br, deep] = t.accent || TWEAK_DEFAULTS.accent;
    const r = document.documentElement.style;
    r.setProperty('--accent', a);
    r.setProperty('--accent-br', br);
    r.setProperty('--accent-deep', deep);
    r.setProperty('--accent-grad', `linear-gradient(135deg, ${br} 0%, ${deep} 100%)`);
    r.setProperty('--accent-glow', `0 10px 34px -10px ${deep}aa`);
  }, [t.accent]);

  // jump tweak
  React.useEffect(() => { if (t.jump) setRoute({ screen: t.jump, params: {} }); }, [t.jump]);

  const nav = React.useCallback((screen, params = {}) => {
    setRoute({ screen, params });
    // scroll handled per-screen (each Screen is its own scroll container)
  }, []);

  const onTab = (id) => {
    if (id === 'workout') nav('workout', { templateId: 'push-a' });
    else nav(id, {});
  };

  const ns = 'g'; // shared namespace -> dropped images persist across all screens
  const s = route.screen, p = route.params;
  let view;
  switch (s) {
    case 'home': view = <HomeScreen nav={nav} ns={ns} variant={t.homeLayout} />; break;
    case 'workout': view = <WorkoutScreen nav={nav} ns={ns} templateId={p.templateId} />; break;
    case 'workoutDone': view = <WorkoutDoneScreen nav={nav} ns={ns} templateId={p.templateId} elapsed={p.elapsed} />; break;
    case 'templates': view = <TemplatesScreen nav={nav} ns={ns} />; break;
    case 'templateDetail': view = <TemplateDetailScreen nav={nav} ns={ns} id={p.id} />; break;
    case 'templateBuilder': view = <TemplateBuilderScreen nav={nav} ns={ns} />; break;
    case 'library': view = <LibraryScreen nav={nav} ns={ns} />; break;
    case 'exerciseList': view = <ExerciseListScreen nav={nav} ns={ns} type={p.type} />; break;
    case 'exerciseDetail': view = <ExerciseDetailScreen nav={nav} ns={ns} id={p.id} />; break;
    case 'analytics': view = <AnalyticsScreen nav={nav} ns={ns} />; break;
    case 'profile': view = <ProfileScreen nav={nav} ns={ns} />; break;
    case 'onboarding': view = <OnboardingScreen nav={nav} ns={ns} />; break;
    default: view = <HomeScreen nav={nav} ns={ns} variant={t.homeLayout} />;
  }
  const showTab = TAB_SCREENS.includes(s);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <AndroidDevice dark>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
          <div key={s} className="screen-anim" style={{ flex: 1, minHeight: 0 }}>{view}</div>
          {showTab && <TabBar active={TAB_OF[s] || ''} onTab={onTab} />}
        </div>
      </AndroidDevice>

      <TweaksPanel>
        <TweakSection label="Home layout" />
        <TweakRadio label="Variant" value={t.homeLayout}
          options={['rings', 'hero', 'editorial']}
          onChange={v => setTweak('homeLayout', v)} />
        <TweakSection label="Brand accent" />
        <TweakColor label="Purple" value={t.accent}
          options={[['#ce75fa', '#db90ff', '#894bff'], ['#b07cff', '#c9a4ff', '#6d3bff'], ['#d96bf0', '#ef9bff', '#a23bff']]}
          onChange={v => setTweak('accent', v)} />
        <TweakSection label="Navigate" />
        <TweakSelect label="Jump to screen" value={t.jump}
          options={['onboarding', 'home', 'workout', 'workoutDone', 'templates', 'templateDetail', 'templateBuilder', 'library', 'exerciseList', 'exerciseDetail', 'analytics', 'profile']}
          onChange={v => setTweak('jump', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
