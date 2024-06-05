const express = require('express')
const { google } = require('googleapis')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

const app = express()
app.use(express.json())

const SPREADSHEET_ID = process.env.SPREADSHEET_ID

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
})

const sheets = google.sheets({ version: 'v4', auth })

app.get('/data', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1'
    })
    const rows = response.data.values
    if (rows.length) {
      res.json(rows.map((row, index) => ({
        id: row[0],
        name: row[1],
        email: row[2]
      })))
    } else {
      res.json([])
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

app.post('/data', async (req, res) => {
  const { id, name, email } = req.body
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1',
      valueInputOption: 'RAW',
      resource: {
        values: [[id, name, email]]
      }
    })
    res.status(201).json({ id, name, email })
  } catch (err) {
    res.status(500).send(err)
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
