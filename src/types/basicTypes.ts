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
