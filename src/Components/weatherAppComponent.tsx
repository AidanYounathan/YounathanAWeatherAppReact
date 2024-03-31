import React, { ChangeEvent, useState } from "react";
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

  const addFavorite = () => {
    setFavorite(prevState => !prevState);
  }

  const setIcon = (weather: string) => {
    switch (weather){
      case "overcast clouds" :
        return cloudy;
      case "broken clouds" :
        return partlyCloudy
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(search);
    setSearch(event.target.value);
    console.log(search);
  };

  return (
    <div className="flex justify-center">
      <div className=" max-w-[1241px] w-full mt-8 mx-3">
        {/* Navbar */}
        <div className="w-full bg-[#54595E] rounded-[20px] flex sm:justify-between justify-evenly items-center h-[108px] bg-opacity-90">
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
              <div className="flex rounded-3xl w-2/3 sm:w-full lg:w-[444px] max-w-[444px]">
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
                    type="email"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* End SearchBar */}
            </div>
          </div>
        </div>
        {/* End Navbar */}
        {/* Main/Middle Div */}

        <div className="h-[342px] bg-[rgba(165,170,175,.85)] rounded-[20px] mt-7">
          <div className="grid grid-cols-3 gap-4 h-full">
            {/* Column 1 with 3 rows */}
            <div className="col-span-1 md:ml-10">
              <div className=" p-4 mb-4 text-9xl">{temp}°</div>
              <div className=" p-4 mb-4 text-4xl">{condition}</div>
              <div className="pl-4 flex text-3xl ">
                <p className="mr-2">
                  Low: {low}°
                </p>
                <p>
                  High: {high}°
                </p>
              </div>
            </div>

            {/* Column 2 with 1 row */}
            <div className="col-span-1  p-4 text-center flex items-center justify-center h-full">
              <p className="text-center text-3
              xl sm:text-4xl md:text-6xl lg:text-8xl">{city}</p>
            </div>

            {/* Column 3 with 2 rows */}
            <div className="col-span-1">
              <div className=" p-4 mb-4 flex justify-end">
                <Image className="h-[42px]" onClick={addFavorite} src={favoritedb ? favorited : unfavorited} alt={favoritedb ? "favorited Image" : "unfavorited Image"} ></Image>
              </div>
              <div className="flex justify-center">
                {/* Row 2 */}
                <Image className="" src={sunny} alt=""></Image>
              </div>
            </div>
          </div>
        </div>
        {/* End Main/Middle Div */}
      </div>
    </div>
  );
};

export default WeatherAppComponent;
