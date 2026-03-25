# Design System Strategy: The Kinetic Nocturne

This design system is a sophisticated framework engineered for a high-end, editorial fitness experience. We are moving away from the "utility-first" look of fitness trackers and toward a "luxury-performance" aesthetic. The goal is to make the user feel like they are entering an exclusive, private training lounge every time they open the app.

---

### 1. Overview & Creative North Star: "The Digital Private Atelier"
The Creative North Star for this system is **The Digital Private Atelier**. Unlike standard fitness apps that use loud colors and aggressive grids, this system treats the UI as a curated, high-performance space.

**Editorial Asymmetry:** We break the "template" look by using intentional white space (negative space) and overlapping elements. Text should occasionally bleed over image containers or "float" across surface transitions. This creates a sense of motion and depth, suggesting that the app is alive and reacting to the user’s kinetic energy.

---

### 2. Colors: Depth Through Darkness
We do not use pure black for everything. We use a sophisticated palette of near-blacks and deep violets to create "atmospheric" depth.

*   **Primary (`#bc9dff`) & Secondary (`#bc87fe`):** These are your "light sources." Use them sparingly to highlight progress or call-to-actions.
*   **The "No-Line" Rule:** We strictly prohibit 1px solid borders for sectioning. Structural separation must be achieved through background shifts (e.g., a `surface-container-low` section sitting on a `surface` background). If you feel the need to draw a line, you haven't used your surface tiers correctly.
*   **Surface Hierarchy & Nesting:** Treat the UI as layers of obsidian glass.
    *   **Base:** `surface` (#0e0e0e)
    *   **Secondary Content:** `surface-container` (#1a1a1a)
    *   **Interactive Cards:** `surface-container-high` (#20201f)
*   **The "Glass & Gradient" Rule:** Main CTAs and Hero sections should utilize a subtle linear gradient from `primary` (#bc9dff) to `primary-dim` (#894bff). For floating navigation or modals, use `surface-container` with a 70% opacity and a `20px` backdrop blur to create a "frosted violet" glass effect.

---

### 3. Typography: The Performance Scale
We use a dual-typeface system to balance high-end editorial style with functional legibility.

*   **Display & Headline (Manrope):** Chosen for its geometric precision and wide apertures. Use `display-lg` (3.5rem) for big motivational numbers (e.g., "12.5km") to make them feel like trophies. 
*   **Title & Body (Inter):** Inter provides the "utility." It is neutral and highly legible. Use `title-lg` for workout names and `body-md` for instructions.
*   **Visual Hierarchy:** High contrast is key. Use `on-surface` (#ffffff) for primary headings and `on-surface-variant` (#adaaaa) for secondary metadata. Never use pure white for large blocks of body text; it creates "vibration" in dark mode.

---

### 4. Elevation & Depth: Tonal Layering
In this system, elevation is a color property, not a shadow property.

*   **The Layering Principle:** To lift a card, move it up the surface scale. A `surface-container-lowest` card placed on a `surface-container` section creates an "inset" look, while a `surface-container-highest` card creates a "protruding" look.
*   **Ambient Shadows:** When a floating action button (FAB) or modal requires a shadow, it must be "Ambient." Use the `on-primary` color at 8% opacity with a `48px` blur and `12px` Y-offset. This mimics a soft purple glow rather than a muddy grey shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Kinetic Motion:** Elements should transition between surface tiers using a `300ms` "Ease-Out-Expo" curve to mimic the feel of premium gym equipment.

---

### 5. Components: The Performance Kit

*   **Buttons:**
    *   **Primary:** A soft gradient from `primary` to `primary-dim`. No borders. `XL` roundedness (3rem).
    *   **Secondary:** `surface-container-highest` background with `on-surface` text. 
*   **Rounded Cards:** 
    *   Use `md` (1.5rem) for standard workout cards and `lg` (2rem) for hero modules. 
    *   **Rule:** Forbid divider lines within cards. Use `spacing-4` (1.4rem) to separate the headline from the body.
*   **Progress Indicators:**
    *   Use a "Glow-Track" approach. The background track is `surface-variant`, and the active progress is `primary` with a subtle outer glow (drop shadow) of the same color.
*   **Input Fields:**
    *   Minimalist "Underline-Only" is forbidden. Use a solid `surface-container-high` fill with `sm` (0.5rem) roundedness. The focus state is a "Ghost Border" of the `primary` color.
*   **Fitness-Specific Components:**
    *   **The "Vitals Display":** A large `display-sm` value paired with a `label-sm` unit (e.g., "145 BPM") using an asymmetric layout—unit text should be top-aligned to the value.
    *   **The "Activity Ribbon":** A horizontally scrolling list of `surface-container-low` chips with no visible scrollbar, using `spacing-2` between items.

---

### 6. Do’s and Don’ts

**Do:**
*   **Do** use `surface-bright` (#2c2c2c) for very small, high-importance labels to pop them off the background.
*   **Do** allow images to occupy 100% of a card's width, using a `surface-dim` to transparent gradient overlay to ensure text legibility.
*   **Do** use `tertiary` (#a0fff0) for positive reinforcement (e.g., "Workout Complete") to provide a refreshing "cool-down" contrast to the purple theme.

**Don’t:**
*   **Don’t** use pure white (#ffffff) for borders; it breaks the "Atelier" atmosphere.
*   **Don’t** use standard Material Design "Drop Shadows." If it looks like a "floating sticker," it’s wrong. It should look like "heavy glass."
*   **Don’t** use icons with a stroke weight heavier than 1.5px. We want "Minimalist Icons" to keep the interface feeling airy despite the dark theme.
*   **Don’t** use "Alert Red" for errors if possible; use `error_dim` (#d73357) to keep the palette sophisticated and less "alarming."