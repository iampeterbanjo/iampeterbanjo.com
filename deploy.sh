#!/usr/bin/env bash

# deploy project, make sure badges are updated
npm run lint && npm run test
git add packages/server/badges/
git commit -m 'update badges'
git push clever && git push github
