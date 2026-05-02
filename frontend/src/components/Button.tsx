import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  label: string;
}

export function Button({ label, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 600,
    color: "#ffffff",
  },
  container: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#0f47d0",
    alignItems: "center",
    justifyContent: "center",
  }
})