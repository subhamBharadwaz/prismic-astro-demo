# Field Notes — static Prismic blog demo

An Astro, React, and Tailwind site built for regular static hosting such as Hostinger. The blog is fetched from Prismic in the visitor's browser, so a newly published post appears immediately without a rebuild or server.

## Run it

```bash
npm install
npm run dev
```

## Prismic connection

This demo is already connected to the public `blogetest` repository. It reads the `blog_post` custom type and these fields:

| Field | Prismic field type | Required |
| --- | --- | --- |
| `title` | Rich Text | Yes |
| `date` | Date | Yes |
| `content` | Rich Text | Yes |
| `image` | Image | Recommended |

Optional fields supported by the UI: `excerpt` (Key Text or Rich Text), `category` (Select), and `author` (Key Text or Rich Text).

Keep the Prismic repository public: this architecture intentionally makes no access token available in browser JavaScript.

## Deploy to Hostinger

1. Run `npm run build`.
2. Upload the contents of `dist/` (not the folder itself) to Hostinger's `public_html` directory.
3. The blog works at `/blog`; articles use URLs such as `/blog?post=first-post`, which work on any static host without rewrite rules.

## Free test deployment: GitHub Pages

1. Create an empty GitHub repository and push this folder to its `main` branch.
2. In the GitHub repository, open **Settings → Pages → Build and deployment** and choose **GitHub Actions** as the source.
3. Push a commit. The included workflow builds and deploys the site automatically.
4. Open the deployment URL shown in the workflow, usually `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

The configuration automatically handles GitHub's repository subfolder, so the journal and article links work in both GitHub Pages and Hostinger.

## Important trade-off

Prismic posts are live immediately, but their HTML is rendered in the browser. If organic-search SEO becomes a priority, switch to a webhook-triggered static build later.
