import { Pressable, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons } from '../constants'

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {

    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable 
    className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4
                ${isFocused ? 'border-secondary' : 'border-black-200'}`}>
        <TextInput
            className='text-base mt-0.5 text-white font-pregular flex-1'
            value={value}
            placeholder='Search for a video topic'
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            // if it is a password it will hide it
            secureTextEntry={title === 'Password' && !showPassword}

            onFocus={() => setIsFocused(true)} // Update focus state
            onBlur={() => setIsFocused(false)} // Reset focus state
            {...props}
        />

        <TouchableOpacity>
            <Image
                source={icons.search}
                className='w-5 h-5'
                resizeMode='contain'
            />
        </TouchableOpacity>
    </Pressable>  
  )
}

export default SearchInput