import { View, Text, Pressable, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>
        {title}
      </Text>

      <Pressable className='border-2 border-black-200 w-full h-16 px-4
                     bg-black-100 rounded-2xl focus:outline-white items-center flex-row'>
        <TextInput
            className='flex-1 text-white font-psemibold text-base'
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            // if it is a password it will hide it
            secureTextEntry={title === 'Password' && !showPassword} 
        />

        {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image 
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className='w-6 h-6'
                    resizeMode='contain'
                />
            </TouchableOpacity>)}
      </Pressable>  
    </View>
  )
}

export default FormField