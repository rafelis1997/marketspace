import { useState, useRef, useEffect } from 'react'
import { Image, Text, useTheme, View, VStack } from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions, View as ViewNative } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PhotoType } from '@screens/CreateProduct';
import { api } from '@services/api';

type Carrousel = {
  data: Array<PhotoType> | Array<{ path:string; }>;
}

type PaginationItemProps = {
  index: number;
  backgroundColor: string;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}

export function Carrousel({ data }: Carrousel) {
  const { colors } = useTheme();
  
  const width = Dimensions.get('window').width;

  const progressValue = useSharedValue<number>(0);


  return (
    <VStack flex={1} position="relative">

      <Carousel
        loop
        width={width}
        height={280}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={1000}
        snapEnabled={true}
        pagingEnabled
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ index, item }) => (
            <View
                style={{
                    backgroundColor: colors.red[600],
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Image 
                  w="full" 
                  h="full" 
                  resizeMode='cover' 
                  source={{uri: item.uri ? item.uri : `${api.defaults.baseURL}/images/${item.path}` }} 
                  alt="imagem do produto"
                />
            </View>
        )}
      />
      <View
          position="absolute"
          bottom={1}
          left={0}
          zIndex={10}
          width="full"
          height={data.length === 1 ? 0 : 1}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          alignSelf="center"
      >
          {data.map((item, index) => {
            return (
                <PaginationItem
                    backgroundColor={colors.white}
                    animValue={progressValue}
                    index={index}
                    key={index}
                    length={data.length}
                />
            );
          })}
      </View>
    </VStack>
  );
}

function PaginationItem({ animValue, index, length, backgroundColor }: PaginationItemProps) {
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef<ViewNative>(null);

  const { colors } = useTheme();

  useEffect(() => {
    if (itemRef.current) {
      itemRef.current.measure(
        (left, top, width, height) => {
          setItemWidth(width);
        }
      );
    }
  }, [itemWidth]);

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-itemWidth, 0, itemWidth];

    if (index === 0 && animValue?.value > length - 1) {
        inputRange = [length - 1, length, length + 1];
        outputRange = [-itemWidth, 0, itemWidth];
    }

    return {
      transform: [
        {
          translateX: interpolate(
              animValue?.value,
              inputRange,
              outputRange,
              Extrapolate.CLAMP
          ),
        },
      ],
    };
}, [animValue, index, length, itemWidth]);

  return (
    <ViewNative
      style={{
        backgroundColor: colors.gray[200],
        flex: 1,
        width:"100%",
        height:"100%",
        borderRadius: 4,
        overflow:"hidden",
        marginLeft: 4,
        marginRight: 4,
        opacity: 0.4,
      }}
      ref={itemRef}
    >
        <Animated.View
            style={[
                {
                    borderRadius: 50,
                    backgroundColor,
                    flex: 1,
                },
                animStyle,
            ]}
        />
    </ViewNative>
  );
};