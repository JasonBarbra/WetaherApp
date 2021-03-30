
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details  = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const clock = document.querySelector('.clock');
const tik = (cityDet) =>{
    let options = {
        timeZone: cityDet.TimeZone.Name,
        hour: 'numeric',
        minute: 'numeric',
      },
      time = new Intl.DateTimeFormat([], options);
 const html = `
 <span>${time.format(new Date())}</span>
 `
clock.innerHTML = html;
};

const updateUI = (data) =>{
    // const cityDets = data.cityDet;
    // const weather = data.weather;
    // desctrucutre
    const {cityDet , weather} = data;

    //clock
   
    //
    tik(cityDet);
    // update detail template
    console.log(cityDet);
    details.innerHTML = `
    <h5 class="my-3">${cityDet.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;
    ///icons 
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
    let timeSrc = null;
    timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
   
    time.setAttribute('src',timeSrc);
    // remove d - none if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};




const updateCity = async (city) =>{
   const cityDet = await getCity(city);
   const weather = await getWeather(cityDet.Key);

   return { cityDet, weather };
};

cityForm.addEventListener('submit', e=>{
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err =>console.log(err));
// set local storage
    localStorage.setItem('city', city);

});

 if(localStorage.getItem('city')){
     updateCity(localStorage.getItem('city'))
     .then(data => updateUI(data))
     .catch(err =>console.log(err));
 };
