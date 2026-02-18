import H1 from "../assets/H1.jpeg";
import Hh2 from "../assets/Hh2.jpeg";
import Hb3 from "../assets/Hb3.jpeg";
import Ha5 from "../assets/Ha5.jpeg";
import Hhh6 from "../assets/Hhh6.jpeg";
import PowerT from "../assets/PowerT.jpeg";

import Drone1 from "../assets/Drone1.jpeg";


export const TOOLS = [
  {
    id: 101,
    name: "John Deere 5050D",
    category: "Tractor",
    price: 100,
    unit: "hour",
    rating: 4.8,
    location: { address: "Sangli, MH", lat: 16.8524, lng: 74.5815 },
    ownerId: 2,
    ownerName: "Nireaj Deshmukh",
    hp: 75,
    drive: "2WD",
    fuelType: "Diesel",
    year: 2022,
    status: "Available",
    img: H1
  },

  {
    id: 102,
    name: "DJI Agras T40 Drone",
    category: "Sprayer",
    price: 1200,
    unit: "acre",
    rating: 4.9,
    location: { address: "Nashik, MH", lat: 19.9975, lng: 73.7898 },
    ownerId: 2,
    ownerName: "Ramesh Patil",
    hp: 0,
    drive: "NA",
    fuelType: "Electric",
    year: 2023,
    status: "Booked",
    img: Drone1
  },

  {
    id: 103,
    name: "Mahindra Rice Harvester",
    category: "Harvester",
    price: 2500,
    unit: "day",
    rating: 4.7,
    location: { address: "Satara, MH", lat: 17.6805, lng: 74.0183 },
    ownerId: 2,
    ownerName: "Ramesh Patil",
    hp: 60,
    drive: "4WD",
    fuelType: "Diesel",
    year: 2021,
    status: "Available",
    img: Ha5
  },

  {
    id: 104,
    name: "Kubota MU4501",
    category: "Tractor",
    price: 90,
    unit: "hour",
    rating: 4.6,
    location: { address: "Kolhapur, MH", lat: 16.7050, lng: 74.2433 },
    ownerId: 4,
    ownerName: "Sanjay Patil",
    hp: 45,
    drive: "2WD",
    fuelType: "Diesel",
    year: 2020,
    status: "Available",
    img: Hh2
  },

  {
    id: 105,
    name: "Sonalika DI 750 III",
    category: "Tractor",
    price: 110,
    unit: "hour",
    rating: 4.5,
    location: { address: "Pune, MH", lat: 18.5204, lng: 73.8567 },
    ownerId: 4,
    ownerName: "Akash Jadhav",
    hp: 55,
    drive: "2WD",
    fuelType: "Diesel",
    year: 2019,
    status: "Available",
    img: Hb3
  },

  {
    id: 106,
    name: "Powertrac Euro 50",
    category: "Tractor",
    price: 95,
    unit: "hour",
    rating: 4.4,
    location: { address: "Ahmednagar, MH", lat: 19.0952, lng: 74.7496 },
    ownerId: 4,
    ownerName: "Vishal Pawar",
    hp: 50,
    drive: "2WD",
    fuelType: "Diesel",
    year: 2018,
    status: "Under Maintenance",
    img: PowerT
  },

  {
    id: 107,
    name: "Kisankraft Power Sprayer",
    category: "Sprayer",
    price: 600,
    unit: "day",
    rating: 4.3,
    location: { address: "Solapur, MH", lat: 17.6599, lng: 75.9064 },
    ownerId: 2,
    ownerName: "Rohit Shinde",
    hp: 5,
    drive: "Manual",
    fuelType: "Petrol",
    year: 2021,
    status: "Available",
    img: Hhh6
  }
];
