# Capturing the demo GIF

The README embeds `docs/images/demo.gif` showing the 8-second killer flow. Recapture any time the dashboard's killer interactions change.

## Tool (free, ~3MB download)
- **Windows**: [ScreenToGif](https://www.screentogif.com/)
- **macOS**: [Kap](https://getkap.co/)
- **Linux**: [Peek](https://github.com/phw/peek)

## Capture settings
- Frame size: **1280 × 720**
- Frame rate: **15 fps**
- Max length: **8 seconds**

## Setup
1. Open Chrome at exactly 1280×720 (resize the window — extensions like Window Resizer help)
2. Navigate to http://localhost:3000 in incognito (so the tour invite shows)
3. Close the tour invite (we want a clean recording, no overlays)
4. Hard refresh once so sync animation does NOT replay during recording

## The 8-second sequence
- t=0s — Cursor on the Hero card. Brief pause showing €502.4M.
- t=1s — Click "ALLOCATION" tab. Smooth scroll.
- t=2.5s — Click the red `+7.8` deviation pill. Modal opens.
- t=4s — Press Esc. Modal closes.
- t=4.5s — Scroll to Decision Journal (Section 05).
- t=6s — Click the `REJECTED 1-4` decision row. Inline expansion unfolds.
- t=7.5s — Brief pause showing the 4-panel Decision GPS layout.
- t=8s — Stop.

## Optimise
Target file size: < 5 MB. If larger, run through [ezgif.com/optimize](https://ezgif.com/optimize):
- Method: Lossy GIF (level 50)
- Color reduction: 128 colors

## Save
Save final file to `docs/images/demo.gif`. Commit and push.
