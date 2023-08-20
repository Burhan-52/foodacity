export function filterData(searchTxt, allrestaurant) {
  const a = allrestaurant.filter((x) => {
    return x?.info?.name?.toLowerCase().includes(searchTxt.toLowerCase())
  })
  return a
}

export function filterDataByRating(allrestaurant) {
  const rating = allrestaurant.filter((x) => {
    return x?.info?.avgRating >= 4
  })
  return rating
}

export function filterDataByDeliveryTime(allrestaurant) {
  const deliveryTime = allrestaurant.filter((x) => {
    return x?.info?.sla?.deliveryTime <= 35
  })
  return deliveryTime
}

export const filterDataByCuisines = (data, selectedCuisines) => {
  if (!selectedCuisines || selectedCuisines.length === 0) {
    return data; 
  }

  return data && data.filter((restaurant) => {
    if (!restaurant.info || !restaurant.info.cuisines) {
      return false; 
    }

    const lowerCaseCuisines = restaurant.info.cuisines.map(cuisine => cuisine.toLowerCase());
    return selectedCuisines.some(selectedCuisine => lowerCaseCuisines.includes(selectedCuisine.toLowerCase()));
  });
};

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

