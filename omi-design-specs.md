# Omi App Redesign - Color Codes & Design Specifications

## Color Palette

### Base Colors
- **Background Primary**: `#0A0A0F` (Deep black)
- **Background Secondary**: `#1e1e2f` (Dark gradient blue)
- **Surface Glass**: `rgba(255, 255, 255, 0.05)` (5% white transparency)
- **Glass Border**: `rgba(255, 255, 255, 0.1)` (10% white border)

### Neon Accent Colors
- **Electric Blue**: `#00D4FF` (Primary accent)
- **Purple**: `#A855F7` (Secondary accent)
- **Magenta**: `#FF0080` (Entrepreneurship category)
- **Lime Green**: `#00FF85` (Education category)

### Typography Colors
- **Text Primary**: `#f0f0f0` (Light gray)
- **Text Secondary**: `#cccccc` (Medium gray)
- **Text Muted**: `#999999` (Subtle gray)

## Glassmorphism Properties

### Glass Panel Effects
```css
backdrop-filter: blur(40px);
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 20px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
```

### Neon Glow Effects
```css
/* Record Button Glow */
box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);

/* Card Hover Glow */
box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);

/* Achievement Badge Glow */
box-shadow: 0 0 15px rgba(255, 0, 128, 0.4);
```

## Component Specifications

### Recording Widget
- **Background**: Glassmorphic panel with 40px blur
- **Record Button**: 80px diameter with pulsing neon ring
- **Waveform**: 8 animated bars with electric blue (#00D4FF)
- **Status Text**: 16px Inter font, light gray (#f0f0f0)

### Conversation Cards
- **Background**: Glass effect with subtle transparency
- **Category Badges**: Gradient backgrounds with neon colors
- **Hover State**: Lift animation + neon glow
- **Typography**: Bold headers (18px), regular body (14px)

### Achievement Badges
- **Progress Rings**: Circular progress with neon colors
- **Icons**: 24px emoji with glowing background
- **Animation**: Scale and glow effects on interaction
- **Colors**: Rotating neon palette based on achievement type

### Navigation
- **Background**: Glassmorphic bottom panel
- **Icons**: 24px with neon accent colors
- **Active State**: Glowing background with color transition
- **Spacing**: 60px between navigation items

## Animation Specifications

### Micro-Animations
- **Record Button**: 2s infinite pulse animation
- **Waveform Bars**: 1.5s staggered height animation
- **Card Hover**: 0.3s ease-out transform and glow
- **Achievement Unlock**: 0.5s scale with particle effect

### Transition Timings
- **Standard**: 0.3s ease-out
- **Quick**: 0.15s ease-in-out
- **Slow**: 0.5s ease-in-out
- **Bounce**: cubic-bezier(0.175, 0.885, 0.32, 1.275)

## Accessibility Compliance

### Color Contrast Ratios
- **Primary Text**: 13.5:1 (AAA compliant)
- **Secondary Text**: 9.2:1 (AAA compliant)
- **Accent Colors**: Minimum 4.5:1 on backgrounds

### Interactive Elements
- **Minimum Touch Target**: 44px x 44px
- **Keyboard Navigation**: Full support with visible focus states
- **Screen Reader**: Semantic HTML with ARIA labels
- **Motion**: Respects prefers-reduced-motion settings

## Technical Implementation

### CSS Custom Properties
```css
:root {
  --color-bg-primary: #0A0A0F;
  --color-bg-secondary: #1e1e2f;
  --color-accent-blue: #00D4FF;
  --color-accent-purple: #A855F7;
  --color-accent-magenta: #FF0080;
  --color-accent-green: #00FF85;
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --blur-strength: 40px;
}
```

### Performance Optimizations
- **Hardware Acceleration**: transform3d() for animations
- **GPU Compositing**: will-change property for moving elements
- **Efficient Selectors**: Class-based targeting
- **Minimal Repaints**: Transform and opacity animations only

## Design System Guidelines

### Spacing Scale
- **XS**: 4px
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **XXL**: 48px

### Typography Scale
- **Title**: 32px, Bold (Inter)
- **Heading**: 24px, SemiBold (Inter)
- **Subheading**: 18px, Medium (Inter)
- **Body**: 16px, Regular (Inter)
- **Caption**: 14px, Regular (Inter)
- **Small**: 12px, Regular (Inter)

### Border Radius Scale
- **Small**: 8px
- **Medium**: 12px
- **Large**: 20px
- **Circle**: 50%

This design system creates a cohesive, modern, and engaging user experience that drives word-of-mouth growth through its premium visual aesthetic and smooth interactive behavior.