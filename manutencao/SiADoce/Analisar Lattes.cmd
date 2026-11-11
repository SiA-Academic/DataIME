@echo off
setlocal
if "%~1"=="" (
  echo Salve o PDF junto de analisar-lattes.ps1 e execute no PowerShell:
  echo .\analisar-lattes.ps1 walner.pdf -Inicio 2022 -Fim 2026
  echo.
  pause
  exit /b 1
)
set "siadoce_shell=powershell.exe"
if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe" set "siadoce_shell=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\powershell\pwsh.exe"
where pwsh.exe >nul 2>nul
if not errorlevel 1 set "siadoce_shell=pwsh.exe"
"%siadoce_shell%" -NoProfile -File "%~dp0analisar-lattes.ps1" -ArquivoPDF "%~1"
set "siadoce_resultado=%ERRORLEVEL%"
echo.
pause
exit /b %siadoce_resultado%
