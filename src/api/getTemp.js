const URL =
  'http://api.openweathermap.org/data/2.5/find?units=metric&appid=39566d3356ef8d84a135dfe6eae81baf&q=';

function getTemp(cityName) {
  return fetch(URL + cityName).then(res => res.json());
}

export default getTemp;
