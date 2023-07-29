import React, { Component, useRef,memo } from 'react'
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Button,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel' // 3.6.0
import Lightbox from 'react-native-lightbox'
import Icon from 'react-native-vector-icons/FontAwesome5'
const styles = StyleSheet.create({
  mainContainer: {
    height: 200,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSliderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',

  },
  thumbnailImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    resizeMode: 'contain',
  },
  imageSlider: {
    height: 200,

    // minWidth: 130,
    // height: 80,
    resizeMode: 'cover',
    width: '100%',
    backgroundColor: 'white',
  },
  thumbnailBottomBar: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    padding:0,

  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    paddingTop: 0,
    padding:0,
    paddingBottom: 0,
  },
  thumbnailImageContainer:{
    marginRight:10
  }
})

const SCREEN_WIDTH = Dimensions.get('window').width
function ProductsSlider2({
  activeTab,
  activeTabChanged,
  imagesArray,
  onAddImagePress,
  onEditPress,
  onDeletePress,
}) {
  const getImage = (i) => {
    return (
      <Image
        style={[styles.imageSlider]}
        source={
          imagesArray[i] != undefined
            ? {
                uri: imagesArray[i],
              }
            : require('../../assets/noimage.jpg')
        }
      />
    )
  }
  const getImageWithPressEffects = (i) => {
    return <Lightbox underlayColor="white">{getImage(i)}</Lightbox>
  }

  const carouselRef = useRef(null)
  const SCREENS = [
    <View style={styles.imageSliderContainer}>
      {getImageWithPressEffects(0)}
    </View>,
    <View style={styles.imageSliderContainer}>
      {getImageWithPressEffects(1)}
    </View>,
    <View style={styles.imageSliderContainer}>
      {getImageWithPressEffects(2)}
    </View>,
    <View style={styles.imageSliderContainer}>
      {getImageWithPressEffects(3)}
    </View>,
    <View style={styles.imageSliderContainer}>
    {getImageWithPressEffects(4)}
  </View>,
  ]

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={styles.container}>
          <Carousel
            scrollEnabled={false}
            ref={carouselRef}
            data={SCREENS}
            renderItem={({ item }) => item}
            layout={'default'}
            onSnapToItem={(i) => activeTabChanged && activeTabChanged(i)}
            sliderWidth={SCREEN_WIDTH + 3}
            itemWidth={SCREEN_WIDTH + 3}
            slideStyle={{ width: SCREEN_WIDTH + 3 }}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
          />
        </View>
        <View style={styles.thumbnailBottomBar}>
          <Pagination
            containerStyle={styles.tabsContainer}
            renderDots={(activeIndex) =>
              imagesArray.map((screen, i) => (
                <View style={styles.thumbnailImageContainer}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ flex: 1, alignItems: 'center' }}
                    key={i}
                    onPress={() => {
                      carouselRef.current._snapToItem(
                        carouselRef.current._getPositionIndex(i)
                      )
                    }}
                  >
                    <Image
                      style={[
                        styles.thumbnailImage,
                        { borderColor: activeIndex === i ? 'black' : 'white' },
                      ]}
                      source={
                        imagesArray[i] != undefined
                          ? {
                              uri: imagesArray[i],
                            }
                          : require('../../assets/noimage.jpg')
                      }
                    />
                  </TouchableOpacity>
                </View>
              ))
            }
            activeDotIndex={activeTab}
            dotsLength={imagesArray.length}
          />
        </View>
      </View>
    </View>
  )
}
export default memo(ProductsSlider2)