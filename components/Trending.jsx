import { FlatList, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1
    }
};

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
};

const TrendingItem = ({ activeItem, item }) => {
    const [isVideoStarted, setIsVideoStarted] = useState(false);

    const player = useVideoPlayer({uri: item.video}, player => {
        player.loop = false;
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const handlePlayPause = () => {
        if (isPlaying) {
          player.pause();
        } else {
          player.play();
          setIsVideoStarted(true);
        }
      };

    return (
        <Animatable.View 
            className='mr-5'
            animation={activeItem?.$id === item?.$id ? zoomIn : zoomOut}
            duration={500}
        >
            {isVideoStarted ? (
                <VideoView
                    player={player}
                    style={{ width: 208, height: 290, borderRadius: 33, marginTop: 12 }}
                    allowsFullscreen 
                    allowsPictureInPicture
                    contentFit='cover'
                />
            ) : (
                <TouchableOpacity 
                    className='relative justify-center items-center' 
                    activeOpacity={0.7} 
                    onPress={handlePlayPause}
                >
                    <ImageBackground 
                        source={{uri: item.thumbnail}}
                        className='w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover' 
                    />

                    <Image 
                        source={icons.play}
                        // the absolute will make the image appear on top of the imageBackground
                        className='w-12 h-12 absolute'
                        resizeMode='contain'/> 
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({ posts }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    // this is to make the animation of zooming in and out work when you swipe between items
    const viewableItemsChanged = ({ viewableItems }) => {
        if(viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item);
        }
    }

  return (
    <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <TrendingItem 
                activeItem={activeItem}
                item={item} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 70}}
        contentOffset={{ x: 170 }}
        // this will make the list horizontal
        horizontal
    />
  )
}

export default Trending