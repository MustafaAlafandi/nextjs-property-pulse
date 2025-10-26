import React from "react";
export interface mainLayoutProps {
  children?: React.ReactNode;
}

export interface infoBoxProps {
  heading: string;
  backgroundColor?: string;
  textColor?: String;
  buttonInfo: buttonInfoProps;
  children?: React.ReactNode;
}
interface buttonInfoProps {
  text: string;
  link: string;
  backgroundColor: string;
}

export interface propertyCardProps {
  property: propertyProps;
}
export interface propertyProps {
  _id: String | number;
  owner: String;
  name: String;
  type: String;
  description: String;
  location: locationProps;
  beds: 2;
  baths: 1;
  square_feet: 1500;
  amenities: String[];
  rates: ratesProps;
  seller_info: sellerInfoProps;
  images: String[];
  is_featured: boolean;
  createdAt: String;
  updatedAt: String;
}
interface locationProps {
  street: String;
  city: String;
  state: String;
  zipcode: String;
}
interface ratesProps {
  weekly?: number;
  monthly?: number;
  nightly?: number;
}
interface sellerInfoProps {
  name: String;
  email: String;
  phone: String;
}
