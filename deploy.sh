#!/bin/sh

npm version patch --force

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo $PACKAGE_VERSION

git add -A

git commit -m "rebuild v$${PACKAGE_VERSION##*( )}"

# git push origin "$tag"

#git subtree push --prefix build origin gh-pages
