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
    return parts[parts.length -1];
  }

  export const getProductIDFromPath = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length -2];
  }

  export const getLocationIDFromPath = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length -1];
  }