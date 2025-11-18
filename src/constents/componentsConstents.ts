import { amenityProps } from "@/types/basicTypes";
// Add Property Page
const addPropertyFormDefaultInputs = {
    type: "Apartment",
    name: "Test Propety",
    description: "",
    location: {
      street: "",
      city: "Test City",
      state: "Test State",
      zipcode: "",
    },
    beds: "3",
    baths: "2",
    square_feet: "1000",
    amenities: ["Wifi"],
    rates: {
      weekly: "",
      monthly: "2000",
      nightly: "",
    },
    seller_info: {
      name: "",
      email: "test@test.com",
      phone: "",
    },
    images: [],
  };
// const amenities: Omit<Omit<amenityProps, "isChecked">, "changeHandler">[] = [
const amenities: Pick<amenityProps, "id" | "value">[] = [
  {
    id: "amenity_wifi",
    value: "Wifi",
  },
  {
    id: "amenity_kitchen",
    value: "Full Kitchen",
  },
  {
    id: "amenity_washer_dryer",
    value: "Washer & Dryer",
  },
  {
    id: "amenity_free_parking",
    value: "Free Parking",
  },
  {
    id: "amenity_pool",
    value: "Swimming Pool",
  },
  {
    id: "amenity_hot_tub",
    value: "Hot Tub",
  },
  {
    id: "amenity_24_7_security",
    value: "24/7 Security",
  },
  {
    id: "amenity_wheelchair_accessible",
    value: "Wheelchair Accessible",
  },
  {
    id: "amenity_elevator_access",
    value: "Elevator Access",
  },
  {
    id: "amenity_dishwasher",
    value: "Dishwasher",
  },
  {
    id: "amenity_gym_fitness_center",
    value: "Gym/Fitness Center",
  },
  {
    id: "amenity_air_conditioning",
    value: "Air Conditioning",
  },
  {
    id: "amenity_balcony_patio",
    value: "Balcony/Patio",
  },
  {
    id: "amenity_smart_tv",
    value: "Smart TV",
  },
  {
    id: "amenity_coffee_maker",
    value: "Coffee Maker",
  },
];

export const mapTypes = ["roadmap" , "satellite" , "hybrid" , "terrain"];

export const stateMap = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
};

export {amenities,addPropertyFormDefaultInputs};
