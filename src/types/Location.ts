export interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'hostel' | 'bank' | 'faculty' | 'chapel' | 'gate' | 'medical_center' | 'others';
}


export const unilaglocations: Location[] = [
  // Top Row
  { name: 'Faculty of Law', lat: 150, lng: -627, type: 'faculty' },
  { name: 'Senate Building', lat: 380, lng: -727, type: 'others' },
  { name: 'Love Garden', lat: 245, lng: -647, type: 'others' },
  { name: 'Faculty Of Mgt Sci', lat: 195, lng: -750, type: 'faculty' },
  { name: 'Ecobank', lat: 420, lng: -700, type: 'bank' },
  { name: 'Faculty of Engineering', lat: 1150, lng: -780, type: 'faculty' },
  { name: 'Unilag Main Library', lat: 245, lng: -780, type: 'others' },
  { name: 'Lagoon Front', lat: 1000, lng: -830, type: 'others' },

  { name: 'Faculty of Art', lat: 200, lng: -527, type: 'faculty' },
  { name: 'Mariere Hostel', lat: 1150, lng: -587, type: 'hostel' },
  { name: 'GT Bank', lat: 1300, lng: -587, type: 'bank' },
  { name: 'Zenith Bank', lat: 1500, lng: -587, type: 'bank' },
  { name: 'Jaja Hostel', lat: 1550, lng: -647, type: 'hostel' },
  { name: 'Faculty of Science', lat: 1700, lng: -747, type: 'faculty' },

  { name: 'Faculty of Mass Com', lat: 380, lng: -327, type: 'faculty' },
  { name: 'Moremi Hostel', lat: 1300, lng: -387, type: 'hostel' },
  { name: 'Unilag Medical Center', lat: 2000, lng: -277, type: 'medical_center' },
  { name: 'Scholar Suite', lat: 2250, lng: -237, type: 'others' },

  { name: 'CITS', lat: 410, lng: -127, type: 'others' },

  // Third Row
  { name: 'Eni Njoku Hostel', lat: 200, lng: -27, type: 'hostel' },
  { name: 'Honours Hostel', lat: 2400, lng: -27, type: 'hostel' },
  { name: 'Unilag Printing Press', lat: 2250, lng: -87, type: 'others' },
  { name: 'Sodeinde Hostel', lat: 150, lng: 8, type: 'hostel' },
  { name: 'Women Society Hostel', lat: 2350, lng: 10, type: 'hostel' },

  // Fourth Row
  { name: 'New Hall', lat: 380, lng: 17, type: 'others' },
  { name: 'Makama Hostel', lat: 200, lng: 20, type: 'hostel' },
  { name: 'Access Bank', lat: 410, lng: 75, type: 'bank' },
  { name: 'Unilag DLI', lat: 2350, lng: 75, type: 'others' },
  { name: 'ISL Unilag', lat: 2550, lng: 75, type: 'others' },

  // Fifth Row
  { name: 'Nithub Unilag', lat: 1200, lng: 125, type: 'faculty' },
  { name: 'Faculty of Social Science', lat: 1700, lng: 125, type: 'faculty' },

  // Sixth Row
  { name: 'New Hall Filling Station', lat: 400, lng: 200, type: 'others' },
  { name: 'First Bank', lat: 2250, lng: 200, type: 'bank' },

  // Seventh Row
  { name: 'Unilag Sport Center', lat: 400, lng: 325, type: 'others' },
  { name: 'Amphitheater', lat: 450, lng: 270, type: 'others' },
  { name: 'Unilag Chapel', lat: 200, lng: 270, type: 'chapel' },
  { name: 'Staff Quarters', lat: 2000, lng: 335, type: 'others' },
  { name: 'Unilag Second Gate', lat: 2800, lng: 325, type: 'gate' },

  // Eighth Row
  { name: 'Faculty of Environmental Science', lat: 200, lng: 425, type: 'faculty' },
  { name: 'Wema Bank', lat: 400, lng: 450, type: 'bank' },
  { name: 'Biobaku Hostel', lat: 1600, lng: 450, type: 'hostel' },

  // Ninth Row
  { name: 'Faculty of Education', lat: 450, lng: 500, type: 'faculty' },
  { name: 'Education Garden', lat: 1200, lng: 500, type: 'others' },
  { name: 'Kofo Hostel', lat: 1550, lng: 500, type: 'hostel' },
  { name: 'Amina Hostel', lat: 1750, lng: 500, type: 'hostel' },

  // Tenth Row
  { name: 'Unilag Gate', lat: 250, lng: 600, type: 'gate' },
  { name: 'Femi Gbaj Hostel', lat: 750, lng: 600, type: 'hostel' },
  { name: 'Elkanemi Hostel', lat: 1000, lng: 600, type: 'hostel' },
];