import "@/global.css";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-lg text-blue-400">Edit app/index.tsx to SSSedit this screen.</Text>
    </View>
  );
}
