/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ViewShot from 'react-native-view-shot';

const App = () => {
  const [listBlur, setListBlur] = useState([]);
  const [linkImg, setLinkImg] = useState();
  const imageRef = useRef();
  const onTouchEvent = (name, ev) => {
    console.log(
      `[${name}] ` +
        `root_x: ${ev.nativeEvent.pageX}, root_y: ${ev.nativeEvent.pageY} ` +
        `target_x: ${ev.nativeEvent.locationX}, target_y: ${ev.nativeEvent.locationY} ` +
        `target: ${ev.nativeEvent.target}`,
    );
    setListBlur([
      ...listBlur,
      {top: ev.nativeEvent.pageY - 20, left: ev.nativeEvent.pageX - 20},
    ]);
  };

  const renderBlur = (top, left) => {
    return (
      <View
        key={`${top}-${left}`}
        style={[
          styles.blurRoundContainer,
          {
            top: top,
            left: left,
          },
        ]}
      />
    );
  };

  console.log('listBlur', listBlur);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ViewShot
        ref={imageRef}
        options={{format: 'png', quality: 1}}
        style={{flex: 1}}>
        <Image
          style={{width: '100%', height: '80%'}}
          source={{uri: 'https://picsum.photos/200/300'}}
        />
        <View style={styles.viewOverlay}>
          <View
            style={styles.container}
            onStartShouldSetResponder={ev => true}
            // onMoveShouldSetResponder={(ev) => false}
            onResponderGrant={onTouchEvent.bind(this, 'onResponderGrant')}
            // onResponderReject={onTouchEvent.bind(this, "onResponderReject")}
            onResponderMove={onTouchEvent.bind(this, 'onResponderMove')}
            // onResponderRelease={this.onTouchEvent.bind(this, "onResponderRelease")}
            // onResponderTerminationRequest={(ev) => true}
            // onResponderTerminate={this.onTouchEvent.bind(this, "onResponderTerminate")}
          >
            {listBlur.map(itm => renderBlur(itm.top, itm.left))}
          </View>

          <TouchableOpacity
            style={styles.buttonCapture}
            onPress={() => {
              imageRef.current.capture().then(data => {
                console.log('do something with ', data);
                setLinkImg(data);
              });
            }}>
            <Text>Capture Image</Text>
          </TouchableOpacity>
          <Text>{linkImg}</Text>
        </View>
      </ViewShot>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  buttonCapture: {
    marginTop: 15,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
  },
  viewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '80%',
  },
  blurRoundContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    opacity: 0.1,
  },
});

export default App;
