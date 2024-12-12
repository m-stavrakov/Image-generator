import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import { useEffect } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'

const Search = () => {
  const { query } = useLocalSearchParams();

  // data: posts renames data to posts
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  // will be called every time the query changes
  useEffect(() => {
    refetch();
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      {/* used to render a list */}
      <FlatList
        data={posts}
        // the data will contain the id
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4'>

            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query} />
            </View>

            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results
            </Text>

            <Text className='text-2xl font-psemibold text-white'>
              {query}
            </Text>

          </View>
        )}
        // What will happen if the list is empty
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query" />
        )}
      />
    </SafeAreaView>
  )
}

export default Search