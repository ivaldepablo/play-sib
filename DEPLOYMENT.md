# 🚀 Instrucciones de Despliegue para Play Sib

## Despliegue en Vercel (Recomendado)

### Opción 1: Despliegue desde GitHub
1. **Preparar el repositorio**:
   ```bash
   # Inicializar repositorio Git
   git init
   git add .
   git commit -m "Initial commit: Play Sib trivia game"
   
   # Crear repositorio en GitHub y conectar
   git remote add origin https://github.com/tu-usuario/play-sib.git
   git push -u origin main
   ```

2. **Conectar con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa el repositorio `play-sib`
   - Vercel detectará automáticamente que es un proyecto Vite/React

3. **Configuración automática**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Opción 2: Despliegue directo con Vercel CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Navegar al directorio del proyecto
cd /Users/pablo/Documents/GitHub/playsib

# Desplegar
vercel

# Seguir las instrucciones:
# - Set up and deploy: Yes
# - Which scope: tu-usuario
# - Link to existing project: No
# - Project name: play-sib-trivia
# - Directory: ./
# - Want to override settings: No
```

### Opción 3: Despliegue en Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Navegar al directorio
cd /Users/pablo/Documents/GitHub/playsib

# Construir el proyecto
npm run build

# Desplegar
netlify deploy --dir=dist --prod
```

## Verificación del Despliegue

Una vez desplegado, verifica que:
- ✅ La página carga correctamente
- ✅ El juego funciona en móviles y desktop
- ✅ Las preguntas se muestran en ruso
- ✅ La rueda de la fortuna gira correctamente
- ✅ Los sonidos funcionan (si el navegador lo permite)

## URL de Ejemplo
Tu juego estará disponible en:
- Vercel: `https://play-sib-trivia.vercel.app`
- Netlify: `https://play-sib-trivia.netlify.app`

## Resolución de Problemas

### Si tienes problemas con Node.js:
1. Instalar Node.js desde [nodejs.org](https://nodejs.org)
2. Verificar instalación: `node --version` y `npm --version`

### Si el build falla:
```bash
# Limpiar caché
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Si las rutas no funcionan:
- Verifica que `vercel.json` está configurado correctamente
- Las SPAs necesitan redirigir todas las rutas a `index.html`

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview

# Linter
npm run lint
```
