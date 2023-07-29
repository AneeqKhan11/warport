import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet, Image, FlatList, BackHandler } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { Colors } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import BackButtonWithTitleAndComponent from '../../../components/BackButtonWithTitleAndComponent';
import { ScrollView } from 'react-native-gesture-handler';
import { ImagesDataContext } from '../../../context/ImagesDataContextProvider';
import Flag from 'react-native-flags';
import LogoDashboard from '../../../components/LogoDashboard';

const ImageScreen = (props) => {
  const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [postData, setPostData] = useState()
  const [selectedPost, setSelectedPost] = useState()
  const url = 'http://159.223.93.212:5433/uploads/search/'
  let imageName = props.route.params.imageUrl

  BackHandler.addEventListener('hardwareBackPress',()=>{
    props.navigation.goBack()
    return true
  })

  const { imagesData, requestImagesDataRefresh, imagesDataLoading } = useContext(ImagesDataContext)  

  useEffect(()=>{
    requestImagesDataRefresh()
  },[])

  useEffect(()=>{
    async function getPosts(){
      if(imagesData!=null){
        const obj = await imagesData.sort(()=> Math.random()-0.5)
        setPostData(obj)
      }
    }
    
    async function getSelectedPost(){
      const obj = await imagesData.find(item => item.media_serialized.includes(imageName));
      setSelectedPost(obj)
    }
    getSelectedPost()
    getPosts()
  },[imagesData])

    const { width: screenWidth } = Dimensions.get('window');
  
    const renderItem = ({ item }) => {
      return (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: url+item }} />
        </View>
      );
    };

  return (
    <ScrollView stickyHeaderIndices={[0]}>
      <BackButtonWithTitleAndComponent
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
          </BackButtonWithTitleAndComponent>
      {
        selectedPost && 
        <View style={styles.container}>

        {/* Post Header */}
        <View style={styles.header}>
          <Image
            style={styles.profilePicture}
            source={require("../../../../assets/logo.png")}
            resizeMode={'contain'}
          />
          <Text style={styles.username}>{selectedPost.product_name}</Text>
        </View>


        {/* Post Image */}
        {JSON.parse(selectedPost.media_serialized).length > 1 ? (
          <View style={styles.image}>
            <Carousel
              data={JSON.parse(selectedPost.media_serialized)}
              renderItem={renderItem}
              onSnapToItem={(index) => setActiveIndex(index)}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 60}
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
            />
            <Pagination
              dotsLength={JSON.parse(selectedPost.media_serialized).length}
              activeDotIndex={activeIndex}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotStyle={styles.paginationInactiveDot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        </View>
        ) : (
          <FastImage
                        style={styles.image}
                        source={{
                            uri: url+JSON.parse(selectedPost.media_serialized)[0],
                            priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
        )}

        {/* Post Footer */}
        <View style={styles.footer}>
          <Text style={styles.likesCount}>Product Category: {selectedPost.product_category}</Text>
          <Text style={styles.caption}>Supplier Name: {selectedPost.supplier_name}</Text>
        </View>
        </View>
      }
        
      {
        postData && postData.map((post)=>{
          if(JSON.parse(post.media_serialized).some(file => file.includes('.mp4'))){
            return <></>
          }else{
            return(
              <View style={styles.container}>
    
              {/* Post Header */}
              <View style={styles.header}>
                <Image
                  style={styles.profilePicture}
                  source={require("../../../../assets/logo.png")}
                  resizeMode={'contain'}
                />
                <Text style={styles.username}>{post.product_name}</Text>
              </View>
              
                
              {/* Post Image */}
              {JSON.parse(post.media_serialized).length > 1 ? (
                <View style={styles.image}>
                  <Carousel
                    data={JSON.parse(post.media_serialized)}
                    renderItem={renderItem}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth - 60}
                    loop={true}
                    autoplay={true}
                    autoplayInterval={3000}
                  />
                  <Pagination
                    dotsLength={JSON.parse(post.media_serialized).length}
                    activeDotIndex={activeIndex}
                    containerStyle={styles.paginationContainer}
                    dotStyle={styles.paginationDot}
                    inactiveDotStyle={styles.paginationInactiveDot}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                  />
              </View>
              ) : (
                <FastImage
                              style={styles.image}
                              source={{
                                  uri: url+JSON.parse(post.media_serialized)[0],
                                  priority: FastImage.priority.high,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                          />
              )}
        
              {/* Post Footer */}
              <View style={styles.footer}>
                <Text style={styles.likesCount}>Product Category: {post.product_category}</Text>
                <Text style={styles.caption}>Supplier Name: {post.supplier_name}</Text>
              </View>
            </View>)
          }
          
        })
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 400,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  footer: {
    padding: 8,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  likesCount: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  caption: {
    marginBottom: 4,
  },
  commentsCount: {
    color: 'gray',
  },
});

export default ImageScreen;


const imageUrl = 'http://159.223.93.212:5433/uploads/search/WhatsApp_Image_2023-03-03_at_6.41.39_AM-removebg-preview.png'