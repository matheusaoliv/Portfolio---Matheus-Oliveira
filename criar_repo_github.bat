@echo off
setlocal EnableExtensions
chcp 65001 >nul
pushd "%~dp0"

echo(
echo == Criar e publicar no GitHub ==

set REPO_SLUG=matheusaoliv/Portfolio---Matheus-Oliveira
set REPO_URL=https://github.com/%REPO_SLUG%.git

:: Se uma URL foi passada como argumento, usar ela (ex.: git@github.com:usuario/repo.git)
if not "%~1"=="" set REPO_URL=%~1

echo Repositorio: %REPO_SLUG%
echo Remote URL: %REPO_URL%

echo(
where.exe git >nul 2>nul
if errorlevel 1 goto :NO_GIT

:: Inicializa repo se nao existir
if not exist ".git" (
  echo Inicializando repositorio Git...
  git init
)

:: Detecta branch atual (pode estar vazio em repos iniciais)
set "CURBR="
for /f "tokens=*" %%b in ('git branch --show-current 2^>nul') do set CURBR=%%b
if not "%CURBR%"=="" echo Branch atual: %CURBR%

echo Adicionando arquivos e criando commit...
Git add -A
git commit -m "chore: initial publish"
if errorlevel 1 goto :COMMIT_FAIL

goto :POST_COMMIT

:COMMIT_FAIL
set "GIT_USER_NAME="
for /f "delims=" %%u in ('git config --get user.name 2^>nul') do set GIT_USER_NAME=%%u
if "%GIT_USER_NAME%"=="" goto :NO_GIT_IDENTITY

echo Nenhuma alteracao para commitar. Prosseguindo...

:POST_COMMIT
:: Garantir que a branch principal seja main
Git branch -M main >nul 2>nul

:: Verifica GitHub CLI
set GH_AVAILABLE=0
where.exe gh >nul 2>nul
if not errorlevel 1 set GH_AVAILABLE=1

if "%GH_AVAILABLE%"=="1" goto :WITH_GH

goto :WITHOUT_GH

:WITH_GH
echo Verificando existencia do repositorio via GitHub CLI...
Gh repo view "%REPO_SLUG%" >nul 2>nul
if errorlevel 1 goto :GH_CREATE

goto :GH_PUSH_EXISTING

:GH_CREATE
echo Repositorio nao existe. Criando e publicando...
Gh repo create "%REPO_SLUG%" --public --source . --remote origin --push
if errorlevel 1 goto :GH_FAIL

goto :SUCCESS

:GH_PUSH_EXISTING
echo Repositorio ja existe. Configurando remoto e enviando...
Git remote remove origin >nul 2>nul
Git remote add origin "%REPO_URL%"
Git push -u origin main
if errorlevel 1 goto :PUSH_FAIL

goto :SUCCESS

:WITHOUT_GH
echo GitHub CLI nao encontrado. Configurando remoto e enviando...
Git remote remove origin >nul 2>nul
Git remote add origin "%REPO_URL%"
Git push -u origin main
if errorlevel 1 goto :PUSH_FAIL

goto :SUCCESS

:NO_GIT
echo ERRO: Git nao encontrado. Instale em https://git-scm.com/downloads

goto :END

:NO_GIT_IDENTITY
echo Commit falhou por falta de identidade do Git.
echo Configure e execute novamente:
echo   git config --global user.name "Seu Nome"
echo   git config --global user.email "seuemail@exemplo.com"

goto :END

:GH_FAIL
echo Falha ao criar/enviar com gh. Verifique autenticacao com: gh auth login

goto :END

:PUSH_FAIL
echo Falha no push. Verifique URL remota, permissoes e autenticacao (HTTPS/SSH).

:: Tentativa de integrar remoto antes de desistir
if "%TRIED_PULL%"=="1" goto :AFTER_PULL_ATTEMPT
set TRIED_PULL=1
goto :TRY_PULLREBASE

:AFTER_PULL_ATTEMPT
:: Tentar fallback automatico para HTTPS se a URL for SSH e ainda nao tentamos
if "%TRIED_HTTPS%"=="1" goto :END
set "CONTAINS_SSH_1=%REPO_URL:git@github.com=%"
if not "%CONTAINS_SSH_1%"=="%REPO_URL%" goto :TRY_HTTPS
set "CONTAINS_SSH_2=%REPO_URL:ssh://=%"
if not "%CONTAINS_SSH_2%"=="%REPO_URL%" goto :TRY_HTTPS

goto :END

:TRY_PULLREBASE
echo Tentando integrar alteracoes remotas (pull --rebase)...
rem Buscar atualizacoes da branch main remota (se existir)
git fetch origin main >nul 2>nul
rem Rebase mesmo com historicos nao relacionados (ex.: README criado no remoto)
git pull --rebase --allow-unrelated-histories origin main
rem Tentar enviar novamente apos o pull
git push -u origin main
if errorlevel 1 goto :PUSH_FAIL

goto :SUCCESS

:TRY_HTTPS
echo Tentando fallback para HTTPS...
set TRIED_HTTPS=1
set REPO_URL=https://github.com/%REPO_SLUG%.git
echo Remote URL (fallback): %REPO_URL%
git remote remove origin >nul 2>nul
git remote add origin "%REPO_URL%"
git push -u origin main
if errorlevel 1 goto :PUSH_FAIL

goto :SUCCESS

:SUCCESS
echo(
echo Pronto! Repo: %REPO_URL%
echo Uma action de deploy para GitHub Pages sera executada automaticamente.

goto :END

:END
popd
endlocal
pause
