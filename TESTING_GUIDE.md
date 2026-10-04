# Testing Guide - IEEE Beni-Suef Landing Page Redesign

## Quick Start Testing

### Step 1: Start Development Server
```bash
cd IEEE-website
npm install  # If not already done
npm run dev
```

### Step 2: Open in Browser
Navigate to: `http://localhost:5173` (or the port shown in console)

### Step 3: Follow This Guide
Complete each section below, checking items as you go.

---

## 🖥️ Desktop Testing (1440px+)

### Visual Inspection
- [ ] All sections load without errors
- [ ] No layout shifts during page load
- [ ] Images load correctly
- [ ] Animations are smooth (60fps)
- [ ] Text is readable with good contrast
- [ ] No horizontal scrollbar

### Section-by-Section Check

#### 1. Hero Section
- [ ] Committee network diagram displays
- [ ] All 5 committee nodes visible (WIE, Branch, SIGHT, CS/CIS, AESS)
- [ ] Connecting lines animate on load
- [ ] Hover effect on nodes works
- [ ] Click on nodes navigates to `/committees`
- [ ] "Explore Our Journey" button → `/about`
- [ ] "Join IEEE" button → `/register`
- [ ] Student avatars display
- [ ] Background images visible but not distracting

#### 2. About Section
- [ ] "WHO WE ARE" badge displays
- [ ] Heading highlights "Student Branch" in purple
- [ ] Two columns (text left, image right)
- [ ] Featured image has purple border
- [ ] 5 keyword badges display
- [ ] 4 statistics cards show correctly
- [ ] Icons display in statistics

#### 3. Community Section
- [ ] "OUR COMMUNITY" badge displays
- [ ] 4 society cards in 2×2 grid
- [ ] Each card has icon, title, description, tags
- [ ] Hover effect scales cards
- [ ] Click on cards navigates to `/committees`
- [ ] Colors: CS/CIS (purple), AESH (blue), SIGHT (green), WIE (pink)

#### 4. Impact Section
- [ ] Purple gradient background
- [ ] "Turning Activities into Impact" heading
- [ ] 6 statistic cards in horizontal row
- [ ] Icons display correctly
- [ ] No horizontal scroll needed

#### 5. Committees Section
- [ ] "THE HEART OF IEEE" badge displays
- [ ] Technical/Operational toggle works
- [ ] Committee cards display in swiper
- [ ] Navigation arrows work
- [ ] Cards show images, titles, member count

#### 6. Events Section
- [ ] "Our Events & Activities" heading
- [ ] 3 event cards display
- [ ] Book-opening animation on hover/click
- [ ] "Discover" button appears when card opens
- [ ] Pagination dots work
- [ ] "Discover more" button → `/events`

#### 7. Journey Section
- [ ] "TIMELINE" badge displays
- [ ] Season selector on left (4 seasons)
- [ ] Clicking seasons updates content
- [ ] Season 11 selected by default
- [ ] Achievement bullets display
- [ ] Placeholder note visible for seasons 8-10
- [ ] Smooth transition between seasons

#### 8. Ambassadors Section
- [ ] Blue gradient background
- [ ] "From Beni-Suef to Region 8" heading
- [ ] Map visual with animated dot
- [ ] 4 ambassador cards display
- [ ] IEEE logo badge on each card
- [ ] Prev/next arrows work
- [ ] Pagination dots work

#### 9. Team Section
- [ ] "Behind the Experience" heading
- [ ] "100% Student-Built" badge displays
- [ ] 6 team cards in 3×2 grid
- [ ] Role badges visible on images
- [ ] Gradient overlays work
- [ ] Hover effect scales cards

#### 10. Achievements Section
- [ ] Navy banner: "We don't wait for opportunities. We build them."
- [ ] "We build them" highlighted in blue
- [ ] "ACHIEVEMENTS" badge displays
- [ ] 6 milestone cards in 3×2 grid
- [ ] Icons, category tags, years show
- [ ] Placeholder note visible

#### 11. CTA Section
- [ ] Navy gradient background
- [ ] "JOIN US" badge displays
- [ ] "could start here" highlighted
- [ ] 3 benefit bullet points with checkmarks
- [ ] "Start Here" button → `/register`
- [ ] "Learn More" button → `/about`

#### 12. High Board Section
- [ ] "Meet Our High Board" heading
- [ ] 6 board member cards in 3×2 grid
- [ ] Photos display correctly
- [ ] LinkedIn and email icons work
- [ ] Hover effect works

#### 13. Sponsors Section
- [ ] "Sponsors & Partners" heading
- [ ] 8 sponsor cards in 4×2 grid
- [ ] Placeholder icons display
- [ ] Hover effect works
- [ ] Placeholder note visible

#### 14. Footer
- [ ] IEEE logo displays
- [ ] "Join Our Branch" button works
- [ ] Quick Links functional
- [ ] Resources Links functional
- [ ] Contact info displays
- [ ] Social media icons work
- [ ] Copyright text displays

---

## 📱 Mobile Testing (375px)

### General Mobile Checks
- [ ] No horizontal scroll
- [ ] Text readable without zooming
- [ ] Touch targets ≥ 44px
- [ ] Navigation accessible

### Mobile-Specific Changes

#### Hero Section
- [ ] Layout stacks vertically
- [ ] Committee diagram hidden
- [ ] CTA buttons stack
- [ ] Text remains readable

#### About Section
- [ ] Image moves below text
- [ ] Statistics grid: 2 columns → 1 column
- [ ] Keyword badges wrap

#### Community Section
- [ ] Cards stack (4 rows × 1 column)
- [ ] Cards maintain full width

#### Impact Section
- [ ] Horizontal scroll works
- [ ] Scroll indicators visible
- [ ] Each card 264px wide

#### Events Section
- [ ] Cards stack vertically
- [ ] Book-opening still works
- [ ] Touch to expand

#### Journey Section
- [ ] Season selector on top
- [ ] Content below selector
- [ ] Easy to tap seasons

#### Ambassadors Section
- [ ] Shows 1-2 cards at a time
- [ ] Swipe or arrows work
- [ ] Map visual readable

#### Team Section
- [ ] Cards stack (6 rows × 1 column)

#### All Other Sections
- [ ] Grids collapse to single column
- [ ] Text wraps properly
- [ ] Images scale appropriately

---

## ⌨️ Keyboard Navigation Testing

### Tab Order
- [ ] Tab moves through all interactive elements
- [ ] Order is logical (top to bottom)
- [ ] No tab traps
- [ ] Skip to content link works

### Focus Indicators
- [ ] All focusable elements have visible outline
- [ ] Outline color: purple (#5A10A5)
- [ ] Outline offset: 2px

### Keyboard Controls
- [ ] Enter/Space activates buttons and links
- [ ] Arrow keys work in carousels
- [ ] Arrow keys work in tab lists (Journey section)
- [ ] Escape closes modals (if any)

---

## 🎨 Visual Regression Testing

### Colors
- [ ] Navy (#000640) for headings
- [ ] Purple (#5A10A5) for accents
- [ ] Blue (#4460EF) for highlights
- [ ] Light purple (#CCB5E3) for borders
- [ ] No unexpected color variations

### Typography
- [ ] Consistent font sizes
- [ ] Proper font weights
- [ ] Line heights appropriate
- [ ] Letter spacing correct

### Spacing
- [ ] Consistent section padding
- [ ] Proper card gaps
- [ ] Aligned elements
- [ ] No overlapping content

---

## ⚡ Performance Testing

### Lighthouse Audit
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Desktop" or "Mobile"
4. Click "Generate report"

#### Target Scores
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 90
- [ ] SEO: ≥ 90

### Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

### Network Performance
- [ ] Initial load: < 3s
- [ ] All images load
- [ ] No failed requests in Network tab

---

## ♿ Accessibility Testing

### Screen Reader Test
1. Enable screen reader (NVDA/VoiceOver)
2. Navigate through page
3. Verify announcements

- [ ] All images have alt text
- [ ] Headings announced correctly
- [ ] Links have descriptive text
- [ ] Buttons have clear labels
- [ ] Form fields have labels

### Color Contrast
Use browser extension or DevTools

- [ ] Text on dark backgrounds: ≥ 4.5:1
- [ ] Text on light backgrounds: ≥ 4.5:1
- [ ] Large text (18px+): ≥ 3:1
- [ ] Interactive elements: ≥ 3:1

### ARIA Usage
- [ ] Landmarks used correctly
- [ ] aria-labels on icon buttons
- [ ] aria-selected on tabs
- [ ] aria-hidden on decorative elements

---

## 🌐 Browser Compatibility

Test in each browser:

### Chrome (Latest)
- [ ] All features work
- [ ] Animations smooth
- [ ] No console errors

### Firefox (Latest)
- [ ] All features work
- [ ] SVG renders correctly
- [ ] Backdrop-filter works

### Safari (Latest)
- [ ] All features work
- [ ] Webkit-specific CSS works
- [ ] Touch events work on iOS

### Edge (Latest)
- [ ] All features work
- [ ] No Edge-specific issues

---

## 📋 Functionality Testing

### Links
- [ ] All internal links navigate correctly
- [ ] All external links open in new tab
- [ ] No broken links (404)

### Forms (if any)
- [ ] Validation works
- [ ] Error messages display
- [ ] Success messages display
- [ ] Submit buttons work

### Interactive Elements
- [ ] All buttons clickable
- [ ] All hover states work
- [ ] All focus states work
- [ ] All animations complete

---

## 🐛 Bug Reporting Template

If you find a bug, report it using this template:

```markdown
### Bug Description
[Clear description of the issue]

### Steps to Reproduce
1. Go to...
2. Click on...
3. Scroll to...
4. See error

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Browser: [Chrome 120]
- OS: [Windows 11]
- Screen size: [1440px]
- Device: [Desktop/Mobile]

### Screenshots
[Attach screenshots if applicable]

### Console Errors
[Copy any console errors]

### Priority
[High/Medium/Low]
```

---

## ✅ Sign-Off Checklist

### Desktop Testing
- [ ] All sections tested
- [ ] All links work
- [ ] Animations smooth
- [ ] No visual issues

### Mobile Testing
- [ ] Responsive layouts work
- [ ] Touch interactions work
- [ ] No horizontal scroll
- [ ] Performance acceptable

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast passes
- [ ] Focus indicators visible

### Performance
- [ ] Lighthouse score ≥ 90
- [ ] Load time < 3s
- [ ] No console errors
- [ ] Images optimized

### Cross-Browser
- [ ] Chrome works
- [ ] Firefox works
- [ ] Safari works
- [ ] Edge works

---

## 📊 Testing Progress Tracker

| Section | Desktop | Mobile | Keyboard | Accessibility | Status |
|---------|---------|--------|----------|---------------|--------|
| Hero | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| About | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Community | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Impact | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Committees | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Events | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Journey | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Ambassadors | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Team | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Achievements | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| CTA | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| High Board | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Sponsors | ⬜ | ⬜ | ⬜ | ⬜ | Pending |
| Footer | ⬜ | ⬜ | ⬜ | ⬜ | Pending |

Replace ⬜ with ✅ as you complete each test.

---

## 🚀 Ready for Deployment?

Only proceed to deployment when ALL of these are checked:

- [ ] All desktop tests passed
- [ ] All mobile tests passed
- [ ] All keyboard navigation works
- [ ] All accessibility checks passed
- [ ] Performance targets met
- [ ] Cross-browser testing complete
- [ ] No critical bugs
- [ ] Stakeholder approval received
- [ ] Content reviewed and approved
- [ ] Backup of previous version created

---

**Testing Status**: 🟡 Not Started
**Expected Duration**: 2-3 days
**Last Updated**: October 3, 2026
