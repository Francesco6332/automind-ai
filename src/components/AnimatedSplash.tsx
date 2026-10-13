import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet } from 'react-native';

const LOGO = require('../../assets/splash-logo.png');
const LOGO_ASPECT_RATIO = 1193 / 515;

// Must match app.json so the handoff from the native splash is seamless.
// On Android the logo sits inside a padded square (content is ~58% of 288dp).
const LOGO_WIDTH = Platform.OS === 'android' ? 168 : 280;
export const SPLASH_BACKGROUND = '#101820';

const MIN_VISIBLE_MS = 1200;

type Props = {
  isAppReady: boolean;
  onFinish: () => void;
};

export default function AnimatedSplash({ isAppReady, onFinish }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Gentle pulse while the app is loading
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    const timer = setTimeout(() => setMinTimeElapsed(true), MIN_VISIBLE_MS);
    return () => {
      pulse.stop();
      clearTimeout(timer);
    };
  }, [scale]);

  // Zoom through the logo and fade out to reveal the app
  useEffect(() => {
    if (!isAppReady || !minTimeElapsed) return;
    scale.stopAnimation();
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.4,
        duration: 500,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        delay: 100,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, [isAppReady, minTimeElapsed, scale, opacity, onFinish]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, styles.container, { opacity }]}
      // Hide the native splash only once this identical view is on screen
      onLayout={() => SplashScreen.hideAsync()}
    >
      <Animated.Image
        source={LOGO}
        resizeMode="contain"
        style={[styles.logo, { transform: [{ scale }] }]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SPLASH_BACKGROUND,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH / LOGO_ASPECT_RATIO,
  },
});
