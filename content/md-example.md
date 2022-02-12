---
title: Using markdown
description: Notes on how to render markdown
summary: Custom components, head, hot reload
image: ""
imageAlt: ""
---

# Rendering markdown

## Head

The properties at the top of this file are turned into meta tags. The package gray-matter extracts them from this file. See the BlogHead component for property mapping. The head is added for both .md and .mdx files.

## Hot reload

The content directory is not watched by the dev server. Run `npm run build` and restart the dev server to see changes.

## MDX

Custom components can be made available in Markdown files using MDX.
