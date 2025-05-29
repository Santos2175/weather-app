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
            errorMessage = 'Location permission denied. Please enable it.';
            alert(
              '📍 Location access is blocked by your browser.\n\nTo fix this:\n- Click the lock icon 🔒 in the address bar\n- Go to "Site Settings"\n- Set "Location" to "Allow"\n\nAlso make sure device location/GPS is enabled.'
            );
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            alert(
              '❌ Unable to determine your location.\n\nPossible reasons:\n- Location/GPS is turned off on your device\n- You are not connected to WiFi or mobile data\n\n✅ Solution:\n- Enable GPS/location from device settings\n- Use a device with WiFi or GPS capability.'
            );
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            alert(
              '⏳ Getting your location took too long.\n\nTry reloading the page or using a stronger network signal.'
            );
            break;
          default:
            errorMessage = 'An unknown error occurred.';
            alert('⚠️ An unknown error occurred while fetching location.');
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
