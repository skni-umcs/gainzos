/* ============================================================
   GainzOS — Mock data (mirrors backend fields exactly)
   Exposes window.DB
   ============================================================ */
(function () {
  // ---- Muscle groups: 24, grouped ----
  const MUSCLES = {
    Chest:     ['Upper Chest', 'Middle Chest', 'Lower Chest'],
    Back:      ['Upper Back', 'Middle Back', 'Lower Back', 'Lats', 'Traps'],
    Shoulders: ['Front Delts', 'Side Delts', 'Rear Delts'],
    Arms:      ['Biceps', 'Triceps', 'Forearms'],
    Legs:      ['Quads', 'Hamstrings', 'Glutes', 'Calves', 'Hip Flexors', 'Adductors', 'Abductors'],
    Core:      ['Abs', 'Obliques', 'Core'],
  };
  const MUSCLE_FLAT = Object.values(MUSCLES).flat(); // 24

  // ---- Exercise types (categories) — each carries an image ----
  const TYPES = [
    { id: 'chest',     name: 'Chest',     count: 18, slot: 'cat-chest' },
    { id: 'back',      name: 'Back',      count: 22, slot: 'cat-back' },
    { id: 'legs',      name: 'Legs',      count: 26, slot: 'cat-legs' },
    { id: 'shoulders', name: 'Shoulders', count: 15, slot: 'cat-shoulders' },
    { id: 'arms',      name: 'Arms',      count: 20, slot: 'cat-arms' },
    { id: 'core',      name: 'Core',      count: 14, slot: 'cat-core' },
  ];

  // ---- Exercises: name, description, force, primary, secondary, type, image, video ----
  const EX = [
    { id: 'bench',    name: 'Barbell Bench Press',  type: 'chest', force: 'Push',
      primary: 'Middle Chest', secondary: 'Triceps',
      desc: 'Lie flat on the bench, grip slightly wider than shoulders, lower the bar to mid-chest and press up under control.',
      slot: 'ex-bench', video: true },
    { id: 'incline',  name: 'Incline Dumbbell Press', type: 'chest', force: 'Push',
      primary: 'Upper Chest', secondary: 'Front Delts',
      desc: 'Set the bench to ~30°. Press dumbbells from shoulder level to lockout, keeping elbows at 45°.',
      slot: 'ex-incline', video: true },
    { id: 'fly',      name: 'Cable Fly',            type: 'chest', force: 'Push',
      primary: 'Lower Chest', secondary: 'Front Delts',
      desc: 'Hinge slightly forward, sweep handles together in a wide arc, squeeze at the midline.',
      slot: 'ex-fly', video: false },
    { id: 'pullup',   name: 'Pull-Up',              type: 'back', force: 'Pull',
      primary: 'Lats', secondary: 'Biceps',
      desc: 'Hang from the bar, pull the chest toward the bar by driving elbows down and back.',
      slot: 'ex-pullup', video: true },
    { id: 'row',      name: 'Barbell Row',          type: 'back', force: 'Pull',
      primary: 'Middle Back', secondary: 'Lats',
      desc: 'Hinge to ~45°, row the bar to your lower ribs, keep a neutral spine throughout.',
      slot: 'ex-row', video: true },
    { id: 'pulldown', name: 'Lat Pulldown',         type: 'back', force: 'Pull',
      primary: 'Lats', secondary: 'Biceps',
      desc: 'Pull the bar to the upper chest, drive elbows down, control the eccentric.',
      slot: 'ex-pulldown', video: false },
    { id: 'squat',    name: 'Back Squat',           type: 'legs', force: 'Push',
      primary: 'Quads', secondary: 'Glutes',
      desc: 'Bar on upper traps, break at hips and knees together, descend to depth, drive up.',
      slot: 'ex-squat', video: true },
    { id: 'rdl',      name: 'Romanian Deadlift',    type: 'legs', force: 'Pull',
      primary: 'Hamstrings', secondary: 'Glutes',
      desc: 'Soft knees, hinge at the hips, slide the bar down the thighs, feel the stretch, drive hips forward.',
      slot: 'ex-rdl', video: true },
    { id: 'legpress', name: 'Leg Press',            type: 'legs', force: 'Push',
      primary: 'Quads', secondary: 'Glutes',
      desc: 'Feet shoulder-width on the platform, lower to 90°, press without locking the knees.',
      slot: 'ex-legpress', video: false },
    { id: 'ohp',      name: 'Overhead Press',       type: 'shoulders', force: 'Push',
      primary: 'Front Delts', secondary: 'Triceps',
      desc: 'Press the bar overhead from the front rack, brace the core, finish with biceps by the ears.',
      slot: 'ex-ohp', video: true },
    { id: 'lateral',  name: 'Lateral Raise',        type: 'shoulders', force: 'Pull',
      primary: 'Side Delts', secondary: 'Traps',
      desc: 'Slight bend in elbows, raise dumbbells to shoulder height, lead with the elbows.',
      slot: 'ex-lateral', video: false },
    { id: 'curl',     name: 'Dumbbell Curl',        type: 'arms', force: 'Pull',
      primary: 'Biceps', secondary: 'Forearms',
      desc: 'Elbows pinned to sides, curl the dumbbells, supinate at the top, lower under control.',
      slot: 'ex-curl', video: true },
    { id: 'pushdown', name: 'Triceps Pushdown',     type: 'arms', force: 'Push',
      primary: 'Triceps', secondary: 'Forearms',
      desc: 'Pin elbows to your sides, extend the rope to lockout, spread at the bottom.',
      slot: 'ex-pushdown', video: false },
    { id: 'plank',    name: 'Plank',                type: 'core', force: 'Static',
      primary: 'Abs', secondary: 'Core',
      desc: 'Forearms down, body in a straight line, brace abs and glutes, hold the position.',
      slot: 'ex-plank', video: false },
    { id: 'cablecrunch', name: 'Cable Crunch',      type: 'core', force: 'Pull',
      primary: 'Abs', secondary: 'Obliques',
      desc: 'Kneel beneath the rope, crunch the ribs toward the pelvis, control back to start.',
      slot: 'ex-cablecrunch', video: false },
  ];
  const exById = (id) => EX.find(e => e.id === id);

  // ---- Concise form cues per exercise (distinct from the overview desc) ----
  const CUES = {
    bench: ['Plant feet, squeeze shoulder blades back and down', 'Lower the bar to mid-chest with elbows ~45°', 'Press up and slightly back to lockout'],
    incline: ['Set the bench to roughly 30°', 'Press from shoulder level to lockout', 'Lower under control, feel the upper-chest stretch'],
    fly: ['Soft bend in the elbows, hinge slightly forward', 'Sweep the handles together in a wide arc', 'Squeeze hard at the midline, resist on the way back'],
    pullup: ['Start from a full dead hang', 'Drive elbows down and back toward the floor', 'Pull chest to the bar, lower with control'],
    row: ['Hinge to ~45° with a neutral spine', 'Row the bar to your lower ribs', 'Pause, then lower without rounding'],
    pulldown: ['Set a secure thigh pad, grip just outside shoulders', 'Pull the bar to the upper chest', 'Control the eccentric all the way up'],
    squat: ['Bar on upper traps, brace your core', 'Break at hips and knees together to depth', 'Drive through mid-foot to stand tall'],
    rdl: ['Soft knees, bar close to the thighs', 'Hinge at the hips, push them back', 'Feel the hamstring stretch, then drive hips forward'],
    legpress: ['Feet shoulder-width on the platform', 'Lower until knees reach ~90°', 'Press without locking the knees hard'],
    ohp: ['Brace core and glutes, bar in the front rack', 'Press overhead, move your head through', 'Finish with biceps by the ears'],
    lateral: ['Slight bend in the elbows, lead with the elbows', 'Raise to shoulder height, no higher', 'Lower slowly, keep tension on the side delts'],
    curl: ['Pin elbows to your sides', 'Curl up and supinate at the top', 'Lower under control, no swinging'],
    pushdown: ['Pin elbows, lean in slightly', 'Extend the rope to full lockout', 'Spread the rope at the bottom, control back up'],
    plank: ['Forearms down, elbows under shoulders', 'Body in one straight line, squeeze glutes', 'Brace abs and breathe steadily through the hold'],
    cablecrunch: ['Kneel under the rope, hips fixed', 'Crunch ribs toward the pelvis', 'Control back up, keep tension on the abs'],
  };

  // ---- Templates (with workout items: sets, reps, duration, rest, weight) ----
  const TEMPLATES = [
    {
      id: 'push-a', name: 'Push Day A',
      desc: 'Chest-led horizontal & vertical pressing with triceps finisher.',
      groups: ['Chest', 'Shoulders', 'Arms'], public: true, slot: 'tpl-push',
      items: [
        { ex: 'bench',    sets: 4, reps: 8,  duration: 0, rest: 120, weight: 80 },
        { ex: 'incline',  sets: 3, reps: 10, duration: 0, rest: 90,  weight: 28 },
        { ex: 'ohp',      sets: 3, reps: 8,  duration: 0, rest: 90,  weight: 45 },
        { ex: 'fly',      sets: 3, reps: 12, duration: 0, rest: 60,  weight: 16 },
        { ex: 'pushdown', sets: 3, reps: 14, duration: 0, rest: 60,  weight: 30 },
      ],
    },
    {
      id: 'pull-a', name: 'Pull Day A',
      desc: 'Vertical & horizontal pulling, biceps to finish.',
      groups: ['Back', 'Arms'], public: false, slot: 'tpl-pull',
      items: [
        { ex: 'pullup',   sets: 4, reps: 8,  duration: 0, rest: 120, weight: 0 },
        { ex: 'row',      sets: 4, reps: 10, duration: 0, rest: 90,  weight: 70 },
        { ex: 'pulldown', sets: 3, reps: 12, duration: 0, rest: 75,  weight: 55 },
        { ex: 'curl',     sets: 3, reps: 12, duration: 0, rest: 60,  weight: 14 },
      ],
    },
    {
      id: 'legs-a', name: 'Leg Day',
      desc: 'Squat-focused with posterior-chain accessory work.',
      groups: ['Legs', 'Core'], public: true, slot: 'tpl-legs',
      items: [
        { ex: 'squat',    sets: 5, reps: 5,  duration: 0, rest: 150, weight: 110 },
        { ex: 'rdl',      sets: 3, reps: 8,  duration: 0, rest: 120, weight: 90 },
        { ex: 'legpress', sets: 3, reps: 12, duration: 0, rest: 90,  weight: 180 },
        { ex: 'plank',    sets: 3, reps: 0,  duration: 45, rest: 45, weight: 0 },
      ],
    },
    {
      id: 'upper', name: 'Upper Body Power',
      desc: 'Full upper session blending push and pull.',
      groups: ['Chest', 'Back', 'Shoulders', 'Arms'], public: true, slot: 'tpl-upper',
      items: [
        { ex: 'bench',   sets: 4, reps: 6,  duration: 0, rest: 120, weight: 85 },
        { ex: 'row',     sets: 4, reps: 8,  duration: 0, rest: 90,  weight: 72 },
        { ex: 'ohp',     sets: 3, reps: 8,  duration: 0, rest: 90,  weight: 45 },
        { ex: 'lateral', sets: 3, reps: 15, duration: 0, rest: 45,  weight: 10 },
      ],
    },
  ];
  const tplById = (id) => TEMPLATES.find(t => t.id === id);

  // ---- Workout history (volume kg, duration s, template, date) ----
  const today = new Date('2026-06-13T08:12:00');
  const daysAgo = (n) => new Date(today.getTime() - n * 864e5);
  const WORKOUTS = [
    { id: 'w1', template: 'push-a', volume: 8420, duration: 3540, date: daysAgo(1) },
    { id: 'w2', template: 'pull-a', volume: 7110, duration: 3180, date: daysAgo(3) },
    { id: 'w3', template: 'legs-a', volume: 12600, duration: 4020, date: daysAgo(4) },
    { id: 'w4', template: 'upper',  volume: 9240, duration: 3360, date: daysAgo(6) },
    { id: 'w5', template: 'push-a', volume: 8050, duration: 3300, date: daysAgo(8) },
    { id: 'w6', template: 'legs-a', volume: 11980, duration: 3900, date: daysAgo(11) },
    { id: 'w7', template: 'pull-a', volume: 6890, duration: 3060, date: daysAgo(13) },
  ];

  // 12-week trend series (volume in thousands of kg, by week)
  const VOLUME_TREND = [21, 24, 23, 28, 26, 31, 29, 34, 33, 30, 37, 39];
  const DURATION_TREND = [142, 156, 150, 168, 160, 175, 171, 182, 178, 165, 190, 196]; // weekly minutes
  const CAL_TREND = [1820, 2010, 1960, 2240, 2150, 2380, 2300, 2520, 2470, 2280, 2640, 2710];
  const FREQ = [3, 4, 3, 4, 4, 5, 4, 5, 5, 3, 5, 5]; // workouts / week

  // muscle-group distribution from completed workouts (%)
  const MUSCLE_DIST = [
    { group: 'Legs', pct: 28 },
    { group: 'Back', pct: 22 },
    { group: 'Chest', pct: 19 },
    { group: 'Shoulders', pct: 14 },
    { group: 'Arms', pct: 11 },
    { group: 'Core', pct: 6 },
  ];

  // ---- User + metrics ----
  const USER = { username: 'marcus_lifts', email: 'marcus@gainzos.app', avatarSlot: 'avatar' };
  const METRICS = {
    gender: 'Male', birthDate: '1994-03-22', age: 32,
    weight: 82.4, height: 181, bodyFat: 14.8,
    biceps: 38.5, chest: 104, waist: 81,
    activity: 'Highly Active', goal: 'Gain Muscle',
  };
  const WEIGHT_TREND = [80.1, 80.4, 80.9, 81.2, 81.0, 81.6, 81.9, 82.1, 81.8, 82.0, 82.3, 82.4];

  // ---- Today's progress ----
  const TODAY = {
    greetingName: 'Marcus',
    calories: 1840, calorieGoal: 2700,
    workoutsDone: 1, workoutsPlanned: 2,
    streak: 6,
  };

  // ---- Quote ----
  const QUOTE = {
    text: 'The pain you feel today will be the strength you feel tomorrow.',
    author: 'Arnold Schwarzenegger',
  };

  const ACTIVITY_LEVELS = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Highly Active', 'Athlete'];
  const GOALS = ['Lose Weight', 'Maintain', 'Gain Muscle'];

  window.DB = {
    MUSCLES, MUSCLE_FLAT, TYPES, EX, exById, CUES, TEMPLATES, tplById,
    WORKOUTS, VOLUME_TREND, DURATION_TREND, CAL_TREND, FREQ, MUSCLE_DIST,
    USER, METRICS, WEIGHT_TREND, TODAY, QUOTE, ACTIVITY_LEVELS, GOALS,
    fmtDuration(s) {
      const m = Math.floor(s / 60), sec = s % 60;
      return `${m}:${String(sec).padStart(2, '0')}`;
    },
    fmtClock(s) {
      const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      return (h ? `${h}:${String(m).padStart(2,'0')}` : `${m}`) + `:${String(sec).padStart(2, '0')}`;
    },
    relDate(d) {
      const diff = Math.round((today - d) / 864e5);
      if (diff === 0) return 'Today';
      if (diff === 1) return 'Yesterday';
      if (diff < 7) return `${diff} days ago`;
      return `${Math.round(diff / 7)} wk ago`;
    },
  };
})();
