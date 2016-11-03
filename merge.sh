#!/bin/bash

if [ "$TRAVIS_BRANCH" != "test" ]; then
	exit 0;
fi
echo "cloning and cd temp"
git clone "https://github.com/alex-osman/CosmosCloud_SD" "temp"
cd "temp"

git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials

push_uri="https://$GH_TOKEN@github.com/CosmosCloud_SD"


echo "checking out master"
git checkout master

echo "setting credentials"
git config --global user.email "travis@travis.com"
git config --global user.name "travis"

echo "fetch and merge"
git fetch
git merge origin/test -m "$TRAVIS_COMMIT"

echo "pushing to master"
git push origin master