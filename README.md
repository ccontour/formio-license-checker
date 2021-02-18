# How to use
1. Clone repo
  - Make sure `yarn` is installed
2. Make sure you have access to any dependency repos (if they are coming from pkg)
3. "./run.sh"

That file will
- Set up local repo
- Pull licenses from all repos listed in config.json
- Run license checks against all those, and every dependency they install
- Create a csv file: output/licenses.csv
