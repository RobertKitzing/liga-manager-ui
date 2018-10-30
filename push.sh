#!/bin/sh

setup_git() {
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
}

commit_documentation_files() {
    git checkout master
    git add /home/travis/build/RobertKitzing/liga-manager-ui/docs
    git commit --message "[skip travis] Update Documentation"
}

upload_files() {
    git remote add origin-pages https://${GITHUB_TOKEN}@github.com/RobertKitzing/liga-manager-ui > /dev/null 2>&1
    git push --quiet --set-upstream origin-pages master 
}

setup_git
commit_documentation_files
upload_files