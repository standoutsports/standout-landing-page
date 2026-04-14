This Product Requirements Document (PRD) outlines the design and functional specifications for the Standout Sports Editing landing page, heavily inspired by the premium, high-conversion aesthetic of **Consulting.com** and **Quantum**.

---

## 1. Project Overview
* **Business Name:** Standout Sports Editing
* **Core Service:** Professional soccer highlight video editing for competitive youth players.
* **Target Audience:** Parents of competitive Australian soccer players seeking club trials/pro opportunities.
* **Primary Objective:** Lead generation (Inquiry Form Submission).
* **Design Aesthetic:** Faceless, premium, modern, "Dark Mode" with gold accents.

---

## 2. Visual Identity & Design Principles
Following the provided references, the page will utilize a "High-End Dark" theme to establish immediate authority.

* **Color Palette:**
    * **Background:** Deep Black (`#000000`) and Near-Black (`#0F0F0F`) for section depth.
    * **Primary Accent:** Gold Gradient (Transitioning from `#FFD999` to `#FFB433`) for CTAs and primary headings.
    * **Typography:** Pure White (`#FFFFFF`) for headers; Muted Gray (`#98A1B2`) for secondary subtext.
* **UI Elements:**
    * **Glassmorphism:** Use `backdrop-filter: blur(12px)` on navigation bars and card backgrounds.
    * **Title Gradients:** Headers should use a linear text gradient.
    * **Interactive Cards:** Rounded corners (20px radius) with subtle `radial-gradient` backgrounds to make them "pop" from the dark base.

---

## 3. Section-by-Section Requirements

### 1. Hero Section (The Hook)
* Full-width hero with a strong headline, supporting subtext, and a single primary CTA.
* Visual element (mockup, video loop, or hero image) to establish credibility immediately.

### 2. Problem Section (Agitation)
* Centered text block that agitates the core pain point the audience faces.
* Pivots into positioning the service as the solution.

### 3. How It Works (Process)
* 3-step horizontal layout (stacks vertically on mobile).
* Each step: icon/number, short title, one-line description.

### 4. Outcomes & Benefits (Item Cards)
* 3 benefit cards highlighting key outcomes the service delivers.
* Each card: icon or visual, title, short description.

### 5. Packages (Conversion)
* Side-by-side pricing/package cards with clear tier differentiation.
* Each card: package name, key inclusions, price, and CTA.

### 6. Social Proof (Trust)
* Stats bar with 3–4 key credibility metrics.
* Testimonial cards with attribution.

### 7. FAQ (Objection Handling)
* Accordion-style FAQ addressing common objections and questions.

### 8. Final CTA (The Closer)
* Closing headline with a single centered CTA button linking to the inquiry form.

---

## 4. Multi-Device Optimization (Breakpoints)
To ensure a flawless experience across all devices, the following CSS breakpoints and layout shifts are required:

| Device Type | Breakpoint | Layout Adjustments |
| :--- | :--- | :--- |
| **Desktop** | 1440px+ | Max container width 1280px; full hover effects and background particle animations enabled. |
| **Laptop** | 1200px - 1439px | Reduce side margins; scale down font sizes by 10-15%. |
| **Tablet** | 810px - 1199px | Shift 3-column grids to 2-columns (with the 3rd card centering below); expand touch targets for buttons. |
| **Phone** | 390px - 809px | **Single-column stack** for all cards; Navigation collapses to a hamburger menu; Sticky CTA button appears at the footer. |
| **Small Screens** | < 390px | Reduce padding to 16px; headline font size fixed to `2rem` to prevent text wrapping issues. |

---

## 5. Technical & CSS Effects
* **Particle Background:** Implement a subtle `canvas` based particle effect in the Hero and Final CTA sections to mimic the "floating dust" look of Consulting.com.
* **Reveal Animations:** Elements should "fade and slide" up (Y: 50px) as the user scrolls into view using `IntersectionObserver`.
* **Button Glow:** Gold buttons should have a `radial-gradient` glow effect on hover, exactly like the reference site.