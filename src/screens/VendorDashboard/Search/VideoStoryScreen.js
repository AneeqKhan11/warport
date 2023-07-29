import React, { useState, useRef, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, BackHandler } from 'react-native';
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ImagesDataContext } from '../../../context/ImagesDataContextProvider';
import LogoDashboard from '../../../components/LogoDashboard';
import BackButtonWithTitleAndComponent from '../../../components/BackButtonWithTitleAndComponent';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native-paper';
import { createThumbnail } from 'react-native-create-thumbnail';

const { width, height } = Dimensions.get('window');

const VideoStoryScreen = (props) => {
  const [postData, setPostData] = useState()
  const [selectedPost, setSelectedPost] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation()
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const url = 'http://159.223.93.212:5433/uploads/search/'
  let videoName = props.route.params.videoName
  BackHandler.addEventListener('hardwareBackPress',()=>{
    props.navigation.goBack()
    return true
  })

  const { imagesData, requestImagesDataRefresh, imagesDataLoading } = useContext(ImagesDataContext)  
  const combinedData = selectedPost ? [selectedPost, ...postData] : postData;
  useEffect(()=>{
    requestImagesDataRefresh()
  },[])

  async function getVideoPost() {
    try {
      const videoPosts = await imagesData.filter(item => {
        return item.media_serialized.includes('.gif') || item.media_serialized.includes('.mp4');
      });
      setPostData(videoPosts)
    } catch (error) {
      console.error(error);
    }
  }
  async function getSelectedPost(){
    const obj = await imagesData?.find(item => item.media_serialized.includes(videoName));
    setSelectedPost(obj)
  }

  useEffect(()=>{
    getVideoPost()
    getSelectedPost()
  },[imagesData])


  const onLoad = () => {
    setIsLoading(false);
  };

  // const [videoList, setVideoList] = useState([
  //   {
  //     id: '1',
  //     uri: `http://159.223.93.212:5433/uploads/search/${videoName}`,
  //     poster: `http://159.223.93.212:5433/uploads/search/${videoName}`,
  //     likes: 100,
  //     comments: 20,
  //   },
  //   {
  //     id: '2',
  //     uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //     poster: 'https://picsum.photos/200/300',
  //     likes: 200,
  //     comments: 50,
  //   },
  //   {
  //     id: '3',
  //     uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //     poster: 'https://picsum.photos/200/300',
  //     likes: 300,
  //     comments: 70,
  //   },
  //   // add more videos here
  // ]);

  const videoRef = useRef(null);

  const renderItem = ({ item, index }) => {
    const uri = url+JSON.parse(item.media_serialized)
    let poster = url+JSON.parse(item.media_serialized)
    const product_name = item.product_name
    const supplier_name = item.supplier_name
   {
      isLoading &&  createThumbnail({
      url: uri,
      timeStamp: 10000, // choose a time stamp (in milliseconds) to capture the thumbnail from
    })
      .then((response) => {
        poster = response.path;
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
   }
    return (
      
        <View style={styles.videoContainer}>
          {/* <BackButtonWithTitleAndComponent
            goBack={() => {
              props.navigation.goBack()
            }}
            title="Explore"
          >
                <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LogoDashboard />
                  </View>
          </BackButtonWithTitleAndComponent> */}
          {
            item.media_serialized.includes('.gif')? 
            <FastImage
                      style={styles.video}
                      source={{
                          uri: uri,
                          priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                      onLoad={onLoad}
                  />: 
                  <TouchableOpacity onPress={() => videoRef.current.seek(0)}>
                  <Video
                          source={{ uri }}
                          poster={thumbnailUrl}
                          posterResizeMode="cover"
                          style={styles.video}
                          resizeMode="cover"
                          repeat
                          controls={true}
                          ref={videoRef}
                        />
                  </TouchableOpacity>
          }
          {isLoading && (
                  <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="gray"/>
                  </View>
          )}
          <View style={styles.overlay}>
            <View style={styles.bottomControls}>
              <Text style={styles.text}>{product_name}</Text>
              <Text style={styles.text}>{supplier_name}</Text>
            </View>
          </View>
        </View>
      
    );
  };

  return (  
    <View style={styles.container}>
      <FlatList
        data={combinedData}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    width,
    height,
  },
  video: {
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default VideoStoryScreen;
