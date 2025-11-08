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
const amenities: Pick<amenityProps, "id" | "name" | "value">[] = [
  {
    id: "amenity_wifi",
    name: "amenities",
    value: "Wifi",
  },
  {
    id: "amenity_kitchen",
    name: "amenities",
    value: "Full Kitchen",
  },
  {
    id: "amenity_washer_dryer",
    name: "amenities",
    value: "Washer & Dryer",
  },
  {
    id: "amenity_free_parking",
    name: "amenities",
    value: "Free Parking",
  },
  {
    id: "amenity_pool",
    name: "amenities",
    value: "Swimming Pool",
  },
  {
    id: "amenity_hot_tub",
    name: "amenities",
    value: "Hot Tub",
  },
  {
    id: "amenity_24_7_security",
    name: "amenities",
    value: "24/7 Security",
  },
  {
    id: "amenity_wheelchair_accessible",
    name: "amenities",
    value: "Wheelchair Accessible",
  },
  {
    id: "amenity_elevator_access",
    name: "amenities",
    value: "Elevator Access",
  },
  {
    id: "amenity_dishwasher",
    name: "amenities",
    value: "Dishwasher",
  },
  {
    id: "amenity_gym_fitness_center",
    name: "amenities",
    value: "Gym/Fitness Center",
  },
  {
    id: "amenity_air_conditioning",
    name: "amenities",
    value: "Air Conditioning",
  },
  {
    id: "amenity_balcony_patio",
    name: "amenities",
    value: "Balcony/Patio",
  },
  {
    id: "amenity_smart_tv",
    name: "amenities",
    value: "Smart TV",
  },
  {
    id: "amenity_coffee_maker",
    name: "amenities",
    value: "Coffee Maker",
  },
];

export {amenities,addPropertyFormDefaultInputs};
