import { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { TemplateList } from '../../../components/templates/template-list';
import { ScreenTitle } from '@/components/ui/screen-title';
import { CreateTemplateScreen } from '@/components/templates/creator/main-screen';

export default function TemplatesScreen() {
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const createAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isCreatingTemplate) {
      createAnimation.setValue(0);
      return;
    }

    Animated.timing(createAnimation, {
      toValue: 1,
      duration: 280,
      useNativeDriver: true,
    }).start();
  }, [createAnimation, isCreatingTemplate]);

  const translateY = createAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, 0],
  });

  return (
    <View style={styles.root}>
      {!isCreatingTemplate ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <ScreenTitle title="Profile treningowe" description="BIBLIOTEKA TRENINGÓW" />
          <TemplateList onAddTemplate={() => setIsCreatingTemplate(true)} />
        </ScrollView>
      ) : (
        <Animated.View
          style={[
            styles.createScreen,
            {
              opacity: createAnimation,
              transform: [{ translateY }],
            },
          ]}
        >
          <CreateTemplateScreen onClose={() => setIsCreatingTemplate(false)} />
        </Animated.View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  createScreen: {
    flex: 1,
  },
});