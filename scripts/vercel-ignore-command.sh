#!/bin/sh

# If the PR is created by `dependabot[bot]` and the branch is not `main`, ignore the build.
if [ "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN" = "dependabot[bot]" ] && [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then
  echo "🛑 Ignoring build for dependabot[bot] PR (branch: $VERCEL_GIT_COMMIT_REF, author: $VERCEL_GIT_COMMIT_AUTHOR_LOGIN)"
  exit 0 # Return `0` to skip the build.
fi

# Proceed with the build in other cases.
echo "✅ Proceeding with the build (branch: $VERCEL_GIT_COMMIT_REF, author: $VERCEL_GIT_COMMIT_AUTHOR_LOGIN)"
exit 1 # Return `1` to proceed with build.
