# Create release script
#
# prerequisites:
# `yarn install -g rimraf conventional-recommended-bump conventional-changelog-cli conventional-github-releaser conventional-commits-detector json`
#
# `np` with optional argument `patch`/`minor`/`major`/`<version>`
# defaults to conventional-recommended-bump
# and optional argument preset `angular`/ `jquery` ...
# defaults to conventional-commits-detector
#
# For release setup token authentication (https://github.com/conventional-changelog/conventional-github-releaser)

echo "Apagando node_modules" &&
rimraf node_modules &&
echo "git checkout develop" &&
git checkout develop &&
echo "git pull --rebase" &&
git pull --rebase &&
echo "git checkout master" &&
git checkout master &&
echo "git pull --rebase" &&
git pull --rebase &&
echo "git merge develop" &&
git merge --no-ff develop &&
echo "yarn install" &&
yarn &&
echo "yarn lint" &&
yarn lint &&
echo "yarn test" &&
yarn test &&
echo "yarn e2e test" &&
yarn test:e2e &&
rimraf package-lock.json &&
cp package.json _package.json &&
preset=$(conventional-commits-detector) &&
echo ${2:-$preset} &&
bump=$(conventional-recommended-bump -p ${2:-$preset}) &&
echo ${1:-$bump} &&
npm --no-git-tag-version version ${1:-$bump} &&
conventional-changelog -i CHANGELOG.md -s -p ${2:-$preset} &&
git add CHANGELOG.md &&
version=$(json -f package.json version) &&
echo ${3:-$version} &&
git commit -m"docs(CHANGELOG): v$version" &&
mv -f _package.json package.json &&
npm version ${1:-$bump} -m "chore(release): v%s" &&
git push --follow-tags &&
git checkout develop &&
git merge --no-ff master &&
git push origin develop &&
conventional-github-releaser -p ${2:-$preset}