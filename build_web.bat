@echo off
echo --- Starting UI Build ---
cd ui
echo Running npm install...
:: "call" is crucial here
call npm install
echo Running npm build...
call npm run build
cd ..

echo --- All Done ---