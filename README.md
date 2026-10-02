# Za3-Landing-page

Landing page, sign up, sign in and student onboarding for **Dr. Za3balawy**, an IGCSE chemistry teacher.

Built with [Next.js 14](https://nextjs.org/) (App Router), [Framer Motion](https://www.framer.com/motion/), [Tailwind CSS](https://tailwindcss.com/) and [styled-components](https://styled-components.com/).

## Pages

| Route         | What it is                                                                       |
| ------------- | -------------------------------------------------------------------------------- |
| `/`           | Hero-only landing page — full-bleed portrait, parallax name marquee, preloader    |
| `/about`      | Dr. Za3balawy's bio                                                               |
| `/signup`     | Account creation form                                                             |
| `/signin`     | Returning student sign in                                                         |
| `/onboarding` | Six-step student onboarding, including profile photo and notes image upload       |

## Status

The auth and onboarding screens are **front-end only**. Sign up validates and routes to onboarding, sign in validates, and onboarding keeps its answers in React state — none of it talks to a backend yet. The handoff points are marked with `//?` comments, ready to be wired to the LMS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Create `.env.local` (it is git-ignored):

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Production build                 |
| `npm start`     | Serve the production build       |
| `npm run lint`  | ESLint + Tailwind class linting  |

## Theming

The landing page uses the base palette defined in [`app/_lib/plugins/tailwind.js`](app/_lib/plugins/tailwind.js). The auth and onboarding pages opt into a Notion-flavoured palette through the `.auth-theme` class in [`app/globals.css`](app/globals.css), which re-declares the same tokens — so the two areas can be restyled independently.

## Credits

Based on the open-source [Dennis Snellenberg portfolio template](https://github.com/AliBagheri2079/dennis-snellenberg-portfolio) by Ali Bagheri, rebuilt for Dr. Za3balawy.
