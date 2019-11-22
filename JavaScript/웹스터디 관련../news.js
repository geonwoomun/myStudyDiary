const axios = require('axios');
const naverKey  = require('./naverkey');

let client_id= naverKey.client_id
let client_secret= naverKey.client_secret;
let query = 'twice'
axios.get(`https://openapi.naver.com/v1/search/news.json?query=${query}`,{
    headers: {
        'X-Naver-Client-Id' : client_id,
        'X-Naver-Client-Secret' : client_secret
    }
})
    .then(res => {
        console.log(res.data.items)
    })
    .catch(err => {
        console.error(err)
    })
