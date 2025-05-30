import { useEffect, useState } from 'react';
import type { Coordinates } from '@/api/types';

interface GeolocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      const message = 'Geolocation is not supported by your browser.';
      alert(message);
      setLocationData({
        coordinates: null,
        error: message,
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage = '';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              'Location access is blocked. If the button does not work, Please enable it from browser/site settings.';

            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage =
              'Location unavailable. Check device GPS or internet connection. If the button does not work, enable the location from device setting.';

            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';

            break;
          default:
            errorMessage = 'An unknown error occurred.';
        }

        console.warn('Geolocation error:', error);
        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
