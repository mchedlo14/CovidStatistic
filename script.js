let input = document.getElementById('input');



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
                let countryUpperCase = country.toUpperCase()
                console.log(resData)
                if(item.country === country.charAt(0).toUpperCase() + country.slice(1) || item.country === countryUpperCase){
                    quantity.innerHTML = item.totalCases
                    quantityRecovered.innerHTML = item.totalRecovered
                    death.innerHTML = item.totalDeaths
                }
            })
        })
}



document.addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        let val = document.getElementById('input').value;
        document.getElementById('place').innerText = val.charAt(0).toUpperCase() + val.slice(1)
        getCovidStatistic(val)
    }
})




// current location

function currentLocation(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            let long = position.coords.longitude;
            let lat = position.coords.latitude;
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`,{
                method:'GET'
            }).then(function(res){
                return res.json()
            }).then(function(resData){

                let currentCountry = resData.countryName
                document.getElementById('place').innerText = currentCountry
                personLocation(currentCountry)
            })

        })
    }else{
        console.log('geolocation is not supported')
    }
    

}
currentLocation()



function personLocation(place){

    let quantity = document.getElementById('quantity');
    let quantityRecovered = document.getElementById('quantity-recovered');
    let death = document.getElementById('quantity-dead');

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
                if(item.country === place){
                    quantity.innerHTML = item.totalCases
                    quantityRecovered.innerHTML = item.totalRecovered
                    death.innerHTML = item.totalDeaths
                }
            })
        })
        
}


//top 10 country
// function topTen(){
//     let parentContainer = document.querySelector('.top-countries');
    
//     for(let i = 1;i < 11; i++){
//         let content = `
//         <div class="countrie-row">
//             <p>1. Usa</p>
//             <div class="container">
//                 <h3>Total Cases</h3>
//                 <p>83,123,122</p>
//             </div>
//             <div class="container">
//                 <h3>New Cases</h3>
//                 <p>83,123,122</p>
//             </div>
//             <div class="container">
//                 <h3>Recovered</h3>
//                 <p>83,123,122</p>
//             </div>
//             <div class="container">
//                 <h3>Deaths</h3>
//                 <p>83,123,122</p>
//             </div>
//         </div>
//         `;
//         parentContainer.innerHTML += content
//         console.log(content)
//     }
// }

// topTen()