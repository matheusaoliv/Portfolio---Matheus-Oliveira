@echo off
setlocal EnableExtensions
chcp 65001 >nul
pushd "%~dp0"

echo(
echo == Deploy para Vercel (Vite estatico) ==
echo Este script vai:
echo  1) Verificar Node/npm
echo  2) Opcional: instalar dependencias (se quiser rodar build local)
echo  3) Fazer login na Vercel (se preciso)
echo  4) Linkar o projeto
echo  5) Deploy em producao (--prod)

echo(
where node >nul 2>nul || (
  echo ERRO: Node.js nao encontrado. Instale em https://nodejs.org/
  pause & goto :END
)
where npm >nul 2>nul || (
  echo ERRO: npm nao encontrado. Instale em https://nodejs.org/
  pause & goto :END
)

echo(
echo Opcional: rodar build local agora? (nao e necessario para a Vercel)
echo  - Tecle S para executar: npm ci && npm run build
choice /c SN /n /m "Executar build local [S/N]? "
if errorlevel 2 goto :SKIP_BUILD
if errorlevel 1 goto :DO_BUILD

:DO_BUILD
echo Executando build local...
npm ci && npm run build || (
  echo ERRO no build local. Prosseguindo com deploy pela Vercel mesmo assim...
)

:SKIP_BUILD

echo(
echo Autenticando na Vercel (se necessario)...
call npx vercel login || (
  echo Falha no login da Vercel. Tente novamente.
  pause & goto :END
)

echo(
echo Linkando projeto na Vercel (se solicitado, confirme org/projeto)...
call npx vercel link || (
  echo Falha ao linkar projeto. Tente novamente.
  pause & goto :END
)

echo(
echo Iniciando deploy de producao...
call npx vercel --prod --yes || (
  echo Falha no deploy. Veja mensagens acima.
  pause & goto :END
)

echo(
echo Deploy solicitado. A Vercel mostrara a URL do deploy acima.
echo Dica: defina um dominio personalizado no dashboard da Vercel se desejar.

echo(
pause

:END
popd
endlocal

