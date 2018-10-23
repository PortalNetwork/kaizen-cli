git checkout master	
echo "Version update" 
npm version patch
echo "Commit"
git commit --amend -m  "[ci skip] version changed"
git remote -v
echo "Push"
git push https://${GIT_ACCOUNT}:${GIT_PW}@github.com/PortalNetwork/kaizen-cli.git master