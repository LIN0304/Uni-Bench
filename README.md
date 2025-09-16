# Benchmark Arena

## Overview
Benchmark Arena is a self-contained web dashboard for exploring AI model benchmark results. It renders interactive bar charts and tables entirely in the browser using plain HTML, CSS, and JavaScript so it can be hosted on any static file server without build tooling or external dependencies.

## Features
- **Dataset tabs with metadata** – switch between the built-in benchmark collections defined in `assets/data.js`, each with units and optional source links displayed above the chart.
- **Search, filter, and sort controls** – filter models by name, restrict the view to a single model family, choose sort orders, or normalize the bars directly from the control panel at the top of the page.
- **Automatic family detection and legend** – model rows are grouped by family using keyword patterns, and the chart/table surfaces icons or colors with an accompanying legend for quick scanning.
- **Shareable and downloadable views** – every interaction updates the URL hash for deep linking, and the current SVG visualization can be downloaded in one click.
- **Theme toggle with persistence** – switch between light and dark themes; the preference is remembered via `localStorage`.
- **Embedded resource tabs** – additional tabs expose pre-packaged HTML summaries (e.g., the AI IQ chart or benchmark link hub) inside an iframe without leaving the app.

## Project structure
The repository is intentionally lightweight. Key files include:

| Path | Description |
| --- | --- |
| `index.html` | Root HTML shell that wires the controls, chart container, and script/style assets. |
| `assets/styles.css` | Global styles, layout primitives, and theme variables. |
| `assets/app.js` | Client-side renderer that builds tabs, charts, tables, tooltips, downloads, and deep-link handling. |
| `assets/data.js` | Benchmark dataset definitions and model family matching rules. |
| `assets/icons/` | Inline-friendly SVG icons used for family badges. |
| `assets/links/` | Standalone HTML snapshots referenced by the external tabs list in `assets/links/pages.js`. |

## Getting started
Because everything is static, you only need a basic HTTP server for local previews:

```bash
# Clone the repository
git clone <repo-url>
cd Uni-Bench

# Start any static server (Python shown below)
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser and select a dataset tab to explore the charts. The footer confirms that the app runs without external libraries.

## Editing benchmark data
Benchmark content lives in `assets/data.js` as the `window.BENCHMARK_DATA` array. Each dataset object supports the following fields:

- `id` – unique identifier used in URL hashes and tab lookups.
- `title` – human-readable label surfaced in the tabs and metadata banner.
- `unit` – either `percent` or `score` to control formatting.
- `source` – optional URL displayed as a “Source” link beside the dataset title.
- `entries` – an array of model rows `{ name, value }` plus optional `up`, `down`, or `notes` fields for change indicators.

Model families are inferred using the `window.BENCHMARK_FAMILIES` keyword matchers defined at the bottom of the same file. Update the regex patterns or add new entries if you introduce additional vendors.

## Extending navigation and resources
External tabs are configured in `assets/app.js` via the `EXTERNAL_TABS` list and the generated entries from `assets/links/pages.js`. To add a new resource:

1. Drop an HTML snapshot into `assets/links/<your-id>.html`.
2. Append `{ id: '<your-id>', label: '<Display Name>' }` to `window.LINK_PAGES` in `assets/links/pages.js`.
3. (Optional) Provide a `source` URL or custom icon for the tab in `assets/app.js` if it should display attribution metadata.

## Useful tips
- Clicking a bar highlights the corresponding row in the table, making it easy to correlate chart selections with tabular data.
- The “Download SVG” button always reflects the active dataset view, so apply any desired filters before exporting.
- The shareable URL hash captures the active tab, search text, family filter, sort option, and normalization state, allowing you to save or share exact views with collaborators.
