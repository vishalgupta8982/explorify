import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'native-base'
import Header from '../Components/Header'

export default function TrendingInIndia() {
  return (
     <ScrollView>
        <Header headingText={"Trending In India"} />
     </ScrollView>
  )
}