#!/bin/sh

setup_git() {
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

commit_documentation_files() {
    git checkout -b gh-pages
    git add ./documentation/*
    git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
    # git remote add origin-gh-pages https://${GITHUB_TOKEN}@github.com/RobertKitzing/liga-manager-ui.git > /dev/null 2>&1
    git push --quiet --set-upstream origin-gh-pages gh-pages 
}

setup_git
commit_documentation_files
upload_files