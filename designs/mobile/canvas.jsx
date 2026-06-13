/* ============================================================
   GainzOS — Canvas overview: every screen as a static phone
   ============================================================ */
const noop = () => {};

function Phone({ screen, ns, tab, tabActive, ...props }) {
  let view;
  switch (screen) {
    case 'onboarding': view = <OnboardingScreen nav={noop} ns={ns} start={props.start} />; break;
    case 'home': view = <HomeScreen nav={noop} ns={ns} variant={props.variant} />; break;
    case 'workout': view = <WorkoutScreen nav={noop} ns={ns} templateId={props.templateId} frozen />; break;
    case 'workoutDone': view = <WorkoutDoneScreen nav={noop} ns={ns} templateId={props.templateId} elapsed={props.elapsed} />; break;
    case 'templates': view = <TemplatesScreen nav={noop} ns={ns} />; break;
    case 'templateDetail': view = <TemplateDetailScreen nav={noop} ns={ns} id={props.id} />; break;
    case 'templateBuilder': view = <TemplateBuilderScreen nav={noop} ns={ns} />; break;
    case 'library': view = <LibraryScreen nav={noop} ns={ns} />; break;
    case 'exerciseList': view = <ExerciseListScreen nav={noop} ns={ns} type={props.type} />; break;
    case 'exerciseDetail': view = <ExerciseDetailScreen nav={noop} ns={ns} id={props.id} />; break;
    case 'analytics': view = <AnalyticsScreen nav={noop} ns={ns} />; break;
    case 'profile': view = <ProfileScreen nav={noop} ns={ns} />; break;
    default: view = null;
  }
  return (
    <AndroidDevice dark>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
        <div style={{ flex: 1, minHeight: 0 }}>{view}</div>
        {tab && <TabBar active={tabActive} onTab={noop} />}
      </div>
    </AndroidDevice>
  );
}

const AW = 432, AH = 912;

function CanvasApp() {
  const A = (id, label, child) => (
    <DCArtboard id={id} label={label} width={AW} height={AH}>{child}</DCArtboard>
  );
  return (
    <DesignCanvas>
      <DCSection id="onboarding" title="Onboarding & Auth" subtitle="Login, register, and the metrics-collection step.">
        {A('ob-login', 'Log in', <Phone screen="onboarding" ns="cv-obl" start="login" />)}
        {A('ob-register', 'Sign up', <Phone screen="onboarding" ns="cv-obr" start="register" />)}
        {A('ob-metrics', 'Metrics step', <Phone screen="onboarding" ns="cv-obm" start="metrics" />)}
      </DCSection>

      <DCSection id="home" title="Home / Dashboard" subtitle="Three layout variants — toggle these live in the prototype's Tweaks.">
        {A('home-rings', 'A · Focus rings', <Phone screen="home" ns="cv-h1" variant="rings" tab tabActive="home" />)}
        {A('home-hero', 'B · Hero CTA', <Phone screen="home" ns="cv-h2" variant="hero" tab tabActive="home" />)}
        {A('home-editorial', 'C · Editorial', <Phone screen="home" ns="cv-h3" variant="editorial" tab tabActive="home" />)}
      </DCSection>

      <DCSection id="workout" title="Workout — active session" subtitle="The headline screen: live clock, per-set logging, driven rest timer + completion.">
        {A('wk-active', 'Active session', <Phone screen="workout" ns="cv-wk" templateId="push-a" />)}
        {A('wk-done', 'Session complete', <Phone screen="workoutDone" ns="cv-wkd" templateId="push-a" elapsed={3192} />)}
      </DCSection>

      <DCSection id="templates" title="Templates" subtitle="List, detail, and the builder/creator flow.">
        {A('tpl-list', 'Template list', <Phone screen="templates" ns="cv-tpl" tab tabActive="templates" />)}
        {A('tpl-detail', 'Template detail', <Phone screen="templateDetail" ns="cv-tpld" id="push-a" />)}
        {A('tpl-builder', 'Template builder', <Phone screen="templateBuilder" ns="cv-tplb" />)}
      </DCSection>

      <DCSection id="library" title="Exercise library" subtitle="Illustrated categories → list → image-forward detail with demo video.">
        {A('lib-types', 'Categories', <Phone screen="library" ns="cv-lib" tab tabActive="" />)}
        {A('lib-list', 'Exercise list', <Phone screen="exerciseList" ns="cv-exl" type="chest" />)}
        {A('lib-detail', 'Exercise detail', <Phone screen="exerciseDetail" ns="cv-exd" id="bench" />)}
      </DCSection>

      <DCSection id="insights" title="Analytics & Profile" subtitle="Trends, muscle-group distribution, and body metrics.">
        {A('an', 'Analytics', <Phone screen="analytics" ns="cv-an" tab tabActive="analytics" />)}
        {A('pf', 'Profile', <Phone screen="profile" ns="cv-pf" tab tabActive="profile" />)}
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CanvasApp />);
