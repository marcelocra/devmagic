# DevMagic Visual Identity System

<!-- TODO: Move to the <root>/docs folder. -->

## Brand Essence

DevMagic represents **effortless development**—the feeling of code floating freely across machines, environments that materialize instantly, and technology that feels like magic. Our visual identity conveys:

- **Weightlessness**: Development without friction, floating across platforms
- **Playfulness**: Coding should be joyful, not burdensome
- **Futurism**: Modern containerization meets tomorrow's workflows
- **Clarity**: Transparent, open-source, no mysterious complexity

## Color Palette

### Primary Gradients (Signature)

```css
/* Ethereal Blue - Primary brand gradient */
--gradient-primary: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
);

/* Electric Cyan - Energy and speed */
--gradient-electric: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);

/* Aurora - Magic and delight */
--gradient-aurora: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);

/* Holographic - Futuristic accent */
--gradient-holographic: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #667eea 75%,
    #764ba2 100%
);
```

### Semantic Colors

```css
/* Light Mode */
--sky-50: #f0f9ff;
--sky-100: #e0f2fe;
--sky-200: #bae6fd;
--cyan-400: #22d3ee;
--cyan-500: #06b6d4;
--purple-400: #c084fc;
--purple-500: #a855f7;
--violet-500: #8b5cf6;
--fuchsia-400: #e879f9;

/* Dark Mode */
--slate-950: #020617;
--slate-900: #0f172a;
--slate-800: #1e293b;
--cyan-300: #67e8f9;
--purple-300: #d8b4fe;
```

## Typography

### Font Stack

```css
--font-display:
    "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
--font-body: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", "Consolas", monospace;
```

### Scale

```css
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */
--text-6xl: 3.75rem; /* 60px */
--text-7xl: 4.5rem; /* 72px */
```

## Logo & Brand Mark

### Primary Logo Concept

The DevMagic logo evolution:

- **Container Brackets** `<>` - represents code and containers
- **Floating/Weightless** - brackets appear to levitate with subtle glow
- **Gradient Fill** - holographic gradient for modern feel
- **Particle Trail** - optional dots suggesting motion and magic

### Logo Variations

1. **Full Logo**: Brackets + "DevMagic" wordmark
2. **Icon**: Just brackets with gradient
3. **Minimal**: Outlined brackets for small sizes

## Visual Elements

### Glass Morphism

```css
.glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}
```

### Floating Cards

```css
.card-float {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.card-float:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}
```

### Ambient Particles

Subtle floating particles in the background:

- Small dots of varying opacity
- Slow vertical float animation
- Gradient colors matching brand palette
- Canvas-based or CSS animation

### Gradient Text

```css
.gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

## Motion & Animation

### Principles

1. **Smooth & Organic**: Use easing curves like `cubic-bezier(0.34, 1.56, 0.64, 1)`
2. **Subtle**: Animations should enhance, not distract
3. **Purposeful**: Every animation communicates something about the brand
4. **Performance**: Use `transform` and `opacity` for smooth 60fps

### Key Animations

```css
/* Float animation for lightweight feel */
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

/* Glow pulse for interactive elements */
@keyframes glow-pulse {
    0%,
    100% {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
    }
    50% {
        box-shadow: 0 0 40px rgba(102, 126, 234, 0.8);
    }
}

/* Shimmer for loading states */
@keyframes shimmer {
    0% {
        background-position: -1000px 0;
    }
    100% {
        background-position: 1000px 0;
    }
}

/* Particle float */
@keyframes particle-float {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) translateX(20px);
        opacity: 0;
    }
}
```

## UI Components

### Buttons

**Primary**: Gradient background with glow on hover
**Secondary**: Outlined with gradient border
**Ghost**: Transparent with gradient text

### Cards

- Glass morphism effect
- Subtle border with gradient
- Float on hover
- Soft shadow that intensifies on interaction

### Code Blocks

- Dark background with cyan/purple syntax highlighting
- Gradient border
- Copy button with smooth transition
- Slight glow effect

### Navigation

- Glass effect header
- Smooth scroll with parallax
- Active state with gradient underline

## Illustration Style

### Container/Cube Motifs

- Isometric cubes representing containers
- Wireframe style with gradient strokes
- Floating in space with connection lines
- Semi-transparent with inner glow

### Abstract Backgrounds

- Gradient meshes
- Flowing waves
- Particle fields
- Geometric patterns (subtle)

### Iconography

- Outlined style (2px stroke)
- Rounded corners (consistent with border radius)
- Gradient fills for featured icons
- Consistent 24x24 or 32x32 grid

## Accessibility

### Contrast Ratios

- Body text: 7:1 minimum
- Large text (headlines): 4.5:1 minimum
- Interactive elements: Clear focus states

### Motion

- Respect `prefers-reduced-motion`
- Disable animations for users who prefer it
- Maintain functionality without animation

### Color Blind Considerations

- Don't rely solely on color for information
- Use patterns, icons, or text labels
- Test with color blind simulators

## Implementation Notes

### Performance

- Use CSS transforms for animations (GPU accelerated)
- Lazy load background effects
- Optimize SVG assets
- Use CSS variables for theme switching

### Dark Mode

- Automatically follow system preference
- Manual toggle option
- Smooth transition between modes
- Adjust glow effects for dark backgrounds

### Responsive Design

- Simplify animations on mobile
- Reduce particle effects on smaller screens
- Maintain brand feel across all viewports
- Touch-friendly interactive elements (44px minimum)

## Brand Applications

### Website

- Hero with animated gradient background
- Floating cards for features
- Glass morphism for navigation
- Particle effects in background
- Smooth scroll interactions

### Documentation

- Clean, readable layout
- Syntax highlighting with brand colors
- Interactive code examples
- Sidebar with gradient active state

### Social Media

- Gradient backgrounds for cards
- Animated logo for videos
- Consistent color palette
- Recognizable bracket motif

### Presentation Materials

- Dark backgrounds with gradient accents
- Code samples with brand colors
- Minimalist layouts
- Animated transitions
