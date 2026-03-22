// Rajasthan City → Locations mapping
export const cityLocations = {
  'Jaipur': ['Mansarovar', 'Vaishali Nagar', 'Malviya Nagar', 'Jagatpura', 'Tonk Road', 'Ajmer Road', 'Sirsi Road', 'Sanganer', 'Pratap Nagar', 'Durgapura'],
  'Jodhpur': ['Pal Road', 'Shastri Nagar', 'Ratanada', 'Paota', 'Mandore', 'Sardarpura', 'Basni', 'Kudi Haud', 'Chopasni Road'],
  'Udaipur': ['Hiran Magri', 'Pratap Nagar', 'Goverdhan Vilas', 'Ambamata', 'Sukhadia Circle', 'Bhuwana', 'Shobhagpura', 'Bedla'],
  'Ajmer': ['Vaishali Nagar', 'Jaipur Road', 'Pushkar Road', 'Nasirabad Road', 'Beawer Road', 'Civil Lines', 'Madar'],
  'Kota': ['Talwandi', 'Kunhari', 'Dadabari', 'Borkhera', 'Mahaveer Nagar', 'Vigyan Nagar', 'Rangbari Road'],
  'Bikaner': ['Jai Narayan Vyas Colony', 'Sadul Colony', 'Ambedkar Circle', 'Karni Nagar', 'Gangashahar'],
  'Pushkar': ['Ajmer Road', 'Ganahera Road', 'Pushkar Lake Area', 'Budha Pushkar'],
  'Jaisalmer': ['Hanuman Circle', 'Sam Road', 'Jethwai Road', 'Ramgarh Road'],
  'Mount Abu': ['Nakki Lake Road', 'Sunset Point Road', 'Abu Road', 'Delwara Road'],
  'Sikar': ['Piprali Road', 'Station Road', 'Jaipur Road', 'Fatehpur Road'],
};

export const plotTypes = [
  'Residential Plot',
  'Commercial Plot',
  'Agricultural Land',
  'Industrial Plot',
  'Farm House',
  'Villa',
  'Apartment',
  'House',
];

// Sample properties data with Rajasthan locations
export const allProperties = [
  { id: 1, title: 'Premium Residential Plot', city: 'Jaipur', location: 'Mansarovar', type: 'Residential Plot', price: '₹45,00,000', beds: 0, baths: 0, sqft: '2,400', image: 'https://images.unsplash.com/photo-1629883656345-f938b29c97fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 2, title: 'Luxurious 3BHK Villa', city: 'Jaipur', location: 'Vaishali Nagar', type: 'Villa', price: '₹1,20,00,000', beds: 3, baths: 3, sqft: '3,200', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 3, title: 'Commercial Shop Plot', city: 'Jaipur', location: 'Tonk Road', type: 'Commercial Plot', price: '₹78,00,000', beds: 0, baths: 0, sqft: '1,800', image: 'https://images.unsplash.com/photo-1536244583151-60a66d9361eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 4, title: 'Green Farm House', city: 'Jaipur', location: 'Ajmer Road', type: 'Farm House', price: '₹2,50,00,000', beds: 4, baths: 4, sqft: '10,000', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 5, title: 'Modern Apartment Complex', city: 'Jaipur', location: 'Malviya Nagar', type: 'Apartment', price: '₹65,00,000', beds: 2, baths: 2, sqft: '1,400', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },

  { id: 6, title: 'Pal Road Residential Plot', city: 'Jodhpur', location: 'Pal Road', type: 'Residential Plot', price: '₹35,00,000', beds: 0, baths: 0, sqft: '2,000', image: 'https://images.unsplash.com/photo-1629883656345-f938b29c97fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 7, title: 'Heritage Style Villa', city: 'Jodhpur', location: 'Ratanada', type: 'Villa', price: '₹1,80,00,000', beds: 5, baths: 5, sqft: '5,500', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 8, title: 'Industrial Land Basni', city: 'Jodhpur', location: 'Basni', type: 'Industrial Plot', price: '₹1,10,00,000', beds: 0, baths: 0, sqft: '5,000', image: 'https://images.unsplash.com/photo-1536244583151-60a66d9361eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },

  { id: 9, title: 'Lakeside Residential Plot', city: 'Udaipur', location: 'Hiran Magri', type: 'Residential Plot', price: '₹55,00,000', beds: 0, baths: 0, sqft: '2,800', image: 'https://images.unsplash.com/photo-1629883656345-f938b29c97fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 10, title: 'Lake View Villa', city: 'Udaipur', location: 'Ambamata', type: 'Villa', price: '₹2,20,00,000', beds: 4, baths: 4, sqft: '4,800', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 11, title: 'Premium Farm House', city: 'Udaipur', location: 'Bedla', type: 'Farm House', price: '₹3,00,00,000', beds: 5, baths: 5, sqft: '15,000', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },

  { id: 12, title: 'Highway Commercial Plot', city: 'Ajmer', location: 'Jaipur Road', type: 'Commercial Plot', price: '₹90,00,000', beds: 0, baths: 0, sqft: '3,000', image: 'https://images.unsplash.com/photo-1536244583151-60a66d9361eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 13, title: 'Pushkar Road Agriculture', city: 'Ajmer', location: 'Pushkar Road', type: 'Agricultural Land', price: '₹28,00,000', beds: 0, baths: 0, sqft: '43,560 (1 Acre)', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 14, title: 'Cozy Family House', city: 'Ajmer', location: 'Civil Lines', type: 'House', price: '₹72,00,000', beds: 3, baths: 2, sqft: '1,800', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },

  { id: 15, title: 'Coaching Hub Apartment', city: 'Kota', location: 'Talwandi', type: 'Apartment', price: '₹42,00,000', beds: 2, baths: 2, sqft: '1,100', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 16, title: 'Residential Plot Kunhari', city: 'Kota', location: 'Kunhari', type: 'Residential Plot', price: '₹22,00,000', beds: 0, baths: 0, sqft: '1,500', image: 'https://images.unsplash.com/photo-1629883656345-f938b29c97fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },

  { id: 17, title: 'Desert View Farm House', city: 'Jaisalmer', location: 'Sam Road', type: 'Farm House', price: '₹1,50,00,000', beds: 3, baths: 3, sqft: '8,000', image: 'https://images.unsplash.com/photo-1542361345-89e58247f2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
  { id: 18, title: 'Agricultural Land Bikaner', city: 'Bikaner', location: 'Gangashahar', type: 'Agricultural Land', price: '₹15,00,000', beds: 0, baths: 0, sqft: '87,120 (2 Acres)', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', status: 'For Sale' },
];
