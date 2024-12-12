import { Pressable, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {

    // const [showPassword, setShowPassword] = useState(false);
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');
    const [isFocused, setIsFocused] = useState(false);

  return (
    <Pressable 
    className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row space-x-4
                ${isFocused ? 'border-secondary' : 'border-black-200'}`}>
        <TextInput
            className='text-base mt-0.5 text-white font-pregular flex-1'
            value={query}
            placeholder='Search for a video topic'
            placeholderTextColor='#CDCDE0'
            onChangeText={(e) => setQuery(e)}
            onFocus={() => setIsFocused(true)} // Update focus state
            onBlur={() => setIsFocused(false)} // Reset focus state
        />

        <TouchableOpacity
          onPress={() => {
            if(!query) {
              return Alert.alert('Missing query', 'Please input something to search results across database')
            }

            if(pathname.startsWith('/search')){
              router.setParams({ query })
            } else {
              router.push(`/search/${query}`)
            }
          }}>
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