"use client";
import React, { useState } from "react";
import {
  Color,
  getColor,
  getJustifyContent,
  JustifyContent,
  NavigationStyles,
  Styles,
} from "./get-styles";

// Updated NavigationTab type
export type NavigationTab = {
  id: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export type NavigationStyles = {
  headName?: string;
  headPosition?: "Left" | "Right";
  headColor?: Color;
  headStyle?: {
    fontStyle?: FontStyle;
    fontWeight?: FontWeight;
    fontSize?: FontSize;
  };
  navigationPosition?: "Top" | "Bottom" | "Left" | "Right";
  navigationColor?: Color;
  navigationStyle?: Styles;
  tabPosition?: "Left" | "Right" | "Center";
  navigationTabColor?: Color;
  navigationTabStyle?: Styles;
};

interface Props {
  navigationData : NavigationTab[],
  styles?: NavigationStyles
}
const VCardNavBar = (
 {
  navigationData,
  styles
 } : Props
) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For responsive menu toggle
  const getNavigationStyles = (value: NavigationStyles) => {
    return {
      display: "flex",
      justifyContent: "",
      // backgroundImage: getColor(styles.color), // Gradient background
      padding: "0 1rem", // Horizontal padding for spacing
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow for depth
      borderTopLeftRadius: "1rem", // Top-left corner radius
      borderTopRightRadius: "0.5rem", // Top-right corner radius
      borderBottomRightRadius: "2rem", // Bottom-right corner radius
      borderBottomLeftRadius: "0.25rem", // Bottom-left corner radius
      transition: "all 0.3s ease", // Smooth transitions for hover/active state
    };
  };

  return (
    <div className="flex h-16 items-center" style={getNavigationStyles(styles)}>
      {navigationData.map((tab) => (
        <button
          key={tab.id}
          onClick={tab.onClick}
          style={{
            // flex: 1, // Each button stretches equally
            padding: "12px 16px", // Padding for comfortable button size
            margin: "0 0.5rem", // Horizontal margin for spacing
            borderRadius: "0.375rem", // Button corner radius for smooth design
            backgroundColor: tab.isActive ? "#1D4ED8" : "#E0E7FF", // Active/inactive colors
            color: tab.isActive ? "#FFFFFF" : "#1E40AF", // Text color for active/inactive states
            transition: "all 0.3s ease", // Smooth transitions for hover/active state
            cursor: "pointer", // Pointer cursor for interactivity
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Button shadow for subtle depth
          }}
          className="focus:outline-none focus:ring-4 focus:ring-blue-300 hover:bg-blue-200 hover:text-blue-700 transform hover:scale-105"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default VCardNavBar;
