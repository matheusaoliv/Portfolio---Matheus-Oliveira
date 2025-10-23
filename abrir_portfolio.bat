@echo off
setlocal EnableExtensions
chcp 65001 >nul

:: Ir para a pasta onde este .bat está
pushd "%~dp0"

echo(
echo == Portfolio - Matheus Oliveira ==
echo(

:: Verificar se npm/Node.js está instalado
where.exe npm >nul 2>nul
if errorlevel 1 goto :NPM_MISSING

:: Se node_modules nao existe, instalar dependencias
if not exist "node_modules" goto :INSTALL

goto :START_DEV

:INSTALL
echo(
echo Instalando dependencias (npm install)...
call npm install
if errorlevel 1 goto :INSTALL_FAIL

goto :START_DEV

:START_DEV
:: Iniciar Vite e abrir no navegador automaticamente
:: O script "dev" no package.json executa "vite".
echo(
echo Iniciando servidor de desenvolvimento (Vite) e abrindo no navegador...
echo Feche esta janela para encerrar o servidor.
echo(
call npm run dev -- --open

goto :END

:NPM_MISSING
echo ERRO: NPM/Node.js nao encontrado. Instale o Node.js em https://nodejs.org/ e tente novamente.
pause
goto :END

:INSTALL_FAIL
echo(
echo ERRO ao instalar dependencias.
pause
goto :END

:END
popd
endlocal
