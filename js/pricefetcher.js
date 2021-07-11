    function fetchPrice() {
      return new Promise((resolve, reject) => {
      let payload = { 
          operationName: "tokens",
          query: `{
            tokenDayDatas(first:1,orderBy: date, orderDirection: desc
              where: {
                token: "0x3dae074a5b125b9847e41b5ee20ac86d92ab77b1"
              }
            ) {
              id
              date
              priceUSD
              totalLiquidityUSD
              dailyVolumeToken
              dailyVolumeUSD
              token {
                name
                symbol
                decimals
              }
            }
          }`,
          variables: {}
        }
        let url = 'https://ewc-subgraph-production.carbonswap.exchange/subgraphs/name/carbonswap/uniswapv2'
        fetch(url, { method: 'POST', body: JSON.stringify(payload)})
        .then(res => res.json())
        .then(res => res.data.tokenDayDatas[0])
        .then(({ priceUSD }) => ({ 
          price: Number.parseFloat(priceUSD).toFixed(2)
        }))
        .then(resolve)
        .catch(reject)
      })
    }

    function addCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    fetchPrice()
    .then(({ price }) => {
      document.getElementById("numberprice").textContent = `${price} $`;
    })
    .catch(error => {
      console.log(error)
    })
    