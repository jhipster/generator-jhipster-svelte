@echo off

@setlocal

set NPMW_DIR=%~dp0

if exist "%NPMW_DIR%\mvnw.cmd" (
  set NPM_EXE=%NPMW_DIR%\target\node\npm.cmd
  set INSTALL_NPM_COMMAND=%NPMW_DIR%\mvnw.cmd -ntp frontend:install-node-and-npm@install-node-and-npm
)

if not exist %NPM_EXE% goto globalNpm

%NPM_EXE% %*

:globalNpm
npm %*
