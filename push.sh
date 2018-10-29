#!/bin/sh

setup_git() {
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

commit_documentation_files() {
    git add /home/travis/build/RobertKitzing/liga-manager-ui/docs
    git commit --message "[skip travis] Update Documentation"
}

upload_files() {
    git push --quiet
}

setup_git
commit_documentation_files
upload_files