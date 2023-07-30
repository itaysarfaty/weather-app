export const getWeatherIcon = (code: number) => {
  // Thunder
  if (code >= 200 && code <= 232) {
    return "/assets/images/Thunderstorm.png";
  }

  // Drizzle
  if (code >= 300 && code <= 321) {
    return "/assets/images/LightRain.png";
  }

  // Rain
  if (code === 500) {
    return "/assets/images/LightRain.png";
  }

  if (code === 511) {
    return "/assets/images/Sleet.png";
  }

  if (code >= 501 && code <= 531) {
    return "/assets/images/HeavyRain.png";
  }

  // Snow
  if (code >= 611 && code <= 616) {
    return "/assets/images/Sleet.png";
  }

  if (code >= 600 && code <= 622) {
    return "/assets/images/Snow.png";
  }

  if (code >= 701 && code <= 781) {
    return "/assets/images/LightCloud.png";
  }

  // Clear
  if (code === 800) {
    return "/assets/images/Clear.png";
  }

  if (code >= 801 && code <= 802) {
    return "/assets/images/LightCloud.png";
  } else if (code >= 803 && code <= 804) {
    return "/assets/images/HeavyCloud.png";
  }

  return "/assets/images/Clear.png";
};
