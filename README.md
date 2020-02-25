# Markdown Links - Validator

Libreria para validar tus links en archivos Markdown desde CLI. 
Ahorra tu tiempo y usa esta librería en lugar de dar click a todos los vínculos de sus archivos Markdown.

![deadlink](https://raw.githubusercontent.com/vilrodriguez/LIM011-fe-md-links/master/img/fc%2C550x550%2Cgrass_green.jpg)
----

## Instalación
1. Descargue la libreria
```sh
  npm install vilrodriguez/md-links
```

2. Instale Node version 11 o superior
[Node.js](https://nodejs.org/es/download/)

3. Luego actualice dependencias
```sh
  npm link
```

4. ¡Ya puede usar la librería! :D
  
## Funcionalidad
CLI:
```sh
  md-links <path> --validate --stats
```

### Opciones de uso:

1.   md-links path : Provee una lista de links con path de origen, url y texto:
```sh
    md-links prueba.md 
./prueba.md https://github.com/vilrodriguez/ [My repository]
./prueba.md https://github.com/vilmango [Google]
./prueba.md ww.mreeowwwww.com [This is not good]
```
2.   md-links path --validate: Provee una lista de links con path de origen, url, texto, mensaje de status y status de llamada HTML:
```sh
    md-links prueba.md --validate
./prueba.md https://github.com/vilrodriguez/ [My repository] OK 200
./prueba.md https://github.com/vilmango [Google] Fail 404
./prueba.md ww.mreeowwwww.com [This is not good] Error: Invalid Link Invalid
```
3.   md-links path --stats: Provee una lista con la cantidad de links en el archivo y sus links únicos.
```sh
    md-links prueba.md --stats --validate
  Total Links in file: 3 
  Unique Links: 3
```
4.   md-links path --stats --validate: Provee una lista con la cantidad de links en el archivo, sus links únicos y rotos.
```sh
    md-links prueba.md --stats
  Total Links in file: 3 
  Unique Links: 3
  Broken: 2
```

## Compatibilidad 

Esta librería funciona en Linux y Windows.
#### Windows: use las rutas con doble ```"\\" ``` para que reconozca la ruta.

#### Autor: Vilmarys Rodriguez. 


## Flujo

![md-links](https://raw.githubusercontent.com/vilrodriguez/LIM011-fe-md-links/master/img/MD-LINKS%20Laboratoria%20VILMA.png)

