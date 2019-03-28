# Blog

Personal blog and front-end for projects using Gatsby.

## Posts

Blog posts are written in Markdown

## Projects

This uses Gatsby to [programmatically create static pages][4] from JSON APIs.

## Development

- `npm run dev` starts two processes to watch for changes to the API and for changes to the front-end. Front-end changes can be viewed on port [8000][1] and API changes on port [9000][2]. The distinction is because changes made to the API have to be built while the front-end can be hot-reloaded.

- `npm run test-watch` checks PWA stats during development

## Notes

- Workbox caches pages using [service workers][3] so during development multiple page refreshes may be required.

[1]: http://localhost:8000
[2]: http://localhost:9000
[3]: https://www.gatsbyjs.org/packages/gatsby-plugin-offline/
[4]: https://www.gatsbyjs.org/tutorial/part-seven/
