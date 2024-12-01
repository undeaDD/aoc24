import React, { memo, useCallback, useState } from "react";
import { NavigationContainer, DarkTheme, DefaultTheme, useTheme, useNavigation, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FlatList, LogBox, ScrollView, useColorScheme } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Challenge, Challenges } from "./days";
import * as Clipboard from 'expo-clipboard';
import { enableFreeze, enableScreens } from "react-native-screens";

enableFreeze();
enableScreens();
LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

const Home = () => {
    const navigation = useNavigation<any>();
    const theme = useTheme();

    const getStar = (star: 0 | 1 | 2): "star-o" | "star-half-full" | "star" => {
        switch (star) {
            case 1:
                return "star-half-full"
            case 2:
                return "star"
            default:
                return "star-o"
        }
    }

    const renderItem = ({ item }: { item: Challenge }) => {
        const isFirst = item.key === "1";
        const isLast = item.key === "" + Challenges.length;

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.push(`Day${item.key}`)}
                style={{
                    height: 55,
                    marginHorizontal: 12,
                    flex: 1,
                    backgroundColor: theme.colors.card,
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    borderTopStartRadius: isFirst ? 12 : 0,
                    borderTopEndRadius: isFirst ? 12 : 0,
                    borderBottomStartRadius: isLast ? 12 : 0,
                    borderBottomEndRadius: isLast ? 12 : 0,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15
                    }}
                >
                    <FontAwesome
                        name={getStar(item.star)}
                        size={24}
                        color={theme.colors.primary}
                    />
                    <Text
                        style={{
                            color: theme.colors.text,
                            fontWeight: "bold"
                        }}
                    >
                        Day {item.key}
                    </Text>
                </View>
                <FontAwesome
                    name={"chevron-right"}
                    size={20}
                    color={theme.colors.primary}
                />
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            contentContainerStyle={{marginVertical: 10}}
            contentInsetAdjustmentBehavior="automatic"
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            data={Challenges}
        />
    )
}

const Detail = (props: any) => {
    const theme = useTheme();
    const [log, setLog] = useState<string>("");

    const print = (value: string) => {
        setLog((prev) => prev + value + "\n");
    }

    useFocusEffect(
		useCallback(() => {
			setLog("");
			print("[Starting Measurement]\n------\n");

			const startTime = Date.now();
			const result = props.route.params.item.solve(print);
			const measuredTime = ((Date.now() - startTime));

			print("\n------\n[Time Elapsed: " + measuredTime + "ms]");
			Clipboard.setStringAsync(result);

			print("[Copied to Clipboard]");
			Clipboard.setStringAsync(result);
		}, [])
	);

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
        >
            <Text
				selectable={true}
                style={{
                    color: theme.colors.text,
                    backgroundColor: theme.colors.background,
                    padding: 20,
					fontSize: 16,
					fontWeight: "semibold"
                }}
            >
                {log}
            </Text>
        </ScrollView>
    )
}

const App = () => {
    const scheme = useColorScheme();

    return (
        <NavigationContainer
            theme={scheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack.Navigator
                screenOptions={{
                    headerLargeTitle: true,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: "Advent of Code 24",
                    }}
                />
                {
                    Challenges.map((challenge) => (
                        <Stack.Screen
                            key={challenge.key}
                            name={`Day${challenge.key}`}
                            component={Detail}
                            initialParams={{item: challenge}}
                            options={{
                                title: `Day ${challenge.key}`,
                            }}
                        />
                    ))
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default memo(App);