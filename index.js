const axios = require('axios')
const fs = require('fs-extra')

/**
 * Array containing the names of groups of indicators
 * @type {string[]}
 */
const listRecomendation = ['Rec.Stoch.RSI', 'Rec.WR', 'Rec.BBPower', 'Rec.UO', 'Rec.Ichimoku', 'Rec.RSI', 'Rec.HullMA9']
const listPivotClassic = ['Pivot.M.Classic.S3', 'Pivot.M.Classic.S2', 'Pivot.M.Classic.S1', 'Pivot.M.Classic.Middle', 'Pivot.M.Classic.R1', 'Pivot.M.Classic.R2', 'Pivot.M.Classic.R3']
const listPivotFibonacci = ['Pivot.M.Fibonacci.S3', 'Pivot.M.Fibonacci.S2', 'Pivot.M.Fibonacci.S1', 'Pivot.M.Fibonacci.Middle', 'Pivot.M.Fibonacci.R1', 'Pivot.M.Fibonacci.R2', 'Pivot.M.Fibonacci.R3']
const listPivotCamarilla = ['Pivot.M.Camarilla.S3', 'Pivot.M.Camarilla.S2', 'Pivot.M.Camarilla.S1', 'Pivot.M.Camarilla.Middle', 'Pivot.M.Camarilla.R1', 'Pivot.M.Camarilla.R2', 'Pivot.M.Camarilla.R3']
const listPivotWoodie = ['Pivot.M.Woodie.S3', 'Pivot.M.Woodie.S2', 'Pivot.M.Woodie.S1', 'Pivot.M.Woodie.Middle', 'Pivot.M.Woodie.R1', 'Pivot.M.Woodie.R2', 'Pivot.M.Woodie.R3']
const listPivotDemark = ['Pivot.M.Demark.S1', 'Pivot.M.Demark.Middle', 'Pivot.M.Demark.R1']
const listIndicators = ['RSI', 'Stoch.K', 'Stoch.D', 'CCI20', 'ADX', 'ADX-DI', 'AO', 'Mom', 'MACD.macd', 'MACD.signal', 'W.R', 'HullMA9']
const listEMASMA = ['EMA10', 'SMA10', 'EMA20', 'SMA20', 'EMA30', 'SMA30', 'EMA50', 'SMA50', 'EMA100', 'SMA100', 'EMA200', 'SMA200']
const listPivotHighLow = [
  "Pivot.M.HighLow.S3",
  "Pivot.M.HighLow.S2",
  "Pivot.M.HighLow.S1",
  "Pivot.M.HighLow.Middle",
  "Pivot.M.HighLow.R1",
  "Pivot.M.HighLow.R2",
  "Pivot.M.HighLow.R3",
]

/**
 * Formats the readme content based on the provided data.
 * @param {object} data - The data used to format the readme.
 * @returns {string[]} - The formatted readme content as an array of strings.
 */
const now = new Date();
const formattedDate = now.toLocaleString("en-GB", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "long",   // "August"
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})

const formatReadme = (data) => {
  const formattedReadme = []
  formattedReadme.push('# TradingView BTCUSD Scanner (1H)')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('## Last updated: ' + formattedDate)
  formattedReadme.push('## Price Now: ' + usdFormatter.format(data['close|60']))
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('<h2 id="about-the-project"> :pencil: About Project</h2>')
  formattedReadme.push('BTCUSD recommendation scanner based on real-time TradingView data Scanner API')
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## Recommendation')
  formattedReadme.push(`| ${listRecomendation.map((item) => `${item.split('.')[1]} |`).join(' ')}`)
  formattedReadme.push(`| ${listRecomendation.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listRecomendation.map((item) => `${data[item + '|60'] === 1 ? 'Buy' : data[item + '|60'] === 0 ? 'Neutral' : 'Sell'} |`).join(' ')}`)
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## Pivot Points High Low')
  formattedReadme.push(`| ${listPivotHighLow.map((item) => `${item.replace("Pivot.M.HighLow.", "")} |`).join(" ")}`)
  formattedReadme.push(`| ${listPivotHighLow.map(() => `:---: |`).join(" ")}`)
  formattedReadme.push(
    `| ${listPivotHighLow.map((item) => {
      const val = data[`60,${item}`]
      return val !== undefined ? val.toFixed(2) + " |" : "- |"
    }).join(" ")}`
  )
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## Pivot Points Classic')
  formattedReadme.push(`| ${listPivotClassic.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotClassic.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotClassic.map((item) => `${data[item + '|60'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## Pivot Points Fibonacci')
  formattedReadme.push(`| ${listPivotFibonacci.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotFibonacci.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotFibonacci.map((item) => `${data[item + '|60'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## Pivot Points Camarilla')
  formattedReadme.push(`| ${listPivotCamarilla.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotCamarilla.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotCamarilla.map((item) => `${data[item + '|60'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## Pivot Points Woodie')
  formattedReadme.push(`| ${listPivotWoodie.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotWoodie.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotWoodie.map((item) => `${data[item + '|60'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## Pivot Points Demark')
  formattedReadme.push(`| ${listPivotDemark.map((item) => `${item.split('.')[3]} |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotDemark.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listPivotDemark.map((item) => `${data[item + '|60'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## Technical Indicators')
  formattedReadme.push(`| ${listIndicators.map((item) => `${item.split('|')[0].replace(/.macd|.signal/, '')} |`).join(' ')}`)
  formattedReadme.push(`| ${listIndicators.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listIndicators.map((item) => `${data[item + '|60'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  formattedReadme.push('\n## EMA & SMA')
  formattedReadme.push(`| ${listEMASMA.map((item) => `${item.split('|')[0]} |`).join(' ')}`)
  formattedReadme.push(`| ${listEMASMA.map((item) => `:---: |`).join(' ')}`)
  formattedReadme.push(`| ${listEMASMA.map((item) => `${data[item + '|60'].toFixed(2)} |`).join(' ')}`)
  formattedReadme.push('\n')
  formattedReadme.push('![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)')
  return formattedReadme
}

/**
 * Main function that fetches data from TradingView API and writes formatted data to README.md file.
 * @returns {Promise<void>} A promise that resolves when the data is fetched and written to the file.
 */
const main = async () => {
  try {
    const symbol = 'CRYPTO:BTCUSD'
    const { data } = await axios.get(
      `https://scanner.tradingview.com/symbol?symbol=${symbol}&fields=60,RSI|60,RSI[1]|60,Stoch.K|60,Stoch.D|60,Stoch.K[1]|60,Stoch.D[1]|60,CCI20|60,CCI20[1]|60,ADX|60,ADX+DI|60,ADX-DI|60,ADX+DI[1]|60,ADX-DI[1]|60,AO|60,AO[1]|60,AO[2]|60,Mom|60,Mom[1]|60,MACD.macd|60,MACD.signal|60,Rec.Stoch.RSI|60,Stoch.RSI.K|60,Rec.WR|60,W.R|60,Rec.BBPower|60,BBPower|60,Rec.UO|60,UO|60,EMA10|60,close|60,SMA10|60,EMA20|60,SMA20|60,EMA30|60,SMA30|60,EMA50|60,SMA50|60,EMA100|60,SMA100|60,EMA200|60,SMA200|60,Rec.Ichimoku|60,Ichimoku.BLine|60,Rec.VWMA|60,VWMA|60,Rec.HullMA9|60,HullMA9|60,Pivot.M.Classic.S3|60,Pivot.M.Classic.S2|60,Pivot.M.Classic.S1|60,Pivot.M.Classic.Middle|60,Pivot.M.Classic.R1|60,Pivot.M.Classic.R2|60,Pivot.M.Classic.R3|60,Pivot.M.Fibonacci.S3|60,Pivot.M.Fibonacci.S2|60,Pivot.M.Fibonacci.S1|60,Pivot.M.Fibonacci.Middle|60,Pivot.M.Fibonacci.R1|60,Pivot.M.Fibonacci.R2|60,Pivot.M.Fibonacci.R3|60,Pivot.M.Camarilla.S3|60,Pivot.M.Camarilla.S2|60,Pivot.M.Camarilla.S1|60,Pivot.M.Camarilla.Middle|60,Pivot.M.Camarilla.R1|60,Pivot.M.Camarilla.R2|60,Pivot.M.Camarilla.R3|60,Pivot.M.Woodie.S3|60,Pivot.M.Woodie.S2|60,Pivot.M.Woodie.S1|60,Pivot.M.Woodie.Middle|60,Pivot.M.Woodie.R1|60,Pivot.M.Woodie.R2|60,Pivot.M.Woodie.R3|60,Pivot.M.Demark.S1|60,Pivot.M.Demark.Middle|60,Pivot.M.Demark.R1|60,Pivot.M.HighLow.S3|60,Pivot.M.HighLow.S2|60,Pivot.M.HighLow.S1|60,Pivot.M.HighLow.Middle|60,Pivot.M.HighLow.R1|60,Pivot.M.HighLow.R2|60,Pivot.M.HighLow.R3&no_404=true`
    )
    const formattedReadme = formatReadme(data)
    await fs.writeFileSync('README.md', formattedReadme.join('\n'))
  } catch (err) {
    console.error(err)
    throw new Error('Failed to fetch data from TradingView API')
  }
}

/**
 * Calls the main function.
 */
main()
