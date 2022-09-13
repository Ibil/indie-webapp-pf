export function accessibleRouteChangeHandler() {
  return window.setTimeout(() => {
    const mainContainer = document.getElementById('primary-app-container');
    if (mainContainer) {
      mainContainer.focus();
    }
  }, 50);
}

export const isSameDate = (date1: Date, date2: Date) =>
  date1.getFullYear() == date2.getFullYear() &&
  date1.getMonth() == date2.getMonth() &&
  date1.getDay() == date2.getDay();

export const getIdFromPath = (path: string) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export const getProductIDFromPath = (path: string) => {
  const parts = path.split('/');
  return parts[parts.length - 2];
}

export const getLocationIDFromPath = (path: string) => getLastPathString(path);

export const getLastPathString = (path: string) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
}

export const getPushPathForGrid = (path: string) => {
  const parts = path.split('/');
  if (path == undefined || path == '/') {
    return "/products";
  }
  else {
    return parts[parts.length - 1];
  }

}

export const removeIdFromPathForGrid = (path: string) => {
  if(path.includes("product")){
    return ""
  }
  return path.split('/').slice(0, -1).join('/');
}

export const convertToCentsForAPI = (number) => Math.floor(number * 100);

export const centsToCurrency = (number) => number / 100;

export const validateYear = (yearString) => {
  const parsed = parseInt(yearString, 10);
  if (isNaN(parsed)) {
    return false;
  }
  else {
    return parsed > 0 && parsed < 3000;
  }
}

export const addToCart = (yearString) => {

}

export const removeFromCart = (yearString) => {
}

export const clearBasket = (yearString) => {
}