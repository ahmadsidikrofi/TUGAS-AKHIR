import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
	{ label: 'Pria', value: 'Pria' },
	{ label: 'Wanita', value: 'Wanita' },
];

const DropdownGender = ({ setJenis_kelamin, jenis_kelamin }) => {
	const [value, setValue] = useState(jenis_kelamin);
	const [isFocus, setIsFocus] = useState(false);
	const [test, setTest] = useState('')

	useEffect(() => { setValue(jenis_kelamin) }, [jenis_kelamin])

	const renderLabel = () => {
		if (value || isFocus) {
			return (
				<Text style={[styles.label, isFocus && { color: 'blue' }]}>
					Mana kelaminmu?
				</Text>
			);
		}
		return null;
	};

	return (
		<View style={styles.container}>
			{renderLabel()}
			<Dropdown
				style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				iconStyle={styles.iconStyle}
				data={data}
				maxHeight={300}
				labelField="label"
				valueField="value"
				placeholder={!isFocus ? 'Pilih kelamin' : '...'}
				searchPlaceholder="Search..."
				value={value}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
				onChange={item => {
					setValue(item.value);
					setJenis_kelamin(item.value)
					setIsFocus(false);
				}}
				renderLeftIcon={() => (
					<AntDesign
						style={styles.icon}
						color={isFocus ? 'blue' : 'black'}
						name="Safety"
						size={20}
					/>
				)}
			/>
		</View>
	);
};

export default DropdownGender;

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingVertical: 16,
		paddingHorizontal: 8,
		borderRadius: 15
	},
	dropdown: {
		height: 50,
		borderColor: 'gray',
		borderWidth: 0.5,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	icon: {
		marginRight: 5,
	},
	label: {
		position: 'absolute',
		backgroundColor: 'white',
		borderRadius: 15,
		left: 22,
		top: 8,
		zIndex: 999,
		paddingHorizontal: 8,
		fontSize: 14,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});
