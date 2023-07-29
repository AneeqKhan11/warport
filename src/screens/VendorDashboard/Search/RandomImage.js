
import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, BackHandler} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import FastImage from 'react-native-fast-image'
import { Colors } from 'react-native-paper';
import { theme } from '../../../core/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { createThumbnail } from "react-native-create-thumbnail";
import VideoThumbnail from './VideoThumbnail';
import AlertView from '../../../context/AlertView';
const styles = StyleSheet.create({
  // imageContainer: {
  //   flex: 1,
  //   aspectRatio: 1,
  //   margin: 5,
  // },
  imageContainer: {
    flex: 1 / 3,
    margin: 1,
    height: Dimensions.get('window').width / 3,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  gif: {
    flex: 1,
    resizeMode: 'cover',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-start',
    width:'98%',
    margin:10
},
containers:{
    flexDirection:'row',
    alignItems:'flex-start',
    width:'98%',
    margin:10,
},
boxStyle:{
    padding:10,
    marginLeft:10
},
textInputStyle:{
    flex:2,
    marginLeft:10
},
imageStyle:{
  flexGrow:1,
  resizeMode:'contain',
  borderColor:Colors.white,
  borderWidth:2,
  borderRadius:2,
},
imageStyle1:{
  resizeMode:'contain',
  borderColor:Colors.white,
  borderWidth:2,
  borderRadius:2,
  flexGrow:1,
  width:"100%"
},
MainImageView:{
  flexDirection:'row',
  width:"100%"
},
fourImageView:{
  flex:2,
},
twoImageView:{
  flexDirection:'row'
},
largeImage:{
  flex:1,
  flexGrow:1,
},
comingSoonText:{
  position:'absolute',
  top:"35%",
  left:"30%",
  fontSize:25,
  color:theme.colors.primary,
  zIndex:1,
  width:200,
  height:100
},
welcomeCallBtnText: {
  marginHorizontal: 0,
  fontSize: 12,
  paddingHorizontal: 0,
  height: 14,
  lineHeight: 15,
},
imageContainer: {
  flex: 1,
  margin: 2,
},
image: {
  flex: 1,
  aspectRatio: 1,
},
gif: {
  flex: 1,
  aspectRatio: 1,
},
imageIcon:{
  position:'absolute',
  top:10,
  right:20
},
videoIcon:{
  position:'absolute',
  bottom:30,
  left:15
}
});

const RandomImage = React.memo(({ data, index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false)
  const [images,setImages] = useState([])
  const [gif, setGif] = useState([])
  const [videos, setVideos] = useState([])
  const navigation = useNavigation()
  let baseUrl = 'http://159.223.93.212:5433/uploads/search/'

  BackHandler.addEventListener('hardwareBackPress',()=>{
    setAlertVisible(true)
    return true
  })
  const randomize = () => {
    setImages(images.sort(()=> Math.random()-0.5))
    setGif(gif.sort(()=> Math.random()-0.5))
    setVideos(videos.sort(()=> Math.random()-0.5))
  }
  
  useEffect(()=>{
    data.map((item)=>{
      if(item.endsWith('.gif')){
        setGif(old =>[...old, item])
      }else if(item.endsWith('.mp4')){
        setVideos(old =>[...old, item])
      }else{
        setImages(old => [...old, item])
      }
    })
    // randomize()
  },[data])


  

  // useEffect(()=>{
  //   randomize()
  // },[])

  const handleImages = (uri) => {
    // Handle touch start event here
    navigation.navigate('ImageScreen', {imageUrl:uri})
  };
  const handleVideos = (uri) => {
    // Handle touch start event here
    navigation.navigate('VideoStoryScreen',{videoName:uri})
  };

  const onLoad = () => {
    setIsLoading(false);
  };



  return (

    <View>
      {
             alertVisible && <AlertView title={"WarePort Alert"} message={"Are you sure you want to Exit App?"} exit={true}></AlertView>
      }
    <View style={styles.MainImageView}>
          <View style={styles.fourImageView}>
            <View style={styles.twoImageView}>
            <View style={styles.imageContainer}>
            {/* {images[0]? (
                <TouchableOpacity
                    onPress={() => handleImages(images[0])}
                  >
                <FastImage
                          style={styles.gif}
                          source={{
                              uri: baseUrl+images[0]? images[0]:videos[0],
                              priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                          onLoad={onLoad}
                      />
                <Icon name="photo-library" size={24} color="white" style={styles.imageIcon}/>
                {isLoading && (
                      <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="gray"/>
                      </View>
                  )}
                </TouchableOpacity>) :
                
            } */}
            {videos[index+0] && <VideoThumbnail videoUrl={baseUrl+videos[index+0]}></VideoThumbnail>} 
              </View>
              <View style={styles.imageContainer}>
              
              <TouchableOpacity
                onPress={() => handleImages(images[index+0])}
              >
            <FastImage
                      style={styles.gif}
                      source={{
                          uri: baseUrl+images[index+0],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                  />
            
            </TouchableOpacity>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.twoImageView}>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => handleImages(images[index+1])}
              >
            <FastImage
                      style={styles.gif}
                      source={{
                          uri: baseUrl+images[index+1],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                  />
            </TouchableOpacity>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )}
              </View>
              <View style={styles.imageContainer}>
              {/* <TouchableOpacity
                onPress={() => handleImages(images[3])}
              >
            <FastImage
                      style={styles.gif}
                      source={{
                          uri: baseUrl+images[3],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                  />
                  <Icon name="photo-library" size={24} color="white" style={styles.imageIcon}/>
            </TouchableOpacity>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )} */}
                {videos[index+1] && <VideoThumbnail videoUrl={baseUrl+videos[index+1]}></VideoThumbnail>} 
              </View>
            </View>
          </View>
          <View style={styles.largeImage}>
          <FastImage
                      style={styles.imageStyle1}
                      source={{
                          uri: baseUrl+gif[index+0],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                      onTouchEnd={()=>{handleVideos(gif[index+0])}}
                  />
           <Icon name="ondemand-video" size={24} color="white" style={styles.videoIcon}/>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )}
          </View>
          </View>
          <View style={styles.MainImageView}>
          <View style={styles.largeImage}>
          <FastImage
                      style={styles.imageStyle1}
                      source={{
                          uri: baseUrl+gif[index+1],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                      onTouchEnd={()=>{handleVideos(gif[index+1])}}
                  />
                <Icon name="ondemand-video" size={24} color="white" style={styles.videoIcon}/>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )}
          </View>
          <View style={styles.fourImageView}>
            <View style={styles.twoImageView}>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => handleImages(images[index+2])}
              >
            <FastImage
                      style={styles.gif}
                      source={{
                          uri: baseUrl+images[index+2],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                  />
                 
            </TouchableOpacity>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )}
              </View>
              <View style={styles.imageContainer}>
              {/* <TouchableOpacity
                onPress={() => handleImages(images[5])}
              >
            <FastImage
                      style={styles.gif}
                      source={{
                          uri: baseUrl+images[5],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                  />
               <Icon name="photo-library" size={24} color="white" style={styles.imageIcon}/>
            </TouchableOpacity>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )} */}
                {videos[index+2] && <VideoThumbnail videoUrl={baseUrl+videos[index+2]}></VideoThumbnail>}
              </View>
            </View>
            <View style={styles.twoImageView}>
            <View style={styles.imageContainer}>
              {/* <TouchableOpacity
                onPress={() => handleImages(images[6])}
              >
            <FastImage
                      style={styles.gif}
                      source={{
                          uri: images[6],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                  />
              <Icon name="photo-library" size={24} color="white" style={styles.imageIcon}/>
            </TouchableOpacity>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )} */}
                {videos[index+3] && <VideoThumbnail videoUrl={baseUrl+videos[index+3]}></VideoThumbnail>}
              </View>
              <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => handleImages(images[index+2])}
              >
            <FastImage
                      style={styles.gif}
                      source={{
                          uri: images[index+2],
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                  />
            </TouchableOpacity>
                {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
                )}
              </View>
            </View>
          </View>
          </View>
    </View>
  );
});

export default RandomImage;