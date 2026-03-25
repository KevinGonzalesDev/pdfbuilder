import 'dotenv/config'
import express from 'express'
import pdfRoutes from './routes/pdf.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json({ limit: '10mb' }))

// Seguridad básica — solo acepta requests con el API key correcto
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key']
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'No autorizado' })
    }
    next()
})

app.use('/api', pdfRoutes)

app.listen(PORT, () => {
    console.log(`PDF Service corriendo en puerto ${PORT} 🚀`)
})