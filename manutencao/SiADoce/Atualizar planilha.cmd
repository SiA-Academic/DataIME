@echo off
setlocal
set "siadoce_shell=powershell.exe"
if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe" set "siadoce_shell=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe"
where pwsh.exe >nul 2>nul
if not errorlevel 1 set "siadoce_shell=pwsh.exe"
"%siadoce_shell%" -NoProfile -File "%~dp0atualizar-planilha.ps1"
set "siadoce_resultado=%ERRORLEVEL%"
echo.
pause
exit /b %siadoce_resultado%
