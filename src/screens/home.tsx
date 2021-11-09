import React, { useRef, useEffect } from 'react';

import { View, Text, SafeAreaView, StyleSheet, Animated, StatusBar, Image } 
from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/core';
import { Ionicons } from '@expo/vector-icons';
import { setStatusBarHidden } from 'expo-status-bar';

import CloundSun from '../../assets/adaptive-icon.png';

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
              <Image source={CloundSun} 
                style={{
                  width: '75%',
                  height: '60%',
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
            <View>
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
  },

  footerContainer: {
    marginHorizontal: 30,
    paddingHorizontal: 20,
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

