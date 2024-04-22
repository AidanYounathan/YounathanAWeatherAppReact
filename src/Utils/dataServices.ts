import { ICurrentWeather } from "../Interfaces/ICurrentWeather";
import { IFiveDayWeather } from "@/Interfaces/IFiveDayWeather";
import { apiKey } from "./apikey";



export const currentWeatherCall = async (cityName: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`);
    const data: ICurrentWeather = await promise.json();
    return data;
}

export const fiveDayWeatherCall = async (cityName: string) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`);
    const data: IFiveDayWeather = await promise.json();
    return data;
}


export const currentGeoWeatherCall = async (lat: number, lon: number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    const data: ICurrentWeather = await promise.json();
    return data;
}

export const fiveDayGeoWeatherCall = async (lat: number, lon: number) => {
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial
    `);
    const data: IFiveDayWeather = await promise.json();
    return data;
}