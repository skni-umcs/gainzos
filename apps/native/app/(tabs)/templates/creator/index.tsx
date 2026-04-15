import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { CreateTemplateScreen } from '@/components/template-creator/main-screen';

export default function TemplateCreatorRoute() {
	const router = useRouter();
	const createAnimation = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		createAnimation.setValue(0);
		Animated.timing(createAnimation, {
			toValue: 1,
			duration: 280,
			useNativeDriver: true,
		}).start();
	}, [createAnimation]);

	const translateY = createAnimation.interpolate({
		inputRange: [0, 1],
		outputRange: [-40, 0],
	});

	return (
		<Animated.View
			style={[
				styles.createScreen,
				{
					opacity: createAnimation,
					transform: [{ translateY }],
				},
			]}
		>
			<CreateTemplateScreen onClose={() => router.back()} />
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	createScreen: {
		flex: 1,
	},
});
