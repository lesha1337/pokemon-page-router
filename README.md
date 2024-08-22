# Pokémon Next.js Example

This example project demonstrates a few ISR features in a Pokémon Next.js application.

## Getting Started

- Install dependencies: `pnpm i`
- Start the development server: `pnpm dev`
- Build + start: `pnpm build && pnpm start`

## Table of Contents

### `pages/index.tsx`

This is the main page, displaying a list of Pokémon. It uses [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) to fetch initial data at build time.

### `pages/[pokemonId].tsx`

These pages use Incremental Static Regeneration (ISR) to generate Pokémon details pages. The [`getStaticPaths`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths) method defines the available paths, while [`getStaticProps`](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props) fetches the data for each page. Here's an example of how it looks during the build:

```bash
/pokemon/[pokemonId] (ISR: 3600 Seconds)
├ /en/pokemon/1 (495 ms)
├ /en/pokemon/2 (467 ms)
├ /en/pokemon/3 (509 ms)
├...
├ /jp/pokemon/1 (509 ms)
├...
```

### `pages/content-revalidation`

This page contains a form that can trigger manual revalidation of static content by sending a request to `/api/revalidate`.
