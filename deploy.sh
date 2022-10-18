npm run build
# navega previamente hasta el directorio de salida de tus archivos para producción:
git checkout -b main
git init
git add -A
git commit -m 'deploy'
# si tu proyecto va como mi-usuario.github.io, habilita esta línea
# git push -f git@github.com: <USERNAME>/<USERNAME>.github.io.git master
# Si va como repositorio, habilita esta otra línea:
## virginianemec/proy-final-cursovue2
git push -f git@github.com:virginianemec/proy-final-cursovue2.git master:gh-pages

read 'hola'