# DevMagic Visual Identity System

## Brand Essence

DevMagic represents **effortless development**—the feeling of code floating freely across machines, environments that materialize instantly, and technology that feels like magic. Our visual identity conveys:

- **Weightlessness**: Development without friction, floating across platforms
- **Playfulness**: Coding should be joyful, not burdensome
- **Futurism**: Modern containerization meets tomorrow's workflows
- **Clarity**: Transparent, open-source, no mysterious complexity

## Color Palette

### Primary Brand Colors

The DevMagic palette centers on a **violet-to-cyan gradient spectrum** that evokes a cosmic, ethereal feel.

```css
/* Core brand colors */
--color-primary: #7c3aed;          /* Violet - Main brand color */
--color-accent: #06b6d4;           /* Cyan - Secondary accent */
--color-gradient-start: #7c3aed;   /* Violet */
--color-gradient-mid: #a855f7;     /* Purple */
--color-gradient-end: #06b6d4;     /* Cyan */

/* Glow effects */
--color-glow: rgba(139, 92, 246, 0.35);
```

### Primary Gradient (Signature)

```css
/* Brand gradient - used for text, buttons, and accents */
background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);

/* Extended gradient for primary buttons */
background: linear-gradient(to right, #7c3aed, #a855f7, #06b6d4);
```

### Semantic Colors

```css
/* Light Mode - Airy, ethereal feel */
--color-background: #fafbff;
--color-foreground: #0f0f23;
--color-card: rgba(255, 255, 255, 0.8);
--color-card-foreground: #0f0f23;
--color-popover: rgba(255, 255, 255, 0.95);
--color-popover-foreground: #0f0f23;
--color-primary: #7c3aed;
--color-primary-foreground: #ffffff;
--color-secondary: #f0f4ff;
--color-secondary-foreground: #1e1b4b;
--color-muted: #f4f4f8;
--color-muted-foreground: #64748b;
--color-accent: #06b6d4;
--color-accent-foreground: #ffffff;
--color-destructive: #ef4444;
--color-destructive-foreground: #fafafa;
--color-border: rgba(139, 92, 246, 0.15);
--color-input: rgba(139, 92, 246, 0.1);
--color-ring: #7c3aed;

/* Dark Mode - Cosmic, deep space feel */
--color-background: #0a0a1a;
--color-foreground: #f0f4ff;
--color-card: rgba(15, 15, 35, 0.8);
--color-card-foreground: #f0f4ff;
--color-popover: rgba(15, 15, 35, 0.95);
--color-popover-foreground: #f0f4ff;
--color-primary: #a78bfa;
--color-primary-foreground: #0a0a1a;
--color-secondary: rgba(139, 92, 246, 0.15);
--color-secondary-foreground: #f0f4ff;
--color-muted: rgba(139, 92, 246, 0.1);
--color-muted-foreground: #a5b4fc;
--color-accent: #22d3ee;
--color-accent-foreground: #0a0a1a;
--color-destructive: #f87171;
--color-destructive-foreground: #0a0a1a;
--color-border: rgba(167, 139, 250, 0.2);
--color-input: rgba(167, 139, 250, 0.15);
--color-ring: #a78bfa;
--color-glow: rgba(167, 139, 250, 0.4);
```

## Typography

### Font Stack

The project uses system fonts for optimal performance and native feel:

```css
/* Body and display text - system font stack */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

/* Monospace for code blocks */
font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
```

### Scale

Tailwind CSS default scale is used:

```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */
```

## Logo & Brand Mark

### Primary Logo

The DevMagic logo consists of **angle brackets** `< >` that symbolize code and containers. This SVG definition is used consistently across the favicon (`www/public/favicon.svg`) and inline in header/footer components:

```svg
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Left angle bracket < -->
  <path d="M 180 80 L 60 200 L 180 320 L 180 260 L 140 200 L 180 140 Z" fill="#8b5cf6" />
  <!-- Right angle bracket > -->
  <path d="M 220 80 L 340 200 L 220 320 L 220 260 L 260 200 L 220 140 Z" fill="#8b5cf6" />
</svg>
```

**Key characteristics:**
- Solid violet fill (`#8b5cf6`)
- Bold, chunky bracket shapes
- Symmetrical design
- Works at any size from favicon to large displays

### Wordmark

The "DevMagic" text uses a gradient from indigo through violet to purple:

```css
/* Wordmark gradient */
background: linear-gradient(to right, #6366f1, #8b5cf6, #a855f7);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Logo Variations

1. **Full Logo**: Brackets icon + "DevMagic" wordmark (used in header/footer)
2. **Icon Only**: Just the angle brackets (used for favicon, small spaces)
3. **Monochrome**: Single color version for limited color contexts

## Visual Elements

### Glass Morphism

Used for cards, headers, and elevated elements:

```css
.glass {
  background: var(--color-card);           /* rgba(255, 255, 255, 0.8) in light mode */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
}

.glass-strong {
  background: var(--color-popover);        /* rgba(255, 255, 255, 0.95) in light mode */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
}
```

### Floating Cards

```css
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 0 25px var(--color-glow);
}
```

### Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Gradient Border

```css
.gradient-border {
  position: relative;
  background: var(--color-card);
  border-radius: var(--radius);
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
}
```

### Glow Effects

```css
.glow {
  box-shadow: 0 0 30px var(--color-glow);
}

.glow-sm {
  box-shadow: 0 0 15px var(--color-glow);
}
```

### Background Decorations

Hero sections use animated gradient orbs and grid patterns:

```css
/* Animated gradient orbs */
.orb {
  background: var(--color-primary);
  opacity: 0.3;
  border-radius: 100%;
  filter: blur(60px);
  animation: float 6s ease-in-out infinite;
}

/* Grid pattern overlay */
.grid-pattern {
  background:
    linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
```

## Motion & Animation

### Principles

1. **Smooth & Organic**: Use easing curves like `cubic-bezier(0.4, 0, 0.2, 1)`
2. **Subtle**: Animations should enhance, not distract
3. **Purposeful**: Every animation communicates something about the brand
4. **Performance**: Use `transform` and `opacity` for smooth 60fps

### Key Animations

```css
/* Gradient background shift */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* Float animation for lightweight feel */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Glow pulse for interactive elements */
@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

/* Shimmer for loading states and button effects */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

### Animation Utility Classes

```css
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 8s ease infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-glow {
  animation: pulse-glow 4s ease-in-out infinite;
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
```

## UI Components

### Buttons

Four button variants are implemented:

**Primary**: Gradient background with glow on hover
```css
background: linear-gradient(to right, #7c3aed, #a855f7, #06b6d4);
color: white;
/* Hover: shadow and slight lift */
hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5
```

**Secondary**: Solid background with muted colors
```css
background: var(--color-secondary);
color: var(--color-secondary-foreground);
hover:bg-secondary/80 hover:-translate-y-0.5
```

**Outline**: Bordered with gradient hover effect
```css
border: 2px solid rgba(124, 58, 237, 0.3);
hover:border-primary/60 hover:bg-primary/5 hover:-translate-y-0.5
backdrop-filter: blur(sm);
```

**Ghost**: Minimal, transparent background
```css
hover:bg-muted hover:text-foreground
```

All buttons use:
- `border-radius: 0.75rem` (rounded-xl)
- Smooth transitions with duration-300
- Focus states with ring outline

### Cards

Cards use glass morphism with the `.glass` utility:
- Semi-transparent background
- Backdrop blur
- Subtle border with primary color tint
- Float effect on hover via `.card-hover`
- `border-radius: 1rem` (rounded-2xl)

### Code Blocks

```css
/* Code block container */
.code-block {
  border-radius: var(--radius);
  padding: 1rem;
  overflow-x: auto;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.05) 0%,
    rgba(6, 182, 212, 0.05) 100%
  );
  border: 1px solid var(--color-border);
}

/* Dark mode variant */
.dark .code-block {
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1) 0%,
    rgba(6, 182, 212, 0.1) 100%
  );
}
```

Features:
- Gradient border effect using pseudo-element
- Copy button appears on hover
- Monospace font at 0.875rem

### Navigation

Header uses glass morphism with sticky positioning:
```css
background: var(--color-background)/95;
backdrop-filter: blur;
border-bottom: 1px solid var(--color-border);
position: sticky;
top: 0;
z-index: 50;
```

Active navigation state:
- Gradient underline bar from primary to accent
- Full opacity text color

## Illustration Style

### Icon Design

Icons used throughout the site:
- Outlined style with 2px stroke
- Rounded line caps and joins
- Consistent 24x24 sizing (w-6 h-6) for body, 20x20 (w-5 h-5) for small contexts
- Primary color (`#7c3aed`) for emphasis

Feature icon containers:
```css
.icon-container {
  width: 3.5rem;      /* 56px */
  height: 3.5rem;
  border-radius: 0.75rem;
  background: linear-gradient(to bottom-right, rgba(124, 58, 237, 0.2), rgba(6, 182, 212, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Abstract Backgrounds

- Gradient orbs with blur (60-80px blur radius)
- Subtle grid patterns using CSS gradients
- Gradient fade overlays at section boundaries
- Animation delays for staggered movement

## Accessibility

### Contrast Ratios

- Body text: 7:1 minimum
- Large text (headlines): 4.5:1 minimum
- Interactive elements: Clear focus states with ring outline

### Motion

- All theme transitions use smooth 0.3s ease timing
- Animations are subtle (small translateY values)
- Consider adding `prefers-reduced-motion` support in future updates

### Color Blind Considerations

- Don't rely solely on color for information
- Use patterns, icons, or text labels
- Interactive states include shape/position changes (translateY), not just color

### Selection Styling

```css
::selection {
  background: rgba(124, 58, 237, 0.3);   /* Light mode */
}

.dark ::selection {
  background: rgba(167, 139, 250, 0.3);  /* Dark mode */
}
```

## Implementation Notes

### Technology Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom theme
- **Components**: Custom components (no shadcn/ui components currently used)
- **Theme**: next-themes integration via ThemeProvider

### CSS Architecture

Styles are defined in `www/app/globals.css`:
- Tailwind CSS `@theme` directive for design tokens
- `@layer base` for root variables and dark mode
- Custom utility classes for glass morphism, gradients, animations
- Global scrollbar and selection styling

### Performance

- Use CSS transforms for animations (GPU accelerated)
- Backdrop filters with vendor prefixes for cross-browser support
- Use CSS variables for theme switching (smooth transition)
- All transitions use 0.3s duration for consistency

### Dark Mode

- Toggle between light and dark via class on `<html>`
- Stored in localStorage
- Smooth transitions between modes
- Adjusted glow and accent colors for dark backgrounds

### Border Radius

Standard border radius values:
```css
--radius: 0.75rem;  /* Default for most elements */
/* rounded-xl: 0.75rem (12px) - buttons, small cards */
/* rounded-2xl: 1rem (16px) - large cards, sections */
/* rounded-full: 9999px - badges, dots */
```

### Responsive Design

- Mobile-first approach with Tailwind breakpoints
- Container max-width with responsive padding
- Grid layouts adapt from single column to multi-column
- Touch-friendly elements with adequate sizing

## Brand Applications

### Website (devmagic.run)

Currently implemented:
- Hero section with animated gradient orbs and grid pattern
- Floating badge with pulse animation
- Gradient text for emphasis headlines
- Glass morphism cards for feature highlights
- Gradient border for primary call-to-action sections
- Collapsible details with smooth transitions
- Code blocks with copy functionality and gradient borders
- Sticky header with glass effect
- Footer with gradient overlay

### Documentation

The documentation section (`/docs`) should follow:
- Clean, readable layout
- Code examples with brand-colored syntax highlighting
- Consistent navigation patterns
- Glass morphism for sidebars and cards

### Social Media

When creating social assets:
- Use violet-to-cyan gradient backgrounds
- Include the angle bracket logo mark
- Maintain consistent color palette
- Apply subtle glow effects

### Presentation Materials

For slides and demos:
- Dark backgrounds (`#0a0a1a`) with gradient accents
- Code samples with brand syntax highlighting
- Minimalist layouts with ample whitespace
- Animated transitions using brand motion principles
