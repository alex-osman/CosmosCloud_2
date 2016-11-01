#!/bin/bash

if [ "$TRAVIS_BRANCH" != "test" ]; then
	exit 0;
fi

git checkout master
git pull origin master
git merge $TRAVIS_COMMIT
git push origin master
