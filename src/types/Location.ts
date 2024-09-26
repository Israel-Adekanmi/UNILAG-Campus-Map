import hostelImage from '../assets/hostel.jpg';
import bankImage from '../assets/bank 1.png';
import facultyImage from '../assets/faculty.jpg';
import churchImage from '../assets/church.jpeg';
import gateImage from '../assets/gate.png';
import hospitalImage from '../assets/hospital.avif';
import buildingImage from '../assets/building.jpg';
import React from 'react';

export interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'hostel' | 'bank' | 'faculty' | 'chapel' | 'gate' | 'medical_center' | 'others';
}

export interface MapLocation {
  name: string;
  type: string;
  lat: number;
  lng: number
  // Add any other properties you need for your location
}

export const getLocationImage = (type: string) => {
  switch (type) {
    case 'hostel':
      return hostelImage;
    case 'bank':
      return bankImage;
    case 'faculty':
      return facultyImage;
    case 'chapel':
      return churchImage;
    case 'gate':
      return gateImage;
    case 'medical_center':
      return hospitalImage;
    default:
      return buildingImage; // For other locations
  }
};


export const unilaglocations: Location[] = [
  // Top Row
  { name: 'Faculty of Law', lat: 150, lng: -627, type: 'faculty' },
  { name: 'Senate Building', lat: 380, lng: -770, type: 'others' },
  { name: 'Love Garden', lat: 245, lng: -647, type: 'others' },
  { name: 'Faculty Of Mgt Sci', lat: 195, lng: -750, type: 'faculty' },
  { name: 'Ecobank', lat: 420, lng: -690, type: 'bank' },
  { name: 'Faculty of Engineering', lat: 1150, lng: -850, type: 'faculty' },
  { name: 'Unilag Main Library', lat: 245, lng: -850, type: 'others' },
  { name: 'Lagoon Front', lat: 1000, lng: -900, type: 'others' },

  { name: 'Faculty of Art', lat: 200, lng: -527, type: 'faculty' },
  { name: 'Mariere Hostel', lat: 1150, lng: -587, type: 'hostel' },
  { name: 'GT Bank', lat: 1300, lng: -587, type: 'bank' },
  { name: 'Zenith Bank', lat: 1500, lng: -587, type: 'bank' },
  { name: 'Jaja Hostel', lat: 1550, lng: -660, type: 'hostel' },
  { name: 'Faculty of Science', lat: 1700, lng: -747, type: 'faculty' },

  { name: 'Faculty of Mass Com', lat: 380, lng: -327, type: 'faculty' },
  { name: 'Moremi Hostel', lat: 1300, lng: -387, type: 'hostel' },
  { name: 'Unilag Medical Center', lat: 2000, lng: -277, type: 'medical_center' },
  { name: 'Scholar Suite', lat: 2250, lng: -237, type: 'others' },

  { name: 'CITS', lat: 410, lng: -127, type: 'others' },

  // Third Row
  { name: 'Eni Njoku Hostel', lat: 200, lng: -57, type: 'hostel' },
  { name: 'Honours Hostel', lat: 2430, lng: -37, type: 'hostel' },
  { name: 'Unilag Printing Press', lat: 2250, lng: -97, type: 'others' },
  { name: 'Sodeinde Hostel', lat: 100, lng: 8, type: 'hostel' },
  { name: 'Women Society Hostel', lat: 2300, lng: 10, type: 'hostel' },

  // Fourth Row
  { name: 'New Hall', lat: 380, lng: 11, type: 'others' },
  { name: 'Makama Hostel', lat: 200, lng: 24, type: 'hostel' },
  { name: 'Access Bank', lat: 430, lng: 85, type: 'bank' },
  { name: 'Unilag DLI', lat: 2250, lng: 75, type: 'others' },
  { name: 'ISL Unilag', lat: 2550, lng: 75, type: 'others' },

  // Fifth Row
  { name: 'Nithub Unilag', lat: 1200, lng: 125, type: 'faculty' },
  { name: 'Faculty of Social Science', lat: 1700, lng: 125, type: 'faculty' },

  // Sixth Row
  { name: 'New Hall Filling Station', lat: 400, lng: 180, type: 'others' },
  { name: 'First Bank', lat: 2250, lng: 200, type: 'bank' },

  // Seventh Row
  { name: 'Unilag Sport Center', lat: 400, lng: 390, type: 'others' },
  { name: 'Amphitheater', lat: 450, lng: 300, type: 'others' },
  { name: 'Unilag Chapel', lat: 200, lng: 270, type: 'chapel' },
  { name: 'Staff Quarters', lat: 2000, lng: 360, type: 'others' },
  { name: 'Unilag Second Gate', lat: 2800, lng: 350, type: 'gate' },

  // Eighth Row
  { name: 'Faculty of Environmental Science', lat: 200, lng: 450, type: 'faculty' },
  { name: 'Wema Bank', lat: 400, lng: 500, type: 'bank' },
  { name: 'Biobaku Hostel', lat: 1600, lng: 500, type: 'hostel' },

  // Ninth Row
  { name: 'Faculty of Education', lat: 450, lng: 650, type: 'faculty' },
  { name: 'Education Garden', lat: 1200, lng: 650, type: 'others' },
  { name: 'Kofo Hostel', lat: 1550, lng: 650, type: 'hostel' },
  { name: 'Amina Hostel', lat: 1750, lng: 650, type: 'hostel' },

  // Tenth Row
  { name: 'Unilag Gate', lat: 250, lng: 800, type: 'gate' },
  { name: 'Femi Gbaj Hostel', lat: 750, lng: 800, type: 'hostel' },
  { name: 'Elkanemi Hostel', lat: 1000, lng: 800, type: 'hostel' },
];



