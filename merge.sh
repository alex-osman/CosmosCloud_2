#!/bin/bash

if [ "$TRAVIS_BRANCH" != "test" ]; then
	exit 0;
fi

git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials
export GIT_COMMITTER_EMAIL='travis@travis'
export GIT_COMMITTER_NAME='Travis CI'

git clone git@github.com:alex-osman/CosmosCloud_SD.git

git checkout master

git merge $TRAVIS_COMMIT
git push origin master



#git merge $TRAVIS_COMMIT || exit
#git push origin master