import type { WeatherData } from '@/api/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { format } from 'date-fns';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';

interface IWeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: IWeatherDetailsProps) => {
  const { wind, main, sys } = data;

  // Format time
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'h:mm a');
  };

  // Convert wind degree to direction
  const getWindDirection = (degree: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;

    return directions[index];
  };

  const details = [
    {
      title: 'Sunrise',
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: 'text-orange-500',
    },
    {
      title: 'Sunset',
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: 'text-blue-500',
    },
    {
      title: 'Wind Direction',
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: 'text-green-500',
    },
    {
      title: 'Pressure',
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: 'text-purple-500',
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6 sm:grid-cols-2'>
          {details.map((detail) => (
            <div
              key={detail.title}
              className='flex items-center gap-3 rounded-lg border p-6'>
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div className='ml-4'>
                <p className='text-sm font-medium leading-none'>
                  {detail.title}
                </p>
                <p className='text-sm text-muted-foreground'>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
