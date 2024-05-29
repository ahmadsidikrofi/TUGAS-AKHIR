import React from 'react';
import { View } from 'react-native';
import TabItem from './TabItem';

const BottomNavigator = ({ state, descriptors, navigation }) => {
	return (
		<View className='flex-row bg-white justify-between px-3 py-3'
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				return (
					<TabItem
						key={index}
						label={label}
						isFocused={isFocused}
						onPress={onPress}
						onLongPress={onLongPress}
					/>
				);
			})}
		</View>
	);
}

export default BottomNavigator
