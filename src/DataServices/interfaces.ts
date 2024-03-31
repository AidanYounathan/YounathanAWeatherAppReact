interface Coordinate {
    coords: Coords;
}

interface Coords {
    lat: number,
    long: number
}

interface CurrentWeather {
    name: string
    main: temps
    weather: Weather[]
    timezone: number
}

interface CurrentForecast {
    list: ForecastObject[]
}

interface ForecastObject {
    dt_txt: string
    main: temps
    weather: Weather
}

interface temps {
    temp: number
    temp_max: number
    temp_min: number
}

interface Weather {
    description: string
    main: string
}
