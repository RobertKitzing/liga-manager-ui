#!/bin/sh

setup_git() {
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

commit_documentation_files() {
    git add ./docs
    git commit --message "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
    git push --quiet --set-upstream origin-gh-pages gh-pages 
}

setup_git
commit_documentation_files
upload_files