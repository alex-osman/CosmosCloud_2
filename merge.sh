#!/bin/bash

if [ "$TRAVIS_BRANCH" != "test" ]; then
	exit 0;
fi

git config credential.helper "store --file=.git/credentials"
 echo "https://${GH_TOKEN}:@github.com" > .git/credentials

git checkout master
git pull origin master
git merge $TRAVIS_COMMIT -m "merge from travis"
git push origin master