# Find2Fix — Design System
**Version:** 1.0
**Project:** Find2Fix
**Platform:** Responsive website prototype
**Technology:** HTML5, CSS3, Vanilla JavaScript
**Primary language:** Thai
**Design direction:** Community-focused, practical, accessible, and trustworthy

---

## 1. Color Token

### 1.1 Brand Colors
Use the original Find2Fix logo colors as the foundation of the visual identity. Do not introduce a competing primary color or alter the original logo.

TokenHexPurpose`--color-primary``#F16A21`Brand orange, icons, highlights, selected indicators`--color-text``#535353`Primary brand text, headings, and body text`--color-gray-light``#C8C8C8`Decorative details, subtle dividers, secondary visual elements`--color-white``#FFFFFF`Main background and clean content surfaces
### 1.2 Supporting Tokens
Use neutral supporting colors only when necessary for readability, separation, and accessible interaction states.

TokenHexPurpose`--color-text-strong``#292929`High-contrast text and important labels`--color-text-muted``#6B6B6B`Secondary text on light backgrounds`--color-background-muted``#F7F7F7`Secondary sections and subtle surfaces`--color-border``#E5E5E5`Input borders, card borders, and dividers`--color-disabled``#EEEEEE`Disabled controls and unavailable states`--color-focus``#535353`Visible keyboard focus outline`--color-success``#276749`Booking confirmation and successful actions`--color-error``#B42318`Form errors and important validation messagesSupporting colors must not overpower the four original brand colors.

### 1.3 Semantic Color Rules

- **Primary action:** Use brand orange for important interactive elements. Select a text color that meets contrast requirements; do not assume white text on `#F16A21` is accessible.
- **Text:** Use dark gray or a darker neutral on white and light backgrounds.
- **Selected state:** Use a visible orange border or indicator, supported by a label or icon rather than color alone.
- **Disabled state:** Use muted backgrounds and clearly communicate that the control cannot be used.
- **Success and error:** Use semantic colors sparingly and always include a text label or icon.
- **Logo:** Preserve the supplied logo's original colors and proportions.

### 1.4 CSS Variables
Define the color tokens centrally in `css/style.css`.

```
:root {
  /* Brand */
  --color-primary: #F16A21;
  --color-text: #535353;
  --color-gray-light: #C8C8C8;
  --color-white: #FFFFFF;

  /* Supporting neutrals */
  --color-text-strong: #292929;
  --color-text-muted: #6B6B6B;
  --color-background-muted: #F7F7F7;
  --color-border: #E5E5E5;
  --color-disabled: #EEEEEE;
  --color-focus: #535353;

  /* Semantic states */
  --color-success: #276749;
  --color-error: #B42318;
}
```
Do not scatter hardcoded color values throughout component styles. Reuse the defined tokens wherever possible.

---

## 2. Typography

### 2.1 Font Family
Use a Thai-friendly sans-serif font stack.

```
:root {
  --font-family-base:
    "Noto Sans Thai",
    "Leelawadee UI",
    Tahoma,
    sans-serif;
}
```
Prefer Noto Sans Thai when available. The interface must remain readable if the preferred font cannot load.

Use a consistent font family across all four pages.

### 2.2 Type Scale
TokenSizeWeightUsage`--text-display`40px700Main homepage headline on desktop`--text-h1`32px700Main page heading`--text-h2`24px600–700Section headings`--text-h3`20px600Card titles and subsection headings`--text-body-lg`18px400Hero descriptions and introductory text`--text-body`16px400Main body text and form labels`--text-small`14px400Supporting information and metadata`--text-caption`12px400Secondary metadata when necessaryThese sizes are starting points. Adjust responsively while preserving a clear hierarchy.

### 2.3 Typography Rules

- Use a consistent heading hierarchy: H1, H2, and H3.
- Use sentence case and natural Thai phrasing.
- Keep body text comfortable to read, with a line height of approximately 1.5–1.7.
- Use a line height of approximately 1.2–1.4 for headings.
- Avoid excessively thin font weights.
- Use bold text to emphasize important information rather than making entire paragraphs bold.
- Do not use uppercase English text as a decorative treatment throughout the interface.
- Keep line lengths comfortable, especially for explanatory text and technician biographies.
- On mobile, reduce display headings to approximately 28–32px and H1 headings to approximately 24–28px.

### 2.4 Typography Consistency
Use shared typography tokens instead of defining unrelated font sizes on each page.

Thai UI labels, validation messages, booking details, navigation, and buttons must all use the same typographic system.

---

## 3. Spacing and Grid

### 3.1 Spacing Scale
Use a consistent spacing system based on a 4px increment.

TokenValueUsage`--space-1`4pxSmall icon gaps`--space-2`8pxCompact internal spacing`--space-3`12pxRelated labels and controls`--space-4`16pxStandard component spacing`--space-5`20pxCard content spacing`--space-6`24pxSection subgroups`--space-8`32pxMajor component separation`--space-10`40pxSection spacing`--space-12`48pxLarge content gaps`--space-16`64pxMajor desktop section spacing`--space-20`80pxHero and large section spacingUse the nearest appropriate token rather than introducing arbitrary values without a reason.

### 3.2 Page Container
Use a centered container with consistent horizontal padding.

Recommended desktop configuration:

- Maximum content width: approximately 1200px.
- Horizontal page padding: 32px.
- Center the container within the viewport.
- Keep long-form text narrower than the full container when appropriate.
Recommended mobile configuration:

- Horizontal page padding: 16px.
- Prevent horizontal overflow.
- Allow cards and form controls to adapt to the available width.

### 3.3 Grid System
Use a responsive grid rather than fixed-width layouts.

**Desktop**

- 12-column grid where appropriate.
- Category cards: 3–5 columns depending on the available space.
- Technician results: 2–3 columns or a list layout depending on information density.
- Detail and booking: two-column layout may be used when it improves usability.
**Tablet**

- Reduce the number of columns as needed.
- Keep important content and actions visible without overcrowding.
**Mobile**

- Use a single-column layout for primary content.
- Category cards may use a two-column grid when labels remain readable.
- Stack forms and booking summaries vertically.
- Make primary actions easy to find and tap.

### 3.4 Section Spacing

- Use consistent vertical spacing between major page sections.
- Keep related labels, descriptions, and controls close together.
- Separate unrelated sections with whitespace rather than unnecessary decorative elements.
- Use consistent card padding, normally 16–24px.
- Keep the header, content container, and footer aligned to the same horizontal grid.

### 3.5 Responsive Breakpoints
Use these as initial CSS breakpoints:

- Mobile: up to 599px.
- Tablet: 600px–899px.
- Desktop: 900px and above.
Adapt the layout to content needs rather than relying only on device categories.

---

## 4. Component Rules

### 4.1 Global Component Principles
All components must share the same design language across the four pages:

1. Home — `index.html`
2. Search — `search.html`
3. Matching — `matching.html`
4. Detail + Booking — `detail.html`
Use reusable CSS classes and shared JavaScript behavior where appropriate.

Do not create visually unrelated components for individual pages.

### 4.2 Header and Navigation

- Display the original Find2Fix logo.
- Preserve the logo's aspect ratio.
- Link the logo to `index.html`.
- Use consistent navigation labels across all pages.
- Highlight the current page or step when appropriate.
- Provide a clear primary action for starting a repair search.
- Support keyboard navigation.
- On mobile, collapse navigation when necessary without hiding essential actions.

### 4.3 Buttons
Define three button variants:

**Primary**

- Used for the main action of a page or workflow.
- Uses brand orange as a prominent visual accent.
- Must have readable text with sufficient contrast.
- Examples: starting a search, viewing matching results, confirming a booking.
**Secondary**

- Used for supporting actions.
- Uses a white or neutral background with a clear border.
- Examples: going back, editing a request, changing a selection.
**Text or Tertiary**

- Used for low-priority actions.
- Minimal visual emphasis.
- Examples: optional details and secondary navigation.
Button rules:

- Provide visible hover and keyboard focus states.
- Provide disabled states when an action is unavailable.
- Avoid multiple competing primary buttons in the same component.
- Use consistent heights, padding, and border radii.
- Prevent accidental repeated submission during booking confirmation.

### 4.4 Form Controls
Use consistent styles for:

- Text inputs
- Textareas
- Select fields
- Radio buttons
- Checkboxes
- Category selectors
- Date selectors
- Time-slot buttons
Rules:

- Every input must have an associated label.
- Required fields must be clearly identified.
- Selected categories and symptoms must be visually obvious.
- Validation messages must appear close to the relevant field.
- Preserve user selections when navigating backward in the flow.
- Do not use placeholder text as a replacement for labels.
- Make controls keyboard accessible.
- Ensure controls are large enough to use comfortably on touch screens.

### 4.5 Category Cards
Category cards represent the types of items that customers want to repair.

Each card should contain:

- A consistent icon or relevant image.
- A concise Thai category label.
- A visible selected state when interactive.
- A clear clickable area.
Use the same card structure across all item categories.

Do not rely on emoji as the primary icon system.

### 4.6 Technician Cards
Each technician card should present information in a consistent order:

1. Profile image or neutral placeholder.
2. Technician name.
3. Relevant repair specialty.
4. Service area.
5. Estimated price range.
6. Mock rating, when available.
7. Relevant availability information.
8. A short explanation of why the technician matches the request.
9. A clear action to view details and select a booking slot.
Rules:

- Use stable technician IDs.
- Keep the information hierarchy consistent.
- Do not invent verified reviews or credentials.
- Label prototype ratings and other demonstration data appropriately.
- Avoid ranking technicians using unrelated or unsupported criteria.
- Provide a clear empty state when no suitable technicians are found.

### 4.7 Matching Indicators
Matching indicators must explain the relevance of a result.

Use concise Thai explanations such as:

- "เชี่ยวชาญการซ่อมจักรยาน"
- "มีทักษะตรงกับอาการที่เลือก"
- "ให้บริการในพื้นที่ของคุณ"
Rules:

- Match item categories before ranking technicians.
- Consider relevant skills and location.
- If the customer does not provide a location, do not penalize technicians for location.
- Explain the rule-based matching process honestly.
- Do not claim that the prototype uses AI.
- Do not imply that a match guarantees repair success.

### 4.8 Technician Detail and Booking
Technician details and booking must exist on the same page: `detail.html`.

Recommended section order:

1. Technician profile.
2. Repair specialties and work samples.
3. Service area and estimated pricing.
4. Available dates and time slots.
5. Booking form.
6. Booking review.
7. Confirmation state.
Rules:

- Keep the selected technician consistent throughout the workflow.
- Clearly distinguish estimated prices from confirmed quotations.
- Disable unavailable time slots.
- Update the booking summary when selections change.
- Validate required form fields.
- Require explicit confirmation before showing a successful booking state.
- Clearly state that the booking is simulated and has not been sent to a real technician.
- Provide actions to return home or start a new search.
- Do not create a separate booking HTML page.

### 4.9 Images and Icons

- Use a mixed photography and icon approach.
- Prefer realistic repair photographs for hero sections, technician profiles, and work samples.
- Use consistent line icons for categories, symptoms, location, and scheduling.
- Maintain consistent image aspect ratios.
- Use `object-fit: cover` where appropriate.
- Provide descriptive alt text for meaningful images.
- Provide neutral placeholders when image files are missing.
- Never replace or modify the supplied Find2Fix logo.
- Do not reference nonexistent local assets without a fallback.

### 4.10 Feedback, States, and Accessibility
Every interactive component must account for relevant states:

- Default
- Hover
- Focus
- Selected
- Disabled
- Error
- Success
- Empty or unavailable
Use text, icons, borders, and other visual cues in addition to color.

Ensure sufficient color contrast, keyboard accessibility, visible focus indicators, and clear error messages.

### 4.11 Implementation Rules

- Use semantic HTML5.
- Use CSS custom properties for shared tokens.
- Keep JavaScript modular.
- Store mock data separately from UI logic.
- Use sessionStorage for the current prototype workflow.
- Use URL query parameters for the selected technician ID.
- Handle missing and invalid data gracefully.
- Avoid broken links, dead buttons, and unnecessary duplicated code.
- Preserve existing project files and logo assets.

---

## 5. Voice and Tone

### 5.1 Brand Personality
Find2Fix communicates as a helpful, practical, and trustworthy community service.

The brand should feel:

- Approachable, without being overly casual.
- Clear, without sounding cold.
- Supportive, without making exaggerated promises.
- Practical, without using unnecessary technical jargon.
- Community-oriented, without romanticizing repair work or making unsupported claims.

### 5.2 Language Principles
Use natural Thai as the primary interface language.

Prefer short, direct sentences that explain what the user should do next.

Use familiar words for item categories, symptoms, scheduling, and repair services.

Keep terminology consistent throughout all four pages.

Use English only where it is appropriate for technical labels, branding, or commonly recognized interface conventions.

### 5.3 Writing Rules

- Explain one action or idea at a time.
- Make button labels describe their actual actions.
- Use reassuring but factual instructions.
- Avoid excessive exclamation marks.
- Avoid exaggerated marketing language.
- Avoid blaming users for broken items.
- Avoid promising that every item can be repaired.
- Avoid unsupported claims about cost savings or environmental benefits.
- Clearly distinguish estimated information from confirmed information.
- Explain errors in a way that helps users recover.

### 5.4 Example Interface Copy
**Homepage headline**

"ของเสีย ไม่จำเป็นต้องทิ้ง"

Supporting text:

"ค้นหาช่างซ่อมที่เหมาะกับสิ่งของของคุณ พร้อมสนับสนุนช่างในชุมชน"

Primary CTA:

"เริ่มหาช่างซ่อม"

**Search instructions**

"สิ่งของของคุณมีอาการอย่างไร?"

Supporting text:

"เลือกอาการที่พบได้มากกว่าหนึ่งข้อ เพื่อช่วยให้ระบบแนะนำช่างได้ตรงกับความต้องการ"

**Matching explanation**

"ช่างที่แนะนำสำหรับคุณ"

Supporting text:

"ระบบจัดอันดับจากประเภทสิ่งของ ทักษะการซ่อม และพื้นที่ให้บริการที่คุณเลือก"

**No matching results**

"ยังไม่พบช่างที่ตรงกับข้อมูลนี้"

Supporting text:

"ลองเปลี่ยนอาการหรือประเภทสิ่งของ แล้วค้นหาอีกครั้ง"

CTA:

"กลับไปแก้ไขการค้นหา"

**Booking instruction**

"เลือกวันและเวลาที่สะดวก"

Supporting text:

"ตรวจสอบข้อมูลการนัดหมายก่อนยืนยัน"

**Booking confirmation**

"ยืนยันการนัดหมายจำลองแล้ว"

Supporting text:

"ข้อมูลนี้เป็นส่วนหนึ่งของเว็บไซต์ต้นแบบ และยังไม่ได้ส่งไปยังช่างจริง"

### 5.5 Content Integrity
All technician profiles, ratings, prices, work samples, and schedules used in the prototype must be treated as demonstration data.

Do not present mock data as verified real-world information.

Do not claim that a technician has received a booking.

Do not make unsupported claims about environmental impact, service quality, or platform performance.

Always communicate the actual status of the user's actions.

---

## Final Design System Rules

1. Use the four supplied brand colors as the core identity.
2. Maintain consistent typography, spacing, and component behavior.
3. Prioritize clarity, accessibility, and responsive usability.
4. Keep the customer journey connected across exactly four HTML pages.
5. Keep technician details and booking on the same page.
6. Use natural Thai interface copy.
7. Treat all demonstration data honestly.
8. Use this document as the source of truth for future UI implementation and visual refinements.
