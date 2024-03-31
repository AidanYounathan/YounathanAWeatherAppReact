let position: Coordinate = { coords: { lat: 37.9577, long: -121.2908 } };

const success = (pos: GeolocationPosition) => {
    position = { coords: { lat: pos.coords.latitude, long: pos.coords.longitude } };
  };

  const error = () => {
    position = { coords: { lat: 37.9577, long: -121.2908 } };
  };

  const getWeather = async () => {
  
    const promise = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.lat}&units=imperial&lon=${position.coords.long}&appid=YOUR_API_KEY`
    );
  
    const data: CurrentWeather = await promise.json();
    return data;
  };

  const initialWeather = async () => {
   
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const getForecast = async () => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.lat}&lon=${position.coords.long}&units=imperial&appid=`);
    const data = await promise.json();
    return data;
}

const getWeatherFromCity = async (city: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=`);
    const data : CurrentWeather = await promise.json();
    return data;
}

const getForecastFromCity = async (city: string) => {
    const promise =await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=7fbd1b6369fa6e2aeaa7bddc2568003f`);
    const data : CurrentForecast = await promise.json();
    return data;
}

const addFavorite = (item :string) => {
    let data = localStorage.getItem("FavList");

    if(data != undefined)
    {
        let favList:string[] = JSON.parse(data);

        if(!favList.includes(item)){
            favList.push(item);
            localStorage.setItem("FavList", JSON.stringify(favList));
        }
        else{
            let newFavList = favList.filter((i) => i != item);
            localStorage.setItem("FavList", JSON.stringify(newFavList));
        }

    }
    else
    {
        let favList : string[] = [item];
        localStorage.setItem("FavList", JSON.stringify(favList));
    }
}

const getFavorites = () => {
    const array = localStorage.getItem("FavList");
    if(array != undefined)
        return array;
    else
        return [];
}

const checkIfFavorited = (item :string) => {
    let data = localStorage.getItem("FavList");
    if(data != undefined)
    {
        let favList:string[] = JSON.parse(data);
        return favList.includes(item);
    }
    return false;
}


export {getWeather, getForecast, initialWeather, getWeatherFromCity, getForecastFromCity, addFavorite, getFavorites, checkIfFavorited}