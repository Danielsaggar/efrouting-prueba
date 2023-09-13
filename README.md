# efrouting-prueba
Prueba técnica- Desarrollador Fullstack En esta prueba técnica, se espera que construyas una base de datos en AWS, extraigas información de la API de CoinMarketCap mediante una función Lambda escrita en Python, y luego despliegues una página web donde muestres un gráfico con la información extraída utilizando un contenedor Docker.

La aplicación estará disponible en el [enlace](pruebayesid.ddns.net).
## Tabla de Contenidos

- [AWS][def2]
- [Lambda][def]
- [CoinMarketCap][def3]
- [Despliegue][def4]

##  AWS 
#### Construcción de una base de datos en AWS: 
1. **Tener cuenta de AWS**
2. **Region de la cuenta**

    Asegurarse de estar en virginia del norte porque en otras zonas se generan complicaciones para conectarse a la [RDS](https://us-east-1.console.aws.amazon.com/rds/home?region=us-east-1#launch-dbinstance:;isHermesCreate=true)

3. **Crear base de datos**

   Escoger las opciones que nos ponen por defecto en la capa gratuita y continuar con la creación de la base de datos, al crear la base de datos guardar el _**user**_ y el _**password**_

4. **Modificar las instrucciones**

    Ir al grupo de seguridad y asegurarse que en los permisos de entrada está habilitada la opción de permitir todo el tipo tráfico sin importar la ip de origen
5. **Instalar MySQL Workbench**

    Ir al grupo de seguridad y asegurarse que en los permisos de entrada está habilitada la opción de permitir todo el tipo tráfico sin importar la ip de origen
6. **Ingresar a MySQL**

    Desde la interfaz de MySQL crear la base de datos y la tabla que se va a utilizar para el despliegue del proyecto

1. **Carga de datos**

    Para esta parte haremos uso de la función Lambda que se dará un proceso más detallado en el siguiente paso
## Lambda

#### Construcción de una función lambda en AWS: 

1. **Dirigirse a  AWS Lambda**

    Ingresar en el buscador Lambda para entrar a configurar o seguir el siguiente [enlace](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions)

3. **Crear una función**

   Vamos a escoger la opción de crear una función y vamos a darle el nombre que queramos, y en el tiempo de ejecución vamos a escoger _**pythom**_ el resto de valores se pueden quedar igual

4. **Modificar la logica**

    En este paso escribiremos la lógica de nuestra función como en un script normal

5. **Añadir capas**

    En el caso de la función aquí escrita requiere de _**requests**_ y _**pymysql**_ que son librerias que requieren ser instaladas por lo que iremos al escritorio, crearemos una carpeta llamada **python** y dentro de ella ejecutaremos: 
     ```cmd
     pip3 install pymysql -t .
    ```
    Después la comprimimos en un archivo zip y nos dirigimos a la zona de [capas](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/layers)

    *(Realizar el mismo procedimiento para cualquier libreria que requiera instalación)*
6. **Crear una capa**

    Seleccionaremos la opción de crear una capa, le asignaremos un nombre, una descripción y subiremos el archivo zip que previamente habíamos creado

    *(Realizar el mismo procedimiento para cualquier libreria que requiera instalación)*

1. **Añadir capas**

    nos regresaremos a la parte de [funciones](https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions) en donde escogeremos la función que estamos creando y en la parte de abajo le damos en añadir una capa, seleccionamos capas personalizadas y añadiremos las capas que sean necesarias

1. **Activador**

    Regresando a nuestra función seleccionaremos la opción de agregar desencadenador y buscaremos el que diga *(CloudWatch Events)* escogeremos la opción de crear una regla nueva y en *"Schedule expression"* pondremos ```rate(6 hours)```

1. **Prueba**

    por último seleccionaremos la opción de test para verificar nuestra función y podemos usar la plantilla que nos dan para hacer las pruebas, o si gustan diseñar su propio json en caso de que la función requiera parámetros de entrada

## CoinMarketCap

1. **Tener cuenta de CoinMarketCap**

    Ingresar en el siguiente [enlace](https://pro.coinmarketcap.com/account) para crear una cuenta y acceder a la API

2. **Variables de entorno**

   Ir a la pestaña de configuración y añadir las variables de entorno que serán utilizadas
     ```cmd
    CMC_API_KEY:	"YOUR_API_KEY",
    DB_HOST:	"YOUR_DB_HOST",
    DB_NAME:	"YOUR_DB_NAME",
    DB_PASSWORD:	"YOUR_DB_PASSWORD",
    DB_USER:	"YOUR_DB_USER",
    ```

3. **Parametros API**

   Leer la [documentación](https://coinmarketcap.com/api/documentation/v1/#section/Quick-Start-Guide) de la api para entender la configuración que se hace al inicio del código para extraer los datos solicitados

4. **Conexión RDS**

    Realizar la configuración con las variables de entorno previamente declaradas para realizar la conexión a la RDS y todo el proceso siguiente

5. **Validar datos en MySQL Workbench**

    Una forma de saber que los datos se están almacenando es colocando mensajes de error que impriman en consola el error, la otra opción es conectarse a la RDS por medio de MySQL Workbench y ver en la interfaz gráfica cuáles datos se han ido añadiendo


## Despliegue

1. **Clonar el repositorio**

    Primero clonaremos el repositorio en nuestro local y ejecutaremos la siguiente linea para instalar las dependencias:
    ```script 
    npm i
    ```

2. **Variables de entorno**

   En la raíz del proyecto crearemos un archivo **.env** con las siguientes variables
     ```script
    PORT=3000
    host: 'your_host'
    user: 'your_user'
    password: 'your_password'
    database: 'your_database'
    ```

3. **Correrlo en local**

   Si quieres probar el proyecto antes de crear el ejecutaremos el siguiente comando
    ```script 
    npm run dev
    ```
    y estará ejecutando en [localhost:3000](localhost:3000)

4. **Creación de docker**

    Después de probar el projecto crearemos nuestra imagen docker
    ```script 
    docker build -t "nombre_dockerx" .
    ```


5. **Probar docker**

    Para probar el contenedor antes de realizar el despliegue ingreamos el siguiente comando
    ```script 
    docker run -it -p 4000:3000 prueba-tecnica
    ```
    Ahí indicaremos que internamente la aplicación va a estar ejecutandose en el puerto 3000 pero para acceder a ella lo haremos por el puerto 4000, [localhost:4000](localhost:4000)

5. **AWS cli**

    Antes de realizar cualquier configuración tendremos que [instalar](https://aws.amazon.com/es/cli/) amazon cli

5. **Creación de credenciales**

    Después tendremos que crear nuestras [Credenciales](https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/security_credentials) de acceso para poder conectarnos desde la terminal

5. **AWS configure**

    En la terminal escribiremos
    ```script 
     aws configure    
    ```
    E ingresaremos los datos que nos vayan pidiendo con las credenciales que previamente creamos

5. **AWS ECR**

    Nos dirigimos al [ECR](https://us-east-1.console.aws.amazon.com/ecr/create-repository?region=us-east-1) para crear nuestro repositorio en el que añadiremos nuestra imagen docker con las instrucciones que salen ahí **Ojo** si al tratar de hacer login te sale 
    *"aws ecr-public get-login-password --region us-east-1 --profile prueba | docker login --username AWS --password-stdin public.ecr.aws/g6z3r1e3"*
    *"Error saving credentials: error storing credentials - err: exit status 1, out: `error storing credentials - err: exit status 1, out: `The stub received bad data.``"*
    Es por un problema de docker en windows, ingresa a 
    ```script 
     c:\Users\"YOUR_USER"\.docker\config.json  
    ```
    Y borra la linea que dice *"credsStore"*, también antes de realizar el build cambiar el port en el archivo *.env* por el número 80 que es el puerto en el que se estara ejecutando una vez montado en el cluster

5. **AWS ECS**

    Nos dirigimos al [ECS](hhttps://us-east-1.console.aws.amazon.com/ecs/v2/create-cluster?region=us-east-1) para crear nuestro cluster en el cual alojaremos la imagen montada y seguiremos los pasos, una vez montado y en ejecución verificar el grupo de seguridad si permita el acceso de cualquier solicitud HTTP

5. **DNS**

    Adicional también puedes copiar la dirección IPV4 y alojarla en un servicio DNS para tener un link personalizado como en el [ejemplo](pruebayesid.ddns.net).

[def]: #lambda
[def2]: #aws
[def3]: #coinmarketcap
[def4]: #despliegue