---
name: anthropic-slide-style
description: Generates presentation slides in the strict style of Anthropic, featuring a fixed cream background (#FDFDFB), terracotta color palette (#C87E6F), hand-drawn illustrations, and specific fonts (Playfair Display, Inter). Use this skill to create visually consistent, warm, and intellectually-appealing presentations.
---

# Anthropic Slide Style Skill (Strict)

This skill generates presentation slides that strictly replicate the visual identity of Anthropic's presentations. It is designed to enforce visual consistency by using a fixed color palette, typography, and layout.

## Key Features (Fixed)

- **Color Palette**: The color palette is non-negotiable. The background is always cream (#FDFDFB), with terracotta (#C87E6F) and warm brown (#A56A57) as fixed accent colors.
- **Typography**: Fonts are strictly enforced. Headings MUST use **Playfair Display** (900 weight, black). Body text MUST use **Inter**.
- **Illustrations**: Illustrations MUST be simple, hand-drawn style line art with only subtle terracotta accents. No other colors are permitted.
- **Layout**: Layouts are clean and spacious. The "ANTHROPIC" logo is always placed in the bottom-left corner.

## Workflow

1.  **Prepare Slide Content**: Create a Markdown file with your slide content. The structure is flexible, but headings and lists are recommended.
2.  **Generate Illustrations (If Needed)**: Use the `generate` tool with the highly specific prompts from `references/illustration_prompts.md`. These prompts are designed to strictly enforce the visual style.
3.  **Generate Slides**: Use the `slides` tool in `image` mode. This is mandatory to ensure the precise rendering of fonts, colors, and the hand-drawn aesthetic. The skill automatically applies the strict CSS rules.

## Bundled Resources

-   **`templates/slide_template.md`**: A boilerplate Markdown file to structure your slide content.
-   **`references/illustration_prompts.md`**: A collection of highly specific prompt examples for generating illustrations that strictly match the Anthropic style. Adherence to these prompts is critical for visual consistency.
-   **`references/style.css`**: (For reference) Contains the core CSS that strictly defines the color variables, font families, and layout rules. This is automatically used by the `slides` tool when this skill is active.
-   **`assets/`**: Contains font files and other static assets.

To create a presentation, start by copying the template:

```bash
cp /home/ubuntu/skills/anthropic-slide-style/templates/slide_template.md ./my_presentation.md
```

Then, edit `my_presentation.md` with your content and follow the workflow above. **Do not deviate from the specified styles, colors, or fonts.**
