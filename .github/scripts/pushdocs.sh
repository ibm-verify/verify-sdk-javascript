#!/bin/bash

PAGES_USER="ibm-verify"
PAGES_REPO="ibm-verify.github.io"
PAGES_BRANCH="main"
DESTINATION_ROOT="${GITHUB_WORKSPACE}/docs"
SOURCE_ROOT="${GITHUB_WORKSPACE}/monorepo"
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BRANCH_NAME="feature/auto-pr-${GITHUB_RUN_ID}-${TIMESTAMP}"

echo "Generated branch name: $BRANCH_NAME"

# generate sdk docs and copy to respective locations
for MODULE in `ls -d $SOURCE_ROOT/sdk/*`
do
  cd ${MODULE} && rm -rf node_modules package-lock.json && npm i && npm run docs && cd -
  DOC_TARGET_FOLDER="${DESTINATION_ROOT}/javascript/${MODULE##*/}/docs"
  mkdir -p "${DOC_TARGET_FOLDER}"
  cp -R ${MODULE}/docs/. ${DOC_TARGET_FOLDER}/
done

# configure and push to github docs repo
cd ${SOURCE_ROOT}
MESSAGE=`git log --format=%B -n 1`
cd ${DESTINATION_ROOT}

# suppress GH token in the authorization header.
# thanks to https://stackoverflow.com/a/64271581/5099773
git config -l | grep 'http\..*\.extraheader' | cut -d= -f1 | \
    xargs -L1 git config --unset-all

# set up git config
git config user.email "shankarv@sg.ibm.com"
git config user.name "shankarv"
git remote set-url origin https://${GH_PAGES_TOKEN}@github.com/${PAGES_USER}/${PAGES_REPO}

git diff --no-pager --exit-code
if [ $? -eq 0 ]; then
  echo "No changes found."
  git status
else
  echo "Changes found (unstaged or staged changes exist)."
  # switch to a feature branch
  git checkout -b $BRANCH_NAME

  # commit changes
  git add -A
  git commit -m "${MESSAGE}"

  # push to repo
  git push -u origin $BRANCH_NAME

  # create a PR
  echo "Going to create PR"
  gh pr create \
    --body "" \
    --title "docs(auto): update documentation" \
    --head "$BRANCH_NAME" \
    --base "master"
fi

# git config --get remote.origin.url
# git remote set-url origin https://${{ secrets.GH_PAGES_TOKEN }}@github.com/${PAGES_USER}/${PAGES_REPO}
# git push origin
# git config --get remote.origin.url

# git push -u https://${PAGES_USER}:${GH_PAGES_TOKEN}@github.com/${PAGES_USER}/${PAGES_REPO}
