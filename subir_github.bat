@echo off
setlocal EnableExtensions
chcp 65001 >nul
pushd "%~dp0"

:: =============================
:: Subir projeto para o GitHub
:: =============================
echo(
echo == Subir para o GitHub ==

:: Verifica Git
where.exe git >nul 2>nul
if errorlevel 1 (
  echo ERRO: Git nao encontrado. Instale em https://git-scm.com/downloads e tente novamente.
  pause
  goto :END
)

:: Inicializa repo se ainda nao existir
if not exist ".git" (
  echo Inicializando repositório Git...
  git init
)

:: Configura branch principal como main
for /f "tokens=*" %%b in ('git branch --show-current 2^>nul') do set CURBR=%%b
if not "%CURBR%"=="main" (
  git branch -M main >nul 2>nul
)

:: Adiciona arquivos e faz commit (se houver mudancas)
echo Adicionando arquivos...
 git add -A

:: Tenta commitar; se nao houver alteracoes, segue em frente
 git commit -m "chore: initial commit" >nul 2>nul

:: Verifica se GitHub CLI esta disponivel
set GH_AVAILABLE=0
where.exe gh >nul 2>nul && set GH_AVAILABLE=1

:: Pergunta o que fazer
set REPO_URL=
set INPUT=
if %GH_AVAILABLE%==1 (
  echo.
  echo Opcao 1) Criar repo no GitHub automaticamente (requer 'gh' logado)
  echo Opcao 2) Usar URL de repo existente no GitHub
  set /p INPUT=Escolha 1 ou 2 [1/2]:
) else (
  echo.
  echo GitHub CLI (gh) nao encontrado. Vamos usar uma URL de repo existente.
  set INPUT=2
)

echo(
if "%INPUT%"=="1" (
  :: Criar com gh
  set REPO_NAME=
  set VIS=public
  for %%I in ("%cd%") do set FOLDER_NAME=%%~nxI
  set /p REPO_NAME=Nome do repositorio (padrão: %FOLDER_NAME%):
  if "%REPO_NAME%"=="" set REPO_NAME=%FOLDER_NAME%
  set /p VIS=Visibilidade [public/private] (padrao: public):
  if /I not "%VIS%"=="private" set VIS=public
  echo Criando repositorio %REPO_NAME% (%VIS%) no GitHub...
  gh repo create "%REPO_NAME%" --%VIS% --source . --remote origin --push
  if errorlevel 1 (
    echo Falha ao criar ou enviar para o GitHub com gh.
    pause
    goto :END
  ) else (
    echo Repositorio criado e enviado com sucesso.
    goto :DONE
  )
) else (
  :: Usar URL
  echo Informe a URL do repositorio (ex.: https://github.com/usuario/repositorio.git)
  set /p REPO_URL=URL:
  if "%REPO_URL%"=="" (
    echo URL invalida. Encerrando.
    pause
    goto :END
  )

  :: Configurar remoto origin
  git remote remove origin >nul 2>nul
  git remote add origin "%REPO_URL%"
  if errorlevel 1 (
    echo Falha ao adicionar remoto origin. Verifique a URL.
    pause
    goto :END
  )

  :: Enviar branch main
  echo Enviando branch main para origin...
  git push -u origin main
  if errorlevel 1 (
    echo Falha no push. Verifique se o repositorio existe e suas permissoes (SSH/HTTPS).
    pause
    goto :END
  )
)

:DONE
echo(
echo Pronto! O codigo foi enviado para o GitHub.
echo - Se criou o repo agora, o GitHub Actions vai rodar a pipeline de Pages automaticamente.
echo - Verifique em: Settings > Pages do seu repositorio, apos a primeira execucao.

echo(
echo Para publicar no GitHub Pages usando o workflow:
echo 1) Empurre para main sempre que quiser publicar.
echo 2) A action 'Deploy to GitHub Pages' vai gerar e publicar o site.

echo(
pause

:END
popd
endlocal

