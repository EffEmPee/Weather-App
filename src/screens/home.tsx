import React, { useRef, useEffect } from 'react';

import { View, Text, SafeAreaView, StyleSheet, Animated } 
from 'react-native';

const HomeScreen = () => {

  const scrollTop = useRef(new Animated.Value(-200)).current;
  const scrollBase = useRef(new Animated.Value(200)).current;

  const scrollAnim = (ref) => {
    Animated.timing(ref, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }
  
  useEffect(() => {
    scrollAnim(scrollTop);
    scrollAnim(scrollBase);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000f18' }}>
      <Animated.View
        style={[
          styles.mainContainer,
          {
            transform: [
              {
                translateY: scrollTop,
              },
            ],
          }
        ]}> 
        {/* <Text>Home</Text> */}
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
            <Text style={styles.footerButton}>7 days ></Text>
          </View>
          <View> 
            
          </View>
        {/* <Text>Home</Text> */}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 0.75,
    marginHorizontal: 10,
    backgroundColor: '#69C1F8',
    // borderBottomLeftRadius: 60,
    // borderBottomRightRadius: 60,
    borderRadius: 65,
    borderWidth: 1.5,
    borderColor: '#b3e2ff',
  },

  footerContainer: {
    marginHorizontal: 30,
    paddingHorizontal: 20,
    marginTop: 'auto',

    flex: 0.2,
    justifyContent: 'space-between',
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

