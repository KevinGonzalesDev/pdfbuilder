import { Router } from 'express'
import { generatePDF } from '../controllers/pdf.controller.js'

const router = Router()

router.post('/pdf', generatePDF)

export default router