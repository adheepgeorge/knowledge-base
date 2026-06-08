---
sidebar_position: 5
title: Embedding Claude designs
---

# Embedding Claude designs

Claude design produces a **self-contained HTML document** — it carries its own
`<head>`, CSS, and (sometimes) JavaScript. You can't paste that straight into a
page, because MDX would try to parse the markup as JSX and the artifact's global
CSS would collide with the site theme.

Instead, drop the file in as-is and render it through the `<Embed>` component,
which loads it in an isolated `<iframe>`. The artifact stays byte-for-byte
unchanged, and styles don't leak in either direction.

## Steps

1. **Save the raw HTML.** Put the file Claude gave you under
   [`static/embeds/<topic>/`](https://github.com/adheepgeorge/knowledge-base/tree/main/static/embeds)
   without editing it — e.g. `static/embeds/agent-skills/pricing-page.html`.
   Mirror the `docs/` folder structure: each topic gets its own subfolder so
   artifacts stay organised as the site grows (see [Organising embeds](#organising-embeds)).

2. **Import the component** at the top of any `.md` / `.mdx` page:

   ```jsx
   import Embed from '@site/src/components/Embed';
   ```

3. **Embed it** wherever you want it to appear:

   ```jsx
   <Embed src="embeds/agent-skills/pricing-page.html" title="Pricing page mockup" />
   ```

That's it — the path is relative to the site root, and the iframe auto-sizes to
the content's height.

## Organising embeds

Keep `static/embeds/` mirrored to the `docs/` tree — one subfolder per topic, so
it's always obvious which artifact belongs to which page:

```
static/embeds/
  _shared/            # demos / artifacts reused across topics
  agent-skills/       # ↔ docs/agent-skills/
  open-spec/          # ↔ docs/open-spec/
  mcp/                # ↔ docs/mcp/
```

Conventions:

- **Folder name = docs folder name.** Editing the `mcp` docs? The artifacts live
  in `embeds/mcp/`.
- **File name = the design's purpose**, not `design1.html` — e.g.
  `server-setup.html`. One HTML file per design.
- **`_shared/`** holds anything reused across topics (the demo below lives there).

## Live example

import Embed from '@site/src/components/Embed';

<Embed src="embeds/_shared/example.html" title="Example Claude design embed" />

## Options

| Prop        | Type     | Default            | Description                                              |
| ----------- | -------- | ------------------ | -------------------------------------------------------- |
| `src`       | string   | _(required)_       | Path to the HTML file, relative to the site root.        |
| `title`     | string   | `"Embedded design"`| Accessible label for the iframe.                         |
| `height`    | number   | _(auto)_           | Fixed height in px. Omit to auto-size to the content.    |
| `minHeight` | number   | `400`              | Height shown while the content loads.                    |
| `style`     | object   | —                  | Extra inline styles (e.g. override the border/radius).   |

## Notes

- **Auto-height** works because embeds are served from the same origin as the
  site. If your artifact loads content asynchronously, pass an explicit
  `height` to avoid layout shift.
- **Scripts run** inside the iframe. The artifact is sandboxed to its own
  document, so it can't touch the surrounding page.
- Keep one HTML file per design. To update a design, just replace the file.
