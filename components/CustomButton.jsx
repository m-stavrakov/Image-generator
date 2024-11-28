import { TouchableOpacity, Text, Platform } from 'react-native'
import React from 'react'


let useHover = () => [false, {}]; // Fallback for non-web platforms

if (Platform.OS === 'web') {
  useHover = require('react-native-web-hover').useHover;
}


const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
    const [hovered, hoverProps] = useHover();

  return (
    <TouchableOpacity
    // web only
        {...hoverProps}
        style={{
        cursor: hovered ? 'pointer' : 'default',
        }}
    // 
        className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles}
        ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
        onPress={handlePress}
        // the opacity of the button once you press it
        activeOpacity={0.7}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton