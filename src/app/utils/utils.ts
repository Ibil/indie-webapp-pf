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