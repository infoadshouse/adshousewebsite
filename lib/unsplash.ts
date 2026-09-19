export function unsplash(photoId: string, width = 1600) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

export const unsplashWork = {
  fashion: unsplash("photo-1490481651871-ab68de25d43d"),
  dental: unsplash("photo-1629909615184-74f495363b67"),
  kitchen: unsplash("photo-1556910103-1c027d93e2b7"),
  building: unsplash("photo-1486406146926-c627a92ad1ab"),
  coaching: unsplash("photo-1427504494785-3a9ca7044f45"),
  restaurant: unsplash("photo-1517248135467-4c7edcad34c4"),
  skincare: unsplash("photo-1556228720-195a672e8a03"),
  cars: unsplash("photo-1492144534655-ae79c964c9d7"),
  stationery: unsplash("photo-1455390582262-044cdead277a"),
  gym: unsplash("photo-1534438327276-14e5300c3a48"),
  interior: unsplash("photo-1618221195710-dd6b41faaea6"),
  freight: unsplash("photo-1586528116311-ad8dd3fc8380"),
  kidswear: unsplash("photo-1514090458221-65bb69cf63e6"),
  office: unsplash("photo-1497366216548-37526070297c"),
  drinks: unsplash("photo-1544145945-f9049c60bfb6"),
} as const;

export const unsplashPortraits = {
  kirti: unsplash("photo-1544005313-94ddf0286df2", 800),
  deepak: unsplash("photo-1507003211169-0a1dd7228f2d", 800),
  neha: unsplash("photo-1573496359142-b8d87734a5a2", 800),
  arjun: unsplash("photo-1560250097-0b93528c311a", 800),
  pooja: unsplash("photo-1580489944761-15a19d654956", 800),
  imran: unsplash("photo-1472099645785-5658abf4ff4e", 800),
} as const;
