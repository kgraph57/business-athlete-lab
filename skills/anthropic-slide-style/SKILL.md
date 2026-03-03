---
name: anthropic-slide-style
description: Generates presentation slides in the Anthropic style, supporting both decorative hand-drawn illustrations and structured business diagrams. Use this skill for visually consistent, warm, and intellectually-appealing presentations.
---

# Anthropic Slide Style Skill

This skill generates presentation slides that replicate the visual identity of Anthropic. It supports two primary modes for different use cases:

1.  **Decorative Slides (`image` mode)**: For title pages, section breaks, or conceptual illustrations. Uses AI image generation to create hand-drawn, sketchy line art.
2.  **Business Diagrams (`html` mode)**: For main content slides. Uses HTML and CSS to create structured, clean diagrams like 3-column card layouts and process flowcharts. This ensures text is crisp and the layout is precise.

## Key Features

- **Color Palette**: Strictly enforced based on Anthropic's official brand guidelines (`--swatch--ivory-light`, `--swatch--clay`, `--swatch--slate-dark`, etc.).
- **Typography**: Headings use **Playfair Display** (900 weight). Body text uses **Inter**.
- **Layouts**: Provides CSS classes and templates for common business diagrams.

## Workflow

### For Business Diagram Slides (Recommended for Content)

1.  **Choose a Template**: Select a diagram template from the `templates/` directory (e.g., `diagram_3_card.html`).
2.  **Initialize Project**: Use `slide_initialize` with `generate_mode: 'html'`.
3.  **Create Slide**: Use `slide_edit` to insert the HTML template and populate it with your content. Customize colors using the provided CSS classes (`.card-clay`, `.card-oat`, `.card-kraft`).

### For Decorative Illustration Slides

1.  **Initialize Project**: Use `slide_initialize` with `generate_mode: 'image'`.
2.  **Generate Slide**: Use `image_slide_generate` with a prompt from `references/illustration_prompts.md`.

## Bundled Resources

-   **`references/style.css`**: Contains all CSS rules, including classes for colors (`.bg-clay`, `.bg-oat`, `.bg-kraft`) and diagram components.
-   **`templates/diagram_3_card.html`**: HTML boilerplate for a 3-column rounded card layout.
-   **`templates/diagram_flowchart.html`**: HTML boilerplate for a process flowchart.
-   **`references/illustration_prompts.md`**: Prompts for generating decorative, hand-drawn illustrations.
