#!/bin/bash -e

: "${GITHUB_SECRET_TOKEN?}"

export GIT_COMMITTER_EMAIL='travis@travis'
export GIT_COMMITTER_NAME='Travis CI'

if ! grep -q "development" <<< "$TRAVIS_BRANCH"; then
    printf "Current branch %s doesn't match regex %s, exiting\\n" \
        "$TRAVIS_BRANCH" "development" >&2
    exit 0
fi

# Since Travis does a partial checkout, we need to get the whole thing
repo_temp=$(mktemp -d)
git clone "https://github.com/sorbae/twitch-clone" "$repo_temp"

# shellcheck disable=SC2164
cd "$repo_temp"

printf 'Checking out %s\n' "master" >&2
git checkout origin master

printf 'Merging %s\n' "$TRAVIS_COMMIT" >&2
git merge "$TRAVIS_COMMIT"

printf 'Pushing to %s\n' "sorbae/twitch-clone" >&2

push_uri="https://$GITHUB_SECRET_TOKEN@github.com/sorbae/twitch-clone"

# Redirect to /dev/null to avoid secret leakage
git push "$push_uri" "master" >/dev/null 2>&1
git push "$push_uri" :"$TRAVIS_BRANCH" >/dev/null 2>&1
