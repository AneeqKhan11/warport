import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { createThumbnail } from 'react-native-create-thumbnail';
import  Icon  from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';    

const VideoThumbnail = ({ videoUrl }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation()

  useEffect(() => {
    let isMounted = true;
    let cleanup = () => {};
  
    createThumbnail({
      url: videoUrl,
      timeStamp: 10000, // choose a time stamp (in milliseconds) to capture the thumbnail from
    })
      .then((response) => {
        if (isMounted) {
          setThumbnailUrl(response.path);
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });
  
    cleanup = () => {
      isMounted = false;
    };
  
    return cleanup;
  }, [videoUrl]);

  const handlePress = () => {
    // Handle thumbnail press
    navigation.navigate('VideoStoryScreen',{videoName:videoUrl})
  };

  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        )}
        {thumbnailUrl && (
          <FastImage
            style={styles.thumbnail}
            source={{
              uri: thumbnailUrl,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoad={onLoad}
          />
        )}
        <Icon name="ondemand-video" size={24} color="white" style={styles.videoIcon}/>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  thumbnail: {
    flex: 1,
    aspectRatio: 1,
  },
  videoIcon:{
    position:'absolute',
    bottom:10,
    left:10
  }
};

export default VideoThumbnail;
