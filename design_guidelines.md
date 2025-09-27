# School Management System Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from modern educational platforms like Google Classroom, Schoology, and administrative tools like Notion for their clean, organized interfaces that balance functionality with visual appeal.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Light Mode: 220 85% 35% (Deep blue for trust and professionalism)
- Dark Mode: 220 70% 45% (Softer blue for reduced eye strain)

**Secondary Colors:**
- Success: 142 76% 36% (Green for positive actions)
- Warning: 38 92% 50% (Orange for alerts)
- Error: 0 84% 60% (Red for warnings)

**Background Colors:**
- Light Mode: 210 20% 98% (Warm white)
- Dark Mode: 222 84% 5% (Dark charcoal)

### Typography
- **Primary Font:** Inter (Google Fonts) - Modern, readable sans-serif
- **Display Font:** Poppins (Google Fonts) - For headings and emphasis
- **Sizes:** Use Tailwind's type scale (text-sm to text-4xl)

### Layout System
**Spacing:** Consistent Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, h-8)
- Tight spacing for form elements (2-4 units)
- Medium spacing for component separation (6 units)
- Large spacing for section breaks (8+ units)

### Component Library

**Navigation:**
- Responsive sidebar with collapsible sections
- Role-based menu items with clear iconography
- Breadcrumb navigation for deep pages

**Dashboards:**
- Card-based layout with soft shadows
- Interactive charts using Chart.js or similar
- Color-coded status indicators
- Quick action buttons with clear CTAs

**Forms:**
- Clean, well-spaced input fields
- Grouped sections with subtle borders
- Inline validation with helpful messaging
- Multi-step forms for complex processes (admissions)

**Data Displays:**
- Sortable tables with alternating row colors
- Search and filter functionality
- Pagination for large datasets
- Export buttons prominently placed

**Student-Friendly Elements:**
- Rounded corners throughout (rounded-lg)
- Gentle shadows for depth
- Progress bars for academic tracking
- Achievement badges and visual rewards

### Images
**Hero Section:** Large hero image on landing page showing diverse students in a classroom setting
**Dashboard Icons:** Use Heroicons for consistent iconography
**Profile Avatars:** Circular placeholder avatars for users
**Illustration Spots:** Small educational illustrations for empty states and onboarding

### Accessibility & Modes
- Full dark mode implementation across all components
- High contrast ratios (4.5:1 minimum)
- Keyboard navigation support
- Screen reader friendly labels
- Consistent focus states

### Key Design Principles
1. **Clarity Over Complexity** - Information hierarchy guides users naturally
2. **Role-Appropriate Design** - Student interfaces more colorful, admin interfaces more data-focused
3. **Mobile-First Responsive** - Essential for parent and student access
4. **Performance-Minded** - Minimal animations, optimized loading states

This design system creates a professional yet approachable educational environment that serves all stakeholder needs while maintaining consistency and usability.