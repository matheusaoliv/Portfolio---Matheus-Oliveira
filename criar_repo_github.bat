@echo off
setlocal EnableExtensions
chcp 65001 >nul
pushd "%~dp0"

echo(
echo == Criar e publicar no GitHub ==

set REPO_SLUG=matheusaoliv/Portfolio---Matheus-Oliveira
set REPO_URL=https://github.com/%REPO_SLUG%.git

echo Repositorio: %REPO_SLUG%

echo(
where.exe git >nul 2>nul
if errorlevel 1 (
  echo ERRO: Git nao encontrado. Instale em https://git-scm.com/downloads
  pause
  goto :END
)

:: Inicializa repo se nao existir
if not exist ".git" (
  echo Inicializando repositório Git...
  git init
)

:: Tenta detectar branch atual (pode estar vazio em repos iniciais)
set "CURBR="
for /f "tokens=*" %%b in ('git branch --show-current 2^>nul') do set CURBR=%%b
if not "%CURBR%"=="" echo Branch atual: %CURBR%

:: Adiciona arquivos e tenta criar commit
echo Adicionando arquivos e criando commit...
 git add -A
 git commit -m "chore: initial publish"
if errorlevel 1 (
  echo(
  echo Nao foi possivel criar o commit.
  echo Possiveis causas:
  echo  - Identidade Git nao configurada (user.name / user.email)
  echo  - Nao ha alteracoes para commitar
  echo(
  echo Se for identidade, execute:
  echo   git config --global user.name "Seu Nome"
  echo   git config --global user.email "seuemail@exemplo.com"
  echo E depois rode este script novamente.
  pause
  goto :END
)

:: Garantir que a branch principal seja main apos ter um commit
 git branch -M main >nul 2>nul

:: Verifica GitHub CLI
set GH_AVAILABLE=0
where.exe gh >nul 2>nul && set GH_AVAILABLE=1

if %GH_AVAILABLE%==1 (
  echo Verificando existencia do repositorio via GitHub CLI...
  gh repo view "%REPO_SLUG%" >nul 2>nul
  if errorlevel 1 (
    echo Repositorio nao existe. Criando %REPO_SLUG% como publico e publicando...
    gh repo create "%REPO_SLUG%" --public --source . --remote origin --push
    if errorlevel 1 (
      echo Falha ao criar/enviar com gh. Verifique autenticacao com 'gh auth login'.
      pause
      goto :END
    ) else (
      echo Repositorio criado e publicado com sucesso: %REPO_URL%
      goto :SUCCESS
    )
  ) else (
    echo Repositorio ja existe. Configurando remoto e enviando...
    git remote remove origin >nul 2>nul
    git remote add origin "%REPO_URL%"
    git push -u origin main
    if errorlevel 1 (
      echo Falha no push. Confirme permissoes (HTTPS/SSH) e tente novamente.
      pause
      goto :END
    ) else (
      echo Codigo enviado com sucesso para %REPO_URL%
      goto :SUCCESS
    )
  )
) else (
  echo GitHub CLI (gh) nao encontrado. Vou tentar apenas configurar o remoto e enviar.
  git remote remove origin >nul 2>nul
  git remote add origin "%REPO_URL%"
  git push -u origin main
  if errorlevel 1 (
    echo Falha no push sem GitHub CLI.
    echo Crie o repo manualmente em: %REPO_URL% (via web) e rode este script novamente.
    pause
    goto :END
  ) else (
    echo Codigo enviado com sucesso para %REPO_URL%
    goto :SUCCESS
  )
)

:SUCCESS
echo(
echo Pronto! Repo: %REPO_URL%
echo Uma action de deploy para GitHub Pages sera executada automaticamente.

echo(
pause

:END
popd
endlocal
pause
