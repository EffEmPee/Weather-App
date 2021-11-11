import React, { useRef, useEffect } from 'react';

import { View, Text, SafeAreaView, StyleSheet, Animated, StatusBar, Image } 
from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { setStatusBarHidden } from 'expo-status-bar';

import CloudSun from '../../assets/adaptive-icon.png';
import { ScrollView } from 'react-native-gesture-handler';

type DayWeatherElementProps = {
  selected?: boolean;
}

const WeekScreen = () => {
  const navigation = useNavigation();

  const scrollTop = useRef(new Animated.Value(-200)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const borderAnim = useRef(new Animated.Value(180)).current;
  const scrollBase = useRef(new Animated.Value(150)).current;

  const scrollAnim = ((ref : Animated.Value, value: number, duration: number) => {
    Animated.timing(ref, {
      toValue: value,
      duration: duration,
      useNativeDriver: true,
    }).start();
  });
  
  useEffect(() => {
    setStatusBarHidden(true, 'fade');
    scrollAnim(borderAnim, 65, 550);
    scrollAnim(scrollTop, 0, 350);
    scrollAnim(scrollBase, 0, 350);
  });

  borderAnim.addListener(({ value }) => {
    if (value === 65) {
      scrollAnim(opacityAnim, 1, 350);
      setStatusBarHidden(false, 'fade');
    }
  });

  const DayWeatherElement = ({ selected } : DayWeatherElementProps) => 
    <Animated.View style={
      styles.dayWeather
      }>
      <Text style={{ fontSize: 16, color: 'white', fontWeight: '600', opacity: 0.4 }}>
          Mon
      </Text>
      <View style={{ width: '30%', flexDirection: 'row', height: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
        <Image source={CloudSun} 
          style={{
            width: '50%',
            height: '60%',
          }}
        />
        <Text style={{ fontSize: 16, color: 'white', fontWeight: '600', opacity: 0.4 }}>
          Rainy
        </Text>
      </View>
      <Text style={{ fontSize: 18, color: 'white', fontWeight: '600', opacity: 1 }}>
          +10°<Text style={{ fontSize: 16, opacity: 0.4 }}>+15°</Text>
      </Text>
    </Animated.View>

  return (
    <>
      <StatusBar 
        barStyle='light-content'
      />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#69C1F8' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000f18', flexDirection: 'column' }}>
      <ScrollView style={{ flex: 1 }}>
        <Animated.View
          style={[
            styles.mainContainer,
            {
              transform: [
                {
                  translateY: scrollTop
                }
              ],
              borderBottomLeftRadius: borderAnim,
              borderBottomRightRadius: borderAnim,
            }
          ]}>
            <Animated.View style={
              {
                flex: 1,
                height: '100%',              
                opacity: opacityAnim,
              }
            }>

            <View style={styles.headerContainer}>
              <Ionicons name="arrow-back-circle-outline" style={{ position: 'absolute', left: 15 }} size={32} color="white" onPress={() => navigation.dispatch(CommonActions.goBack())} />
              <Ionicons name="calendar-sharp" size={24} color="white" />
              <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>
                {' '}7 days
              </Text>
            </View>

            <View style={styles.informationsContainer}>
              <Image source={CloudSun} 
                style={{
                  width: '45%',
                  height: '50%',
                  // marginBottom: -40,
                }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'white', fontSize: 32, fontWeight: '400' }}>
                  Tomorrow
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                  <Text style={{ color: 'white', fontSize: 86, fontWeight: '500' }}>
                    25
                  </Text>
                  <Text style={{ color: 'white', fontSize: 42, fontWeight: '500', alignSelf: 'flex-end', opacity: 0.5, height: 'auto' }}>
                    /17°
                  </Text>
                  {/* <Ionicons name="md-ellipse-sharp" size={24} color="white" style={{ marginTop: 15 }}/> */}
                </View>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>
                  Segunda, 9 Nov
                </Text>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
        <Animated.View
          style={[
            styles.footerContainer,
            {
              transform: [
                {
                  translateY: scrollBase,
                }
              ],
            }
          ]}>
            <DayWeatherElement />
            <DayWeatherElement />
            <DayWeatherElement />
            <DayWeatherElement />
            <DayWeatherElement />
        </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '80%',
    backgroundColor: '#69C1F8',

    shadowColor: "#69C1F8",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  footerContainer: {
    // marginHorizontal: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    height: '90%',
    justifyContent: 'space-between',


  },

  headerContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',

    marginTop: 15,
  },

  informationsContainer: {
    width: '100%',
    
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  dayWeather: {
    width: '100%',
    height: '22.5%',
    borderRadius: 25,
    backgroundColor: '#000f18',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',

    flexDirection: 'row',

    // shadowColor: "#69C1F8",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 2.54,

    // elevation: 9,
  },

  dayWeatherText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 5,
  },

  footerGrid: {
    flexDirection: 'row',
  },

  footerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: "600",
  },

  footerButton: {
    color: '#668497',
    fontSize: 14,
    fontWeight: "400",
  }
});

export { WeekScreen };

