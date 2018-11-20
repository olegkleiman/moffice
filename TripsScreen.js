import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import MapView, { MAP_TYPES } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class TripsScreen extends React.Component {

  state = {
    cache: true
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Trips',
      headerStyle: {
        backgroundColor: '#f4511e',
      }
    };
  };

  render() {
    return(<MapView
                style={styles.map}
                /*provider="google"*/
                cacheEnabled={this.state.cache}
                zoomEnabled
                scrollingEnabled
                loadingIndicatorColor="#666666"
                loadingBackgroundColor="#eeeeee"
                onMapReady={ () => console.log('Map is ready')}
                initialRegion={{
                  latitude: 32.111767,
                  longitude: 34.801361,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
          </MapView>)
  }


};

const styles = StyleSheet.create({
    mapContainer: {
      height: 200,
      backgroundColor: 'green',
      alignItems: 'center'
    },
    map: {
      ...StyleSheet.absoluteFillObject,
      alignSelf: 'center'
    },
});

export default TripsScreen;
