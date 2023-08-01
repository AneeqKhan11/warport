import React, { useRef } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Lightbox from 'react-native-lightbox';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Colors } from 'react-native-paper';
import BubbleMessage from '../components/BubbleMessage';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainContainer: {
    height: 200,
    marginTop: 9,
    backgroundColor: 'grey',
    borderRadius: 20
  },
  imageSliderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  thumbnailImage: {
    width: 45,
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    resizeMode: 'contain',
  },
  imageSlider: {
    width: "70%",
    height: '70%',
  },
  thumbnailBottomBar: {
    backgroundColor: 'white',

  },
  tabsContainer: {
    flexDirection: 'row',
    height: 70,
    paddingTop: 0,
    // paddingBottom: 0,
  },
  deleteEditBtn: {
    position: 'absolute',
    zIndex: 10000,
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    top: 4,
  },
  deleteBtn: {
    left: 30,
    backgroundColor: '#ff5353',
    borderColor: '#cd3232',
  },
  editBtn: {
    right: 30,
    backgroundColor: 'gray',
    borderColor: '#505050',
  },
  editBtn1: {
    position: 'absolute',
    zIndex: 10000,
    right: 100,
    top: 100,
    borderWidth: 1,
    borderColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 50,
  },
  addProductText: {
    marginLeft: 10,
    paddingTop: 10,
    fontSize: 20,
    color: '#FFF'
  },
  numberText: {
    fontSize: 16,
    color: Colors.blue400,
    position: 'absolute',
    zIndex: 10000,
    left: 30,
    // bottom: 4,
  },
});

const ProductSlide = ({
  imagesArray,
  onAddImagePress,
  onEditPress,
  onDeletePress,
  activeTab
}) => {
  const getImage = (i) => {
    return (
      <View style={{
        height: 100,
        width: 100,
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF",
        overflow: 'hidden',
        marginVertical: 20

      }}>
        <Image
          style={[
            styles.imageSlider,
            {
              resizeMode: imagesArray[i] != undefined ? 'cover' : 'contain',
            },
          ]}
          source={
            imagesArray[i] != undefined
              ? {
                uri: imagesArray[i],
              }
              : require('../../assets/noimage.jpg')
          }
        />
      </View>
    );
  };

  const getImageWithPressEffects = (i) => {
    return imagesArray[i] == undefined ? (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          onAddImagePress && onAddImagePress();
        }}
      >
        {getImage(i)}
      </TouchableOpacity>
    ) : (
      <Lightbox underlayColor="white">{getImage(i)}</Lightbox>
    );
  };

  const getDeleteEditButtons = () => {
    return (
      <>
        <TouchableOpacity onPress={onEditPress} style={[styles.deleteEditBtn, styles.editBtn]}>
          <Icon name={'pen'} size={17} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeletePress} style={[styles.deleteEditBtn, styles.deleteBtn]}>
          <Icon name={'trash'} size={17} color={'white'} />
        </TouchableOpacity>
      </>
    );
  };

  const carouselRef = useRef(null);
  const SCREENS = [];

  // Generate the carousel views based on the imagesArray
  for (let i = 0; i < 7; i++) {
    SCREENS.push(
      <View style={styles.imageSliderContainer} key={i}>
        {imagesArray[i] != undefined && getDeleteEditButtons()}
        {imagesArray[i] ? (
          <></>
        ) : (
          <Text style={styles.addProductText}>Add your Product</Text>
        )}
        {getImageWithPressEffects(i)}
        {imagesArray[i] != undefined && (
          <TouchableOpacity onPress={onEditPress} style={styles.editBtn1}>
            <Icon name={'pen'} size={17} color={'white'} />
          </TouchableOpacity>
        )}
        {/* {<Text style={styles.numberText}>{i + 1}</Text>} */}
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Carousel
        scrollEnabled={false}
        ref={carouselRef}
        data={SCREENS}
        renderItem={({ item }) => item}
        layout={'default'}
        sliderWidth={SCREEN_WIDTH - 20}
        itemWidth={SCREEN_WIDTH - 20}
        slideStyle={{ width: SCREEN_WIDTH - 20 }}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
    </View>
  );
};

export default ProductSlide;



{/* <View style={styles.thumbnailBottomBar}>
          <Pagination
            containerStyle={styles.tabsContainer}
            renderDots={(activeIndex) =>
              SCREENS.map((screen, i) => (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{ flex: 1, alignItems: 'center' }}
                  key={i}
                  onPress={() => {
                    carouselRef.current._snapToItem(
                      carouselRef.current._getPositionIndex(i)
                    );
                    onAddImagePress && onAddImagePress();
                  }}
                >
                  <Image
                    style={[
                      styles.thumbnailImage,
                      { borderColor: activeIndex === i ? '#ddd' : 'white' },
                    ]}
                    source={
                      imagesArray[i] != undefined
                        ? {
                          uri: imagesArray[i],
                        }
                        : require('../../assets/noimage.jpg')
                    }
                  />
                  <Text>{i + 1}</Text>
                </TouchableOpacity>
              ))
            }
            activeDotIndex={activeTab}
            dotsLength={3}
          />
        </View> */}
      {/* <View ></View> */}