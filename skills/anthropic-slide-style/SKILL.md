---
name: anthropic-slide-style
description: Generates presentation slides in the style of Anthropic, featuring a cream background, terracotta color palette, hand-drawn illustrations, and a distinctive serif font for headings. Use this skill to create warm, intellectually-appealing presentations.
---

# Anthropic Slide Style Skill

This skill generates presentation slides that replicate the visual identity of Anthropic's presentations. It is ideal for creating slides that are both professional and approachable, with a warm, academic aesthetic.

## Key Features

- **Color Palette**: A warm and inviting palette centered around cream, terracotta, and muted tones.
- **Typography**: A combination of a bold, elegant serif font for headings and a clean sans-serif for body text.
- **Illustrations**: Simple, hand-drawn style line art with subtle color accents.
- **Layout**: Clean, spacious layouts with a consistent placement of the "ANTHROPIC" logo.

## Workflow

1.  **Prepare Slide Content**: Create a Markdown file with your slide content. Follow the structure in `templates/slide_template.md` for headings, lists, and text.
2.  **Generate Illustrations**: If your slides require diagrams or illustrations, use the `generate` tool with prompts inspired by the examples in `references/illustration_prompts.md`. The key is to ask for "simple, hand-drawn, sketchy line art" with minimal color fills.
3.  **Generate Slides**: Use the `slides` tool in `image` mode. This skill relies on generating slides as images to perfectly capture the fonts, colors, and hand-drawn feel. The CSS styles required are automatically applied by the skill's bundled resources.

## Bundled Resources

-   **`templates/slide_template.md`**: A boilerplate Markdown file to structure your slide content. It demonstrates the recommended use of headings and lists.
-   **`references/illustration_prompts.md`**: A collection of prompt examples for generating illustrations that match the Anthropic style.
-   **`references/style.css`**: (For reference, not direct use) Contains the core CSS that defines the color variables, font families, and layout rules. This is automatically used by the `slides` tool when this skill is active.
-   **`assets/`**: Contains font files and other static assets.

To create a presentation, start by copying the template:

```bash
cp /home/ubuntu/skills/anthropic-slide-style/templates/slide_template.md ./my_presentation.md
```

Then, edit `my_presentation.md` with your content and follow the workflow above.
