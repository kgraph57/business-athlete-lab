---
name: anthropic-slide-style
description: Generates presentation slides in the Anthropic style, supporting both decorative hand-drawn illustrations and structured business diagrams. Use this skill for visually consistent, warm, and intellectually-appealing presentations.
---

# Anthropic Slide Style Skill

This skill generates presentation slides that replicate the visual identity of Anthropic. It provides a comprehensive set of templates for a full business presentation.

## Key Features

- **Color Palette**: Strictly enforced based on Anthropic's official brand guidelines.
- **Typography**: Headings use **Playfair Display** (900 weight). Body text uses **Inter**.
- **Layouts**: Provides CSS classes and HTML templates for 7 common slide patterns.

## Workflow

1.  **Choose a Template**: Select an HTML template from the `templates/` directory that matches your content needs.
2.  **Initialize Project**: Use `slide_initialize` with `generate_mode: 'html'`.
3.  **Create Slide**: Use `slide_edit` to insert the HTML template and populate it with your content. Customize colors and styles using the provided CSS classes.

## Slide Patterns & Templates

-   **`template_title.html`**: **Title Slide**. Asymmetrical layout with a large title and a decorative hand-drawn illustration.
-   **`template_toc.html`**: **Table of Contents**. Clean, numbered list with generous whitespace and a small decorative icon.
-   **`template_section_break.html`**: **Section Break**. Full-bleed accent color background with a single, centered title.
-   **`template_2_column.html`**: **Two-Column Text**. For balanced presentation of related text points.
-   **`template_diagram_3_card.html`**: **3-Card Layout**. For comparing three distinct items or concepts.
-   **`template_diagram_flowchart.html`**: **Flowchart**. For visualizing processes and workflows.
-   **`template_data_chart.html`**: **Data Visualization**. A container for a Chart.js graph, styled with the brand palette.

## Bundled Resources

-   **`references/style.css`**: Contains all CSS rules for every pattern.
-   **`references/illustration_prompts.md`**: Prompts for generating decorative illustrations for title/TOC slides.
