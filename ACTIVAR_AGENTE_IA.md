# 🤖 GUÍA RÁPIDA - ACTIVAR EL AGENTE IA

## ⚡ SOLUCIÓN RÁPIDA (5 minutos)

### OPCIÓN 1: Gemini (Google - GRATIS) ⭐ RECOMENDADO

#### Paso 1: Obtener API Key
1. Ve a: **https://aistudio.google.com/app/apikey**
2. Haz clic en "Create API key"
3. Selecciona tu proyecto (o crea uno nuevo)
4. Copia la key que empieza con `AIza...`

#### Paso 2: Crear archivo .env.local
1. En la raíz del proyecto (donde está `package.json`)
2. Crea un archivo llamado: `.env.local`
3. Pega esto dentro:

```env
GEMINI_API_KEY=AIza-aqui-pega-tu-key-completa
```

#### Paso 3: Reiniciar servidor
1. Detén el servidor (Ctrl + C en la terminal)
2. Ejecuta de nuevo:
```bash
npm run dev
```

#### Paso 4: Probar
1. Abre http://localhost:3000
2. Haz clic en el botón rojo de IA
3. ¡Escribe algo y el agente responderá!

---

### OPCIÓN 2: Groq (GRATIS - SIN TARJETA)

### OPCIÓN 2: OpenAI (Más potente - Requiere tarjeta)

#### Paso 1: Obtener API Key
1. Ve a: **https://platform.openai.com/signup**
2. Regístrate con tu email
3. Agrega método de pago (te dan $5 gratis en cuentas nuevas)
4. Ve a: **https://platform.openai.com/api-keys**
5. Crea nueva API key
6. Copia la key que empieza con `sk-...`

#### Paso 2: Crear archivo .env.local
1. En la raíz del proyecto, edita o crea `.env.local`
2. Agrega tu key así:

```env
OPENAI_API_KEY=sk-tu-key-aqui
```
> **Nota**: Puedes tener ambas keys (Gemini y OpenAI) en el mismo archivo.

#### Paso 3: Reiniciar y probar
```bash
npm run dev
```

---

## 🔧 SOLUCIÓN SI NO QUIERES API KEYS (Temporal)

Puedes modificar el API route para que simule respuestas mientras consigues la key:

Edita: `src/app/api/chat/route.ts`

Cambia el return final por:

```typescript
// Respuesta simulada temporal
return NextResponse.json({
  message: `Gracias por tu pregunta. Actualmente estoy en modo demo. 

Para activarme completamente, necesitas:
1. Obtener una API key de Groq (gratis) en https://console.groq.com/
2. Crear un archivo .env.local en la raíz
3. Agregar: GROQ_API_KEY=tu-key-aqui

Mientras tanto, puedes contactar a Michel directamente:
📧 contacto@michelpalma.com
💼 LinkedIn: linkedin.com/in/michelpalma

¿En qué más puedo ayudarte?`
});
```

---

## 📝 VERIFICAR QUE FUNCIONA

### Señales de que está bien configurado:
✅ El servidor inicia sin errores
✅ El botón de IA aparece en la esquina
✅ Al hacer clic, se abre el chat
✅ Cuando escribes, el agente responde (no dice "no está configurado")

### Errores comunes:

**Error: "API key no válida"**
- Verifica que copiaste la key completa
- Asegúrate que el archivo se llama `.env.local` (no `.env`)
- Reinicia el servidor después de crear el archivo

**Error: "Cannot find module"**
- Los imports están bien, solo reinicia VS Code

**No responde:**
- Verifica que la API key esté en `.env.local`
- Reinicia el servidor con Ctrl+C y `npm run dev`

---

## 🎯 RESUMEN ULTRA RÁPIDO

```bash
# 1. Obtén key gratis en: https://console.groq.com/
# 2. Crea archivo .env.local con:
GROQ_API_KEY=gsk_tu-key-aqui

# 3. Reinicia
npm run dev

# 4. ¡Prueba el chat!
```

---

## 💡 TIPS

- **Groq es GRATIS** y funciona muy bien (Llama 3.1)
- **OpenAI** tiene mejores respuestas pero cuesta (muy poco)
- La key es **secreta**, NO la subas a GitHub
- El archivo `.env.local` ya está en `.gitignore` (seguro)

---

## 🆘 ¿PROBLEMAS?

Si algo no funciona, verifica:
1. ✅ Archivo se llama `.env.local` (con el punto al inicio)
2. ✅ Está en la raíz (mismo nivel que package.json)
3. ✅ La API key está completa (sin espacios)
4. ✅ Reiniciaste el servidor después de crear el archivo

---

**¡Listo! Con esto tu agente IA funcionará perfectamente** 🚀
