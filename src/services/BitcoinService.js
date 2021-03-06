// import { httpService } from "./http.service";
import axios from 'axios'

export const bitcoinService = {
    getRate,
    getMarketPrices,
    getConfirmedTransactions,
    getTradeVolume
}

async function getRate(coin = 'USD') {
    const res = await axios.get(`https://blockchain.info/tobtc?currency=${coin}&value=1`)
    localStorage.setItem('rate', JSON.stringify(res.data))
    return res.data
}

async function getMarketPrices() {
    const res = await axios.get('https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true')
    return res.data
}

async function getConfirmedTransactions() {
    const res = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=1months&format=json&cors=true')
    return res.data
}

async function getTradeVolume() {
    const res = await axios.get('https://api.blockchain.info/charts/trade-volume?timespan=1months&format=json&cors=true');
    return res.data
}