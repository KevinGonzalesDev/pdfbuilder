import { htmlToPDF } from '../services/pdf.service.js'

export const generatePDF = async (req, res) => {
    try {
        const { html } = req.body

        if (!html) {
            return res.status(400).json({ error: 'El campo html es requerido' })
        }

        const pdfBuffer = await htmlToPDF(html)

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=document.pdf',
            'Content-Length': pdfBuffer.length
        })

        res.send(pdfBuffer)

    } catch (error) {
        console.error('Error generando PDF:', error)
        res.status(500).json({ error: 'Error generando PDF' })
    }
}