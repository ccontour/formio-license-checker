yarn install
yarn install -G license-checker
yarn build-deps
cd output
yarn install
license-checker --production --csv > ./licenses.csv
