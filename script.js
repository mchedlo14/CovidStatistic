function getCovidStatistic(country){
    let quantity = document.querySelector('.quantity');
    let quantityRecovered = document.querySelector('.quantity-recovered');
    let death = document.querySelector('.quantity-dead');
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'covid-19-coronavirus-statistics2.p.rapidapi.com',
            'X-RapidAPI-Key': 'c078fe1d3fmsh18497a571bb59bdp153c70jsn4f4e1b4b7d27'
        }
    };
    
    fetch('https://covid-19-coronavirus-statistics2.p.rapidapi.com/countriesData', options)
        .then(response => response.json())
        .then(function(resData){
            resData.result.forEach(function(item){
                if(item.country === country){
                    quantity.innerHTML = item.totalCases
                    quantityRecovered.innerHTML = item.totalRecovered
                    death.innerHTML = item.totalDeaths
                }
            })
        })
}


let input = document.getElementById('input');



document.addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        let val = document.getElementById('input').value;
        getCovidStatistic(val.charAt(0).toUpperCase() + val.slice(1))
    }
})