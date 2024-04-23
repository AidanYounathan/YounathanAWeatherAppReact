const saveToLocalStorage = (city: string) => {
    let favorites = getLocalStorage();

    if (!favorites.includes(city)) {
        favorites.push(city);
    }

    localStorage.setItem("Favorites", JSON.stringify(favorites));

}

const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorites");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (city: string) => {
    let favorites = getLocalStorage();

    let namedIndex = favorites.indexOf(city);

    favorites.splice(namedIndex, 1);

    localStorage.setItem("Favorites", JSON.stringify(favorites));

}

export {saveToLocalStorage, getLocalStorage, removeFromLocalStorage};