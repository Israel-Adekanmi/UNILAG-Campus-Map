export interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'hostel' | 'bank' | 'faculty' | 'others';
}

export const unilagLocations: Location[] = [
  { name: 'Jaja Hostel', lat: 6.5244, lng: 3.3792, type: 'hostel' },
  { name: 'Mariere Hostel', lat: 6.5245, lng: 3.3793, type: 'hostel' },
  { name: 'Moremi Hostel', lat: 6.5246, lng: 3.3794, type: 'hostel' },
  { name: 'Mth Hostel', lat: 6.5247, lng: 3.3795, type: 'hostel' },
  { name: 'Eni Njoku', lat: 6.5248, lng: 3.3796, type: 'hostel' },
  { name: 'Sodeinde', lat: 6.5249, lng: 3.3797, type: 'hostel' },
  { name: 'Kofo', lat: 6.5250, lng: 3.3798, type: 'hostel' },
  { name: 'Queen Amina', lat: 6.5251, lng: 3.3799, type: 'hostel' },
  { name: 'Biobaku', lat: 6.5252, lng: 3.3800, type: 'hostel' },

  // Faculty
  { name: 'Education', lat: 6.5253, lng: 3.3801, type: 'faculty' },
  { name: 'Engineering', lat: 6.5254, lng: 3.3802, type: 'faculty' },
  { name: 'Science', lat: 6.5255, lng: 3.3803, type: 'faculty' },
  { name: 'Social Science', lat: 6.5256, lng: 3.3804, type: 'faculty' },
  { name: 'Law', lat: 6.5257, lng: 3.3805, type: 'faculty' },
  { name: 'Environmental Science', lat: 6.5258, lng: 3.3806, type: 'faculty' },
  { name: 'Management Science', lat: 6.5259, lng: 3.3807, type: 'faculty' },
  { name: 'Art', lat: 6.5260, lng: 3.3808, type: 'faculty' },
  { name: 'Mass Com', lat: 6.5261, lng: 3.3809, type: 'faculty' },

  // Gates
  { name: 'Unilag Main Gate', lat: 6.5262, lng: 3.3810, type: 'others' },
  { name: 'Second Gate', lat: 6.5263, lng: 3.3811, type: 'others' },

  // Auditoriums
  { name: 'Main Aud J.F Ade Ajayi', lat: 6.5264, lng: 3.3812, type: 'others' },
  { name: 'Multipurpose', lat: 6.5265, lng: 3.3813, type: 'others' },
  { name: 'JB', lat: 6.5266, lng: 3.3814, type: 'others' },

  // Banks
  { name: 'Access Bank', lat: 6.5267, lng: 3.3815, type: 'bank' },
  { name: 'Ecobank', lat: 6.5268, lng: 3.3816, type: 'bank' },
  { name: 'UBA', lat: 6.5269, lng: 3.3817, type: 'bank' },
  { name: 'GTB', lat: 6.5270, lng: 3.3818, type: 'bank' },
  { name: 'Zenith Bank', lat: 6.5271, lng: 3.3819, type: 'bank' },
  { name: 'Wema Bank', lat: 6.5272, lng: 3.3820, type: 'bank' },

  // Bus Stops
  { name: 'Campus Bus Stop', lat: 6.5273, lng: 3.3821, type: 'others' },
  { name: 'CITS Bus Stop', lat: 6.5274, lng: 3.3822, type: 'others' },
  { name: 'Environmental Sciences Bus Stop', lat: 6.5275, lng: 3.3823, type: 'others' },
  { name: 'New Hall Bus Stop', lat: 6.5276, lng: 3.3824, type: 'others' },

  // Others
  { name: 'Sport Center', lat: 6.5277, lng: 3.3825, type: 'others' },
  { name: 'DLI', lat: 6.5278, lng: 3.3826, type: 'others' },
  { name: 'Bookshop', lat: 6.5279, lng: 3.3827, type: 'others' },
  { name: 'Library', lat: 6.5280, lng: 3.3828, type: 'others' },
  { name: 'Lagoon Front', lat: 6.5281, lng: 3.3829, type: 'others' },
  { name: 'Amphitheatre', lat: 6.5282, lng: 3.3830, type: 'others' },
  { name: 'Nithub', lat: 6.5283, lng: 3.3831, type: 'others' },
  { name: 'Filling Station', lat: 6.5284, lng: 3.3832, type: 'others' },
  { name: 'Chapel', lat: 6.5285, lng: 3.3833, type: 'others' },
  { name: 'Mosque', lat: 6.5286, lng: 3.3834, type: 'others' },
  { name: 'Catholic', lat: 6.5287, lng: 3.3835, type: 'others' },
  { name: 'Fire Station', lat: 6.5288, lng: 3.3836, type: 'others' },
  { name: 'Love Garden', lat: 6.5289, lng: 3.3837, type: 'others' },
  { name: 'Omotola Bridge', lat: 6.5290, lng: 3.3838, type: 'others' },
  { name: 'Medical Center', lat: 6.5291, lng: 3.3839, type: 'others' },
  { name: 'Staff School', lat: 6.5292, lng: 3.3840, type: 'others' },
];