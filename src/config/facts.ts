export interface RealEstateFact {
  id: number;
  category: string;
  fact: string;
  regionCountry: string;
  dateAdded: string;
}

export const realEstateFacts: RealEstateFact[] = [
  {
    id: 1,
    category: 'Market Trends',
    fact: 'Home prices in Tokyo have seen little growth since the 1990s, yet it remains one of the largest real estate markets in the world.',
    regionCountry: 'Japan',
    dateAdded: '2024-11-07'
  },
  {
    id: 2,
    category: 'Architecture',
    fact: 'The Burj Khalifa in Dubai is the tallest building in the world, standing at 828 meters.',
    regionCountry: 'United Arab Emirates',
    dateAdded: '2024-11-07'
  },
  {
    id: 3,
    category: 'Famous Properties',
    fact: 'The White House, home to the U.S. President, has 132 rooms, 35 bathrooms, and 6 levels.',
    regionCountry: 'United States',
    dateAdded: '2024-11-07'
  },
  {
    id: 4,
    category: 'Unique Laws',
    fact: 'In Paris, buildings cannot exceed 37 meters in height near historic sites to preserve city views.',
    regionCountry: 'France',
    dateAdded: '2024-11-07'
  },
  {
    id: 5,
    category: 'Historical Significance',
    fact: 'The Palace of Versailles started as a hunting lodge and later became one of the most opulent royal residences.',
    regionCountry: 'France',
    dateAdded: '2024-11-07'
  },
  {
    id: 6,
    category: 'Environmental Trends',
    fact: 'Norway leads in sustainable building, with over 50% of new structures adhering to strict green standards.',
    regionCountry: 'Norway',
    dateAdded: '2024-11-07'
  },
  {
    id: 7,
    category: 'Investment Insights',
    fact: "In the 1960s, Malibu, California, beachfront properties sold for as low as $5,000—now they're worth millions.",
    regionCountry: 'United States',
    dateAdded: '2024-11-07'
  },
  {
    id: 8,
    category: 'Famous Sales',
    fact: 'In 2021, a penthouse in Central Park Tower, NYC, sold for $250 million, making it the most expensive U.S. home sale.',
    regionCountry: 'United States',
    dateAdded: '2024-11-07'
  },
  {
    id: 9,
    category: 'Technology & Real Estate',
    fact: 'Virtual reality tours have increased property viewings by 80% among international buyers.',
    regionCountry: 'Global',
    dateAdded: '2024-11-07'
  },
  {
    id: 10,
    category: 'Unique Features',
    fact: "Singapore's Marina Bay Sands has a 150-meter infinity pool on the roof, giving guests a view of the skyline.",
    regionCountry: 'Singapore',
    dateAdded: '2024-11-07'
  }
];
