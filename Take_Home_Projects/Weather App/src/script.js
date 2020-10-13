navigator.geolocation.getCurrentPosition(showPosition);
  
  async function showPosition(pos){
    var result = await fetch('https://weather-proxy.freecodecamp.rocks/api/current?lat='+parseInt(pos.coords.latitude)+'&lon='+parseInt(pos.coords.longitude)+'');
    let response = await result.json();
    console.log(response);
    let place = document.getElementById('place');
    place.innerHTML =''+response.name+' '+response.sys.country+'';
    let degree = document.getElementById('degree');
    let units = document.getElementById('units');
    let inCelcius = response.main.temp;
    let inFarenheit = (inCelcius * (9/5))+32;
    degree.innerHTML = response.main.temp;
    $(units).on('click',()=>{
      if(units.innerText == '°C'){
        //(c × 9/5) + 32 = f
        degree.innerHTML = inFarenheit;
        units.innerText = '°F';
      } else {
        //(f − 32) × 5/9 =c
        degree.innerHTML = inCelcius;
        units.innerText= '°C';
      }
    });
    let temptype= document.getElementById("temptype");
    temptype.innerHTML = response.weather[0].description;
    let icon = document.getElementById('icon');
    icon.src = response.weather[0].icon;
 }