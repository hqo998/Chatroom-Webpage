@echo off
echo --- Starting UI Build ---
cd ui
echo Running npm install...
:: "call" is crucial here
call npm install
echo Running npm build...
call npm run build
cd ..

echo --- Starting C++ Build ---
:: Check if build folder exists, if not, create it
if not exist "build" mkdir build
cd build
echo Running cmake...
cmake ..
echo Building...
cmake --build . --config Release
cmake --build . --config Debug

echo --- All Done ---