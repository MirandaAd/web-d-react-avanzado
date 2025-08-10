// Importamos el módulo express
const express = require('express')
const app = express()

// Definimos el puerto
const PORT = 3000

// Definimos la ruta raiz
app.get('/', (req, res) => {
  res.send('Hola mundo desde Express!')
})

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`)
})
