import React from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { colors } from "../theme/tokens";

// The brief's short orange underline. Use under a heading/masthead for the signature accent.
export function Rule({
  width = 60,
  color = colors.orange,
  style,
}: {
  width?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[{ width, height: 4, backgroundColor: color, borderRadius: 2 }, style]} />;
}
