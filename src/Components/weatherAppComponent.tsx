'use client'

import React, { ChangeEvent, useEffect, useState } from "react";
import { currentGeoWeatherCall, currentWeatherCall, fiveDayGeoWeatherCall, fiveDayWeatherCall } from '../Utils/dataServices';
import { saveToLocalStorage, getLocalStorage, removeFromLocalStorage } from '../Utils/localStorage';
import logo from "../Assets/Rain.png";
import Link from "next/link";
import Image from "next/image";
import { Label, Navbar, TextInput } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import unfavorited from "../Assets/star.svg"
import favorited from "../Assets/star-fill.svg"
import { IoSunnyOutline } from "react-icons/io5";

import sunny from "../Assets/sunny.svg";
import cloudy from "../Assets/cloudy.svg"
import rain from "../Assets/rain.svg"
import partlyCloudy from "../Assets/party-cloudy.svg"
import fog from "../Assets/fog.svg"






const WeatherAppComponent = () => {
  const [search, setSearch] = useState("Stockton");
  const [temp, setTemp] = useState("56");
  const [city, setCity] = useState("Stockton");
  const [low, setLow] = useState(60);
  const [high, setHigh] = useState(60)
  const [condition, setcondition] = useState("Clear Sky");
  const [favoritedb, setFavorite] = useState<boolean>(false);
  const [star, setStar] = useState(unfavorited)


// Current weather
const [userInput, setUserInput] = useState<string>('');
    const [citySearch, setCitySearch] = useState<string>('');
    const [cityName, setCityName] = useState<string>('');
    const [currentWeather, setCurrentWeather] = useState<string>('');
    const [currentConditions, setCurrentConditions] = useState<string>('');
    const [highLow, setHighLow] = useState<string>('');
    const [icon, setIcon] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [searchBool, setSearchBool] = useState<boolean>(false);
    const [heartClass, setHeartClass] = useState<string>('');

    // Five Day Forecast Use States
    const [day1, setDay1] = useState<string>('');
    const [day1Icon, setDay1Icon] = useState<string>('');
    const [day1High, setDay1High] = useState<string>('');
    const [day1Low, setDay1Low] = useState<string>('');

    const [day2, setDay2] = useState<string>('');
    const [day2Icon, setDay2Icon] = useState<string>('');
    const [day2High, setDay2High] = useState<string>('');
    const [day2Low, setDay2Low] = useState<string>('');

    const [day3, setDay3] = useState<string>('');
    const [day3Icon, setDay3Icon] = useState<string>('');
    const [day3High, setDay3High] = useState<string>('');
    const [day3Low, setDay3Low] = useState<string>('');

    const [day4, setDay4] = useState<string>('');
    const [day4Icon, setDay4Icon] = useState<string>('');
    const [day4High, setDay4High] = useState<string>('');
    const [day4Low, setDay4Low] = useState<string>('');

    const [day5, setDay5] = useState<string>('');
    const [day5Icon, setDay5Icon] = useState<string>('');
    const [day5High, setDay5High] = useState<string>('');
    const [day5Low, setDay5Low] = useState<string>('');








  // Favorites useState
  const [favorites, setFavorites] = useState<string[]>([]);


  // Coordinates variables
  let lat: number;
  let lon: number;


  // Day Names Array for Five Day Forecast
  let dayNames: string[];


  // Current Weather Fetches
  const getGeoWeatherData = async (lat: any, lon: any) => {
      let data = await currentGeoWeatherCall(lat, lon);
      setCityName(`${data.name}`);
      console.log(data)
      setCurrentWeather(`${Math.round(data.main.temp)}°`);
      setCurrentConditions(`${data.weather[0].description}`);
      setHighLow(`High: ${Math.round(data.main.temp_max)}° Low: ${Math.round(data.main.temp_min)}°`);
      setIcon(`${data.weather[0].main}`);
      
  }

console.log(icon)

function updateWeatherImage(icon: string) {

  switch (icon) {
      case 'Clouds':
          setIcon("./assets/cloud-sun-fill.sv");
          console.log("1" + weatherydoo + weathericon.src)
          break;
      case 'Clear':
          weathericon.src = "./assets/sun-fill.svg"
          console.log("2" + weatherydoo + weathericon.src)
          break;
      case 'Snow':
          weathericon.src = "./assets/snowflake-bold.svg"
          console.log("3")
          break;
      case 'Drizzle':
          weathericon.src = "./assets/cloud-rain-fill.svg"
          console.log("4")
          break;
      case 'Rain':
          weathericon.src = "./assets/cloud-rain-fill.svg"
          break;
      case 'Thunderstorm':
          weathericon.src = "./assets/cloud-lightning-fill.svg"
          break;
      case 'Atmosphere':
          weathericon.src = "./assets/cloud-fog-fill.svg"
          break;
      default:
          weathericon.src = ""
          console.log('ummm')
          break;
  }
}





  const getWeatherData = async (citySearch: string) => {
      try {
          let data = await currentWeatherCall(citySearch);
          setCityName(`${data.name}`);
          setCurrentWeather(`${Math.round(data.main.temp)}° F`);
          setCurrentConditions(`${data.weather[0].description}`);
          
          setHighLow(`High: ${Math.round(data.main.temp_max)}° Low: ${Math.round(data.main.temp_min)}°`);
          setIcon(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

      } catch (error) {
          alert(`${citySearch} is not a valid city or location. Please try again.`);
      }
  }


  // Five Day Forecast Fetches
  const getFiveDayWeatherData = async (citySearch: string) => {
      try {
          let data = await fiveDayWeatherCall(citySearch);

          dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

          let dayOne = new Date(data.list[0].dt_txt);
          let dayOneDay = dayOne.getDay();
          setDay1(dayNames[dayOneDay]);
          setDay1Icon(`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
          setDay1High(`H: ${Math.round(data.list[0].main.temp_max)}°`);
          setDay1Low(`L: ${Math.round(data.list[0].main.temp_min)}°`);

          let dayTwo = new Date(data.list[8].dt_txt);
          let dayTwoDay = dayTwo.getDay();
          setDay2(dayNames[dayTwoDay]);
          setDay2Icon(`https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`);
          setDay2High(`H: ${Math.round(data.list[8].main.temp_max)}°`);
          setDay2Low(`L: ${Math.round(data.list[8].main.temp_min)}°`);

          let dayThree = new Date(data.list[16].dt_txt);
          let dayThreeDay = dayThree.getDay();
          setDay3(dayNames[dayThreeDay]);
          setDay3Icon(`https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`);
          setDay3High(`H: ${Math.round(data.list[16].main.temp_max)}°`);
          setDay3Low(`L: ${Math.round(data.list[16].main.temp_min)}°`);

          let dayFour = new Date(data.list[24].dt_txt);
          let dayFourDay = dayFour.getDay();
          setDay4(dayNames[dayFourDay]);
          setDay4Icon(`https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`);
          setDay4High(`H: ${Math.round(data.list[24].main.temp_max)}°`);
          setDay4Low(`L: ${Math.round(data.list[24].main.temp_min)}°`);

          let dayFive = new Date(data.list[32].dt_txt);
          let dayFiveDay = dayFive.getDay();
          setDay5(dayNames[dayFiveDay]);
          setDay5Icon(`https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`);
          setDay5High(`H: ${Math.round(data.list[32].main.temp_max)}°`);
          setDay5Low(`L: ${Math.round(data.list[32].main.temp_min)}°`);

      } catch (error) {

      }
  }


  const getFiveDayGeoWeatherData = async (lat: any, lon: any) => {
      let data = await fiveDayGeoWeatherCall(lat, lon);

      dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let dayOne = new Date(data.list[0].dt_txt);
      let dayOneDay = dayOne.getDay();
      setDay1(dayNames[dayOneDay]);
      setDay1Icon(`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);
      setDay1High(`H: ${Math.round(data.list[0].main.temp_max)}°`);
      setDay1Low(`L: ${Math.round(data.list[0].main.temp_min)}°`);

      let dayTwo = new Date(data.list[8].dt_txt);
      let dayTwoDay = dayTwo.getDay();
      setDay2(dayNames[dayTwoDay]);
      setDay2Icon(`https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png`);
      setDay2High(`H: ${Math.round(data.list[8].main.temp_max)}°`);
      setDay2Low(`L: ${Math.round(data.list[8].main.temp_min)}°`);

      let dayThree = new Date(data.list[16].dt_txt);
      let dayThreeDay = dayThree.getDay();
      setDay3(dayNames[dayThreeDay]);
      setDay3Icon(`https://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png`);
      setDay3High(`H: ${Math.round(data.list[16].main.temp_max)}°`);
      setDay3Low(`L: ${Math.round(data.list[16].main.temp_min)}°`);

      let dayFour = new Date(data.list[24].dt_txt);
      let dayFourDay = dayFour.getDay();
      setDay4(dayNames[dayFourDay]);
      setDay4Icon(`https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png`);
      setDay4High(`H: ${Math.round(data.list[24].main.temp_max)}°`);
      setDay4Low(`L: ${Math.round(data.list[24].main.temp_min)}°`);

      let dayFive = new Date(data.list[32].dt_txt);
      let dayFiveDay = dayFive.getDay();
      setDay5(dayNames[dayFiveDay]);
      setDay5Icon(`https://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png`);
      setDay5High(`H: ${Math.round(data.list[32].main.temp_max)}°`);
      setDay5Low(`L: ${Math.round(data.list[32].main.temp_min)}°`);
  }


  // Handle Search helper function for onClick
  const handleSearch = () => {
      setSearchBool(true);

      if (userInput) {
          setCitySearch(userInput);
      }
      setUserInput('');
  }


  // Geolocation useEffect
  useEffect(() => {
      const getLocation = async () => {
          navigator.geolocation.getCurrentPosition(
              (geoPosition) => {
                  lat = geoPosition.coords.latitude;
                  lon = geoPosition.coords.longitude;

                  setCityName('Locating...');

                  getGeoWeatherData(lat, lon);
                  getFiveDayGeoWeatherData(lat, lon);
              },
              (geoError) => {
                  setError(geoError.message);

                  lat = 37.9577016;
                  lon = -121.2907796;

                  getGeoWeatherData(lat, lon);
                  getFiveDayGeoWeatherData(lat, lon);
              }
          );

          setError('Location services are not enabled.');

      };

      getLocation();
  }, []);


  // Search function useEffect
  useEffect(() => {

      if (searchBool) {
          getWeatherData(citySearch);
          getFiveDayWeatherData(citySearch);
      }

  }, [citySearch]);


  // Favorites helper function
  const handleFavorite = () => {
      const favoritesList = getLocalStorage();

      if (favoritesList.includes(cityName)) {
          removeFromLocalStorage(cityName);
          setHeartClass('icon ');
      } else {
          saveToLocalStorage(cityName)
          setHeartClass('iconFill ');
      }

      setFavorites(favoritesList);
  }


  // Favorites useEffect
  useEffect(() => {
      const favorites = getLocalStorage();

      setFavorites(favorites);

  }, [cityName, heartClass]);


  // Remove Favorites helper function
  const handleRemoveFavorite = (removeCity: string) => {
      removeFromLocalStorage(removeCity);

      const favorites = getLocalStorage();

      setFavorites(favorites);
  }


  // Remove Favorites useEffect
  useEffect(() => {

      if (favorites.includes(cityName)) {
          setHeartClass('iconFill ');
      } else {
          setHeartClass('icon ');
      }

  }, [favorites]);


  // Search from favorites helper function
  const handleSearchFromFavorites = (favoriteCity: string) => {
      getWeatherData(favoriteCity);
      getFiveDayWeatherData(favoriteCity);
  }

  // const addFavorite = () => {
  //   setFavorite(prevState => !prevState);
  // }

  // const setIcon = (weather: string) => {
  //   switch (weather){
  //     case "overcast clouds" :
  //       return cloudy;
  //     case "broken clouds" :
  //       return partlyCloudy
  //   }
  // }

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   console.log(search);
  //   setSearch(event.target.value);
  //   console.log(search);
  // };



  const CapitalFirstLetter = (userInput: string) => {
    if (!userInput) return "";

    let uncapped = userInput.split("-");
    let cappedWords = uncapped.map(
      (uncapped) => uncapped.charAt(0).toUpperCase() + uncapped.slice(1)
    );
    let formattedInput = cappedWords.join(" ");

    return formattedInput;
  };

  return (
    <div className="flex justify-center">
      <div className=" max-w-[1241px] w-full mt-8 mx-3">
        {/* Navbar */}
        <div className=" bg-[#54595E] rounded-[20px] flex sm:justify-between justify-evenly items-center h-[108px] bg-opacity-90">
          <div className="ml-[17px]">
            <img
              src={logo.src}
              className="mr-3 h-11 w-auto object-fill sm:h-16"
              alt="RainMan Logo"
            />
          </div>

          <div>
            <div className="flex items-center justify-end mr-4">
              <p className="mr-5 lg:text-2xl md:text-xl sm:text-lg underline">
                Favorite
              </p>
              {/* SearchBar */}
              <div className="flex rounded-3xl w-2/3 sm:lg:w-[444px] max-w-[444px]">
                <div className="relative w-full">
                  <div
                    data-testid="right-icon"
                    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="h-7 w-7 text-gray-500 dark:text-gray-400"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M443.5 420.2L336.7 312.4c20.9-26.2 33.5-59.4 33.5-95.5 0-84.5-68.5-153-153.1-153S64 132.5 64 217s68.5 153 153.1 153c36.6 0 70.1-12.8 96.5-34.2l106.1 107.1c3.2 3.4 7.6 5.1 11.9 5.1 4.1 0 8.2-1.5 11.3-4.5 6.6-6.3 6.8-16.7.6-23.3zm-226.4-83.1c-32.1 0-62.3-12.5-85-35.2-22.7-22.7-35.2-52.9-35.2-84.9 0-32.1 12.5-62.3 35.2-84.9 22.7-22.7 52.9-35.2 85-35.2s62.3 12.5 85 35.2c22.7 22.7 35.2 52.9 35.2 84.9 0 32.1-12.5 62.3-35.2 84.9-22.7 22.7-52.9 35.2-85 35.2z"></path>
                    </svg>
                  </div>
                  <input
                    className="block w-full border  h-[54px]  disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 sm:text-2xl text-sm  pr-10 rounded-lg"
                    id="search"
                    placeholder="Enter City, State"
                    type="text"
                    value={userInput} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserInput(e.target.value)}
                  />
                </div>
              </div>
              {/* End SearchBar */}
            </div>
          </div>
        </div>
        {/* End Navbar */}
        {/* Main/Middle Div */}


        {/* Make Responsive */}
        {/* Make Functional */}

        <div className="max-h-[342px] bg-[rgba(165,170,175,.85)] rounded-[20px] mt-7">
          <div className="grid grid-cols-3 gap-4 h-full">
            {/* Column 1 with 3 rows */}
            <div className="col-span-1 md:ml-10">
              <div className=" p-4 mb-4 text-9xl">{currentWeather}</div>
              <div className=" p-4 mb-4 text-4xl">{CapitalFirstLetter(currentConditions)}</div>
              <div className="pl-4 flex text-3xl ">
                <p className="mr-2">{highLow}
                </p>
              </div>
            </div>

            {/* Column 2 with 1 row */}
            <div className="col-span-1  p-4 text-center flex items-center justify-center h-full">
              <p className="text-center text-3
              xl sm:text-4xl md:text-6xl lg:text-8xl">{cityName}</p>
            </div>

            {/* Column 3 with 2 rows */}
            <div className="col-span-1">
              <div className=" p-4 mb-4 flex justify-end">
                <Image className="h-[42px]" onClick={handleFavorite} src={favoritedb ? favorited : unfavorited} alt={favoritedb ? "favorited Image" : "unfavorited Image"} ></Image>
              </div>
              <div className="flex justify-center">
                {/* Row 2 */}
                <img className='h-48 w-48' src={icon} alt="Current weather icon" />
              </div>
            </div>
          </div>
        </div>


{/* 28 38 1/2 */}







        {/* End Main/Middle Div */}
        {/* Start Forecast */}
        <div className="mt-[27px] md:h-[378px] bg-white opacity-80 rounded-[20px]">
          <div >

          </div>
        </div>
        {/* End Forecast */}
      </div>
    </div>
  );
};

export default WeatherAppComponent;
