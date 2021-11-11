import React, { useRef, useEffect } from 'react';

import { View, Text, SafeAreaView, StyleSheet, Animated, StatusBar, Image } 
from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { setStatusBarHidden } from 'expo-status-bar';

import CloudSun from '../../assets/adaptive-icon.png';

type DayWeatherElementProps = {
  selected?: boolean;
}

const HomeScreen = () => {
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
    <Animated.View style={[
      styles.dayWeather,
      selected && {
        backgroundColor: '#69C1F8',
        
        shadowColor: "#fff",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,

        elevation: 4,

        width: '24%',
        height: '95%',
      },
      {
        opacity: opacityAnim,
      }
      ]}>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
        <Text style={styles.dayWeatherText}>
          25
        </Text>
        <Ionicons name="md-ellipse-sharp" size={6} color="white" style={{ marginTop: 3.5 }}/>
      </View>
      <View style={{ width: '100%', flex: 1 }}>
        <Image source={CloudSun} 
          style={{
            width: '100%',
            height: '77%',
          }}
        />
      </View>
      <Text style={[{ fontSize: 12, color: 'white', fontWeight: '600' }, !selected && { opacity: 0.4 }]}>
          10:00
      </Text>
    </Animated.View>

  return (
    <>
      <StatusBar 
        barStyle='light-content'
      />
      <SafeAreaView style={{ flex: 0, backgroundColor: '#69C1F8' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#000f18' }}>
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
                opacity: opacityAnim,
              }
            }>

            <View style={styles.headerContainer}>
              <Ionicons name="md-location-sharp" size={32} color="white" />
              <Text style={{ color: 'white', fontSize: 24, fontWeight: '600' }}>
                Londrina, PR
              </Text>
            </View>

            <View style={styles.informationsContainer}>
              <Image source={CloudSun} 
                style={{
                  width: '75%',
                  height: '60%',
                  marginBottom: -40,
                }}
              />
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center'}}>
                <Text style={{ color: 'white', fontSize: 136, fontWeight: '200', marginLeft: 30 }}>
                  25
                </Text>
                <Ionicons name="md-ellipse-sharp" size={24} color="white" style={{ marginTop: 30 }}/>
              </View>
              <Text style={{ color: 'white', fontSize: 32, fontWeight: '500' }}>
                Ensolarado
              </Text>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>
                Segunda, 9 Nov
              </Text>
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
            <View style={{ 
              flexDirection: 'row', 
              width: '100%', 
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.footerTitle}>Today</Text>
              <Text style={styles.footerButton} 
                onPress={() => navigation.dispatch(CommonActions.navigate('Week'))}>
                  7 days {'>'}
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
              <DayWeatherElement />
              <DayWeatherElement selected/>
              <DayWeatherElement />
              <DayWeatherElement />
            </View>
          {/* <Text>Home</Text> */}
        </Animated.View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.75,
    width: '100%',
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
    paddingHorizontal: 30,
    marginTop: 'auto',

    flex: 0.235,
    justifyContent: 'space-between',
  },

  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',

    marginTop: 15,
  },

  informationsContainer: {
    width: '100%',
    
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },

  dayWeather: {
    width: '22.5%',
    height: '90%',
    borderRadius: 25,
    backgroundColor: '#000f18',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    shadowColor: "#69C1F8",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.54,

    elevation: 9,
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

export { HomeScreen };

