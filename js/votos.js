<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenidos - La Gran Revelación</title>
    <style>
        /* Variables de color temáticas */
        :root {
            --bg-night: #0b132b; /* Fondo azul noche oscuro */
            --gold-star: #ffee93; /* Dorado suave para estrellas */
            --pink-pastel: #ffb5a7;
            --blue-pastel: #b3e5fc;
            --text-light: #f8f9fa;
        }

        /* Configuración global del fondo estrellado */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-night);
            /* Puedes descomentar la línea de abajo si prefieres usar una imagen de fondo real */
            /* background-image: url('assets/fondo-estrellas.jpg'); */
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            color: var(--text-light);
            margin: 0;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* Contenedor principal con efecto de cristal translúcido */
        .welcome-card {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 40px 30px;
            border-radius: 24px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
            max-width: 550px;
            width: 100%;
            text-align: center;
            box-sizing: border-box;
        }

        /* Iconos decorativos flotantes superiores */
        .decorations {
            font-size: 2.5rem;
            margin-bottom: 15px;
            letter-spacing: 10px;
        }

        h1 {
            font-size: 2.2rem;
            margin-top: 0;
            margin-bottom: 15px;
            background: linear-gradient(45deg, var(--blue-pastel), var(--pink-pastel));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
        }

        /* Contenedor multimedia ajustable para Video o Imagen de bienvenida */
        .media-container {
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            margin: 25px 0;
            box-shadow: 0 8px 20px rgba(0,0,0,0.4);
            background-color: rgba(0, 0, 0, 0.2);
        }

        .media-container video {
            width: 100%;
            display: block;
        }

        /* Texto de agradecimiento */
        .message-text {
            font-size: 1.1rem;
            line-height: 1.6;
            color: #e0e0e0;
            margin-bottom: 35px;
        }

        .message-text p {
            margin: 10px 0;
        }

        .highlight {
            color: var(--gold-star);
            font-weight: bold;
        }

        /* Botón de acción interactivo hacia la página principal */
        .enter-btn {
            display: inline-block;
            background: linear-gradient(135deg, #a2d2ff, #ffafcc);
            color: #2b2d42;
            text-decoration: none;
            padding: 16px 40px;
            font-size: 1.2rem;
            font-weight: bold;
            border-radius: 50px;
            box-shadow: 0 5px 15px rgba(255, 175, 204, 0.4);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .enter-btn:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 8px 25px rgba(162, 210, 255, 0.6);
        }

        .enter-btn:active {
            transform: translateY(-1px);
        }
    </style>
</head>
<body>

    <div class="welcome-card">
        <!-- Decoración mágica superior -->
        <div class="decorations">✨👶✨</div>
        
        <h1>¡Bienvenidos a Nuestra Ilusión!</h1>

        <!-- SECCIÓN MULTIMEDIA: Puedes usar un video o reemplazarlo por una foto linda de los futuros papás -->
        <div class="media-container">
            <!-- Si tienes un video, guarda tu archivo en la carpeta assets con el nombre video-bienvenida.mp4 -->
            <video autoplay muted loop playsinline>
                <source src="assets/video-bienvenida.mp4" type="video/mp4">
                Tu navegador no soporta la reproducción de videos. Puedes colocar una foto en su lugar.
            </video>
        </div>

        <!-- Palabras de bienvenida y agradecimiento -->
        <div class="message-text">
            <p>Querida familia y amigos,</p>
            <p>Estamos inmensamente felices de que nos acompañen en este momento tan mágico de nuestras vidas. Cada paso en este viaje ha estado lleno de amor, y hoy queremos que formen parte del secreto mejor guardado.</p>
            <p class="highlight">Gracias por estar aquí y compartir nuestra alegría.</p>
        </div>

        <!-- Enlace directo a la siguiente pantalla (principal.html) -->
        <a href="principal.html" class="enter-btn">Entrar a la Experiencia</a>
    </div>

</body>
</html>
