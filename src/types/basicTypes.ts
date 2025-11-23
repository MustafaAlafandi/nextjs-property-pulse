import React, { Attributes, ChangeEventHandler } from "react";
export interface mainLayoutProps {
  children?: React.ReactNode;
}

export interface infoBoxProps {
  heading: string;
  backgroundColor?: string;
  textColor?: string;
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
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: locationProps;
  beds: 2;
  baths: 1;
  square_feet: 1500;
  amenities: string[];
  rates: ratesProps;
  seller_info: sellerInfoProps;
  images: string[];
  is_featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface locationProps {
  street: string;
  city: string;
  state: string;
  zipcode: string;
}
interface ratesProps {
  weekly?: number;
  monthly?: number;
  nightly?: number;
}
interface sellerInfoProps {
  name: string;
  email: string;
  phone: string;
}

export interface clipLoaderOptions {
  loading: boolean;
  name?: string;
  size?: number;
}

export interface propertyHeaderImageProps {
  image: string;
}

export interface propertyDetailsProps {
  property: propertyProps;
}

export interface amenityCheckBoxProps {
  amenity: amenityProps;
}
export interface amenityProps {
  id: string;
  value: string;
  isChecked: boolean;
  changeHandler: ChangeEventHandler;
}

export interface messageProps {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  recipient: string;
  property: {
    _id: string;
    name: string;
  };
  name: string;
  email: string;
  phone: string;
  body: string;
  createdAt: Date;
}
