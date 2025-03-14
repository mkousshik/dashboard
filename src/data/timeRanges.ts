import { TimeRangeData } from '../types/nodeHistory';

export const timeRanges: TimeRangeData[] = [
  { label: 'Current', value: 'current', duration: 0 },
  { label: 'Last 12 Hours', value: '12h', duration: 12 },
  { label: 'Last 24 Hours', value: '24h', duration: 24 },
  { label: '3 Days', value: '3d', duration: 72 },
  { label: '7 Days', value: '7d', duration: 168 },
  { label: '30 Days', value: '30d', duration: 720 },
  { label: '2 Months', value: '2m', duration: 1440 },
  { label: '3 Months', value: '3m', duration: 2160 }
];