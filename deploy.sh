#!/bin/sh

rm -rf build

pnpm run build

pnpm run postbuild

node readme.js

if [ $# -eq 0 ]
then
	echo "no version bump"
else
	npm version $1 --force
fi

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

echo $PACKAGE_VERSION

git add -A

git commit -m "$PACKAGE_VERSION $1"

#git subtree push --prefix build origin gh-pages
