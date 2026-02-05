# GAI Research Ethics Toy

A Moral Machine–style vignette game about the appropriate use of generative AI (GAI) in research. The app helps researchers reflect on their ethical stance toward AI adoption in academic workflows.

## Features

- **24 Research Vignettes**: Realistic scenarios spanning literature review, analysis, writing, student mentoring, and more.
- **Variant Families**: Many cases have 2–3 variants that differ on a single factor (e.g., disclosure, oversight, risk), revealing how specific conditions change your mind.
- **Conditional Safeguards**: For each case, choose from 10 customizable conditions (e.g., human verification, disclosure, bias checking) that would make AI use appropriate.
- **Ethical Style Inference**: The app builds a report of your ethical profile based on which conditions you prioritize and how often you disapprove.
- **100% Client-Side**: All data stays in your browser using `localStorage`. No accounts, no server uploads, no analytics.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation & Running

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx          # Shell with header/footer
  globals.css         # Dark theme & component styles
  page.tsx            # Landing page
  play/page.tsx       # Main game interface
  results/page.tsx    # Results view
components/
  CaseCard.tsx        # Renders a single case vignette
  ConditionsChecklist.tsx  # Condition selector
  ProgressBar.tsx     # Play progress display
  ResultsBlocks.tsx   # Results report builder
lib/
  types.ts            # Core type definitions
  storage.ts          # localStorage helpers
  engine.ts           # Game logic (shuffle, session, report generation)
data/
  cases.json          # 24 research scenarios
  conditions.json     # 10 ethical safeguards
```

## How It Works

1. **Load Session**: If no session exists, a new one is created with shuffled case order.
2. **Play Cases**: For each case, choose a verdict:
   - **Approve**: GAI use is appropriate.
   - **Approve with Conditions**: GAI use OK if safeguards are met (select from list).
   - **Disapprove**: GAI should not be used.
3. **Build Report**: After all cases:
   - **Ethical Style**: Inferred label based on conditions & disapproval rate.
   - **Top Conditions**: Most frequently required safeguards.
   - **Dealbreakers**: Case attributes that correlate with disapproval.
   - **Mind Changers**: Factors that flipped your verdict across variants.
4. **Download & Clear**: Export results as JSON or clear your run locally.

## Technology

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Vanilla CSS** (dark theme, no Tailwind)
- **Client-Only Logic**: No database, no API, no auth

## Data Format

### Cases

Each case has:
- `id`: unique identifier
- `familyId` (optional): groups variants (e.g., "writing_disclosure")
- `changedFactor` (optional): what differs from base case in the family
- `title`: short scenario name
- `prompt`: full scenario text
- `tags`: metadata for report building (role, purpose, risk level, etc.)

### Conditions

Each condition has:
- `id`: unique identifier
- `label`: human-readable safeguard description

## Example Variant Family

```json
{
  "id": "writing_disclosure_1",
  "familyId": "writing_disclosure",
  "title": "Drafting a literature review",
  "prompt": "A PhD student uses ChatGPT to generate an outline...",
  "tags": { "disclosure": "not planned", ... }
}
```

The same family may have variants with:
- `disclosure: "planned"`
- `advisor_involvement: "approved in advance"`

This reveals whether you need disclosure or approval to approve AI use.

## Report Structure

The `Report` object includes:
- `completedCount` / `totalCount`: progress
- `topConditions`: conditions selected most often (top 7)
- `dealbreakers`: tag=value combinations that strongly correlate with disapprovals
- `mindChangers`: factors that caused verdict flips within families
- `styleLabel` + `styleRationale`: inferred ethical profile

## localStorage Key

All session data is stored under the key: `gai_ethics_toy_session_v1`

You can clear it anytime via the "Clear Run" button or browser dev tools.

## Building for Production

```bash
npm run build
npm start
```

## Contributing

Contributions welcome! Please feel free to:
- Add more case scenarios
- Refine conditions or tags
- Improve styling or UX
- Suggest ethical framework changes

---

**Questions?** Open an issue or check the code comments in `lib/engine.ts` for details on report generation logic.
