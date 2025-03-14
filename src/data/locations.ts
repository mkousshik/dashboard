import { Location } from '../types/location';

export const locations: Location[] = [
  {
    id: '1',
    name: 'Kolkata',
    coordinates: [88.3639, 22.5726],
    description: 'The cultural capital of India, known for its rich heritage, art, and literature.',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&q=80&w=800',
    population: '14.9 million',
    famousFor: ['Durga Puja', 'Bengali Cuisine', 'Victoria Memorial', 'Howrah Bridge']
  },
  {
    id: '2',
    name: 'Delhi',
    coordinates: [77.2090, 28.6139],
    description: 'The capital city of India, a blend of ancient heritage and modern development.',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800',
    population: '32.9 million',
    famousFor: ['Red Fort', 'India Gate', 'Qutub Minar', 'Street Food']
  },
  {
    id: '3',
    name: 'Bengaluru',
    coordinates: [77.5946, 12.9716],
    description: 'Silicon Valley of India, known for its pleasant climate and tech innovation.',
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800',
    population: '12.3 million',
    famousFor: ['Tech Parks', 'Cubbon Park', 'Lalbagh', 'Craft Beer']
  },
  {
    id: '4',
    name: 'Mumbai',
    coordinates: [72.8777, 19.0760],
    description: 'The financial capital of India, home to Bollywood and diverse cultures.',
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800',
    population: '20.4 million',
    famousFor: ['Bollywood', 'Gateway of India', 'Marine Drive', 'Vada Pav']
  },
  {
    id: '5',
    name: 'Chennai',
    coordinates: [80.2707, 13.0827],
    description: 'The cultural heart of South India, famous for its temples and beaches.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800',
    population: '11.5 million',
    famousFor: ['Marina Beach', 'Classical Music', 'Tamil Cinema', 'Temple Architecture']
  }
];