# Invitación de fiesta — React + Netlify + Google Sheets

Proyecto pensado para una invitación digital tipo tarjeta, totalmente editable desde código.

## 1. Instalar y ejecutar

Necesitas Node.js instalado.

```bash
npm install
npm run dev
```

Abre la dirección que muestre Vite, normalmente:

`http://localhost:5173`

## 2. Cambiar la invitación

La mayoría de los cambios se hacen en:

`src/config.js`

Ahí puedes modificar:

- Nombre
- Edad
- Día
- Mes
- Hora
- Lugar
- Dirección
- Colores
- URL de Google Sheets

Para cambiar completamente el diseño, edita:

`src/styles.css`

Para cambiar la estructura o agregar/eliminar campos:

`src/main.jsx`

## 3. Guardar confirmaciones en Google Sheets

El proyecto incluye:

`google-apps-script/Code.gs`

### Paso A — Crear la hoja

1. Abre Google Sheets.
2. Crea una hoja nueva.
3. Ve a `Extensiones > Apps Script`.
4. Pega el contenido de `google-apps-script/Code.gs`.
5. Guarda.

### Paso B — Publicar el receptor

En Apps Script:

1. Pulsa `Implementar`.
2. `Nueva implementación`.
3. Tipo: `Aplicación web`.
4. Ejecutar como: tu cuenta.
5. Quién tiene acceso: `Cualquiera`.
6. Implementa.
7. Copia la URL que termina en `/exec`.

### Paso C — Conectar React

Abre:

`src/config.js`

Busca:

```js
googleSheetsUrl: ""
```

Y coloca:

```js
googleSheetsUrl: "https://script.google.com/macros/s/TU_ID/exec"
```

Guarda.

Cada vez que alguien complete el formulario, se agregará una nueva fila a la pestaña `Confirmaciones` de Google Sheets.

## 4. Subir a Netlify

### Opción A — Desde GitHub

1. Sube este proyecto a un repositorio.
2. En Netlify selecciona `Add new site > Import an existing project`.
3. Selecciona tu repositorio.
4. Build command:

```bash
npm run build
```

5. Publish directory:

```text
dist
```

6. Deploy.

### Opción B — Netlify CLI

```bash
npm install
npm run build
```

Después puedes subir la carpeta `dist` desde Netlify.

## 5. Importante sobre Google Sheets

El navegador no necesita conocer la contraseña de tu Google Sheet. La página envía los datos al Web App de Google Apps Script y Apps Script escribe en la hoja.

No pongas credenciales privadas de Google dentro de React.

## 6. Personalización

El diseño está separado en:

- `src/config.js` → contenido y configuración.
- `src/styles.css` → apariencia, tamaños, posiciones, tipografías, colores y responsive.
- `src/main.jsx` → estructura y lógica.
- `google-apps-script/Code.gs` → conexión con Google Sheets.

Puedes agregar fácilmente:

- WhatsApp
- botón para abrir Google Maps
- contador regresivo
- galería de fotos
- música
- código QR
- mapa
- lista de regalos
- dress code
- más campos en RSVP
- límite de invitados
- mensajes personalizados
- pantalla de confirmación
