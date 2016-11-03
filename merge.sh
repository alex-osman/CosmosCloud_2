#!/bin/bash

if [ "$TRAVIS_BRANCH" != "test" ]; then
	exit 0;
fi
echo "cloning and cd temp"
git clone "https://github.com/alex-osman/CosmosCloud_SD" "temp"
cd "temp"

git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials
export GIT_COMMITTER_EMAIL='travis@travis'
export GIT_COMMITTER_NAME='Travis CI'

push_uri="https://$GH_TOKEN@github.com/CosmosCloud_SD"


echo "checking out master"
git checkout master

echo "merging"
git merge -m "$TRAVIS_COMMIT"

echo "pushing to master"
git push origin master