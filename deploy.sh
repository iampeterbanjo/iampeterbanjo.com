#!/usr/bin/env bash
set -e

# deploy project, make sure badges are updated
npx lerna publish
npm run lint && npm run test
git add packages/server/badges/
git commit -m 'update badges'
git push clever && git push github
