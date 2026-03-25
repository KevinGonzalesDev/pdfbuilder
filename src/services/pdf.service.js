import puppeteer from 'puppeteer'

export const htmlToPDF = async (html) => {
    console.log('Generando PDF a partir del HTML...')
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage', // evita crashes en servidores con poca RAM
        ],
        headless: true,
    })

    try {
        const page = await browser.newPage()

        await page.setContent(html, { waitUntil: 'networkidle0' })

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '10mm',
                bottom: '10mm',
                left: '10mm',
                right: '10mm',
            }
        })

        return pdfBuffer

    } finally {
        await browser.close()
    }
}