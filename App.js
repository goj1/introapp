import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [flatListRef, setFlatListRef] = useState(null)
  const [index, setIndex] = useState(0)
  const [lista, setLista] = useState([
    {texto: 'texto 1'},
    {texto: 'texto 2'},
    {texto: 'texto 3'},
  ]);
  const scrollX = useRef(new Animated.Value(0)).current;

  const {width: windowWidth} = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={(thisFlatList) => setFlatListRef(thisFlatList)}
        data={lista}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={
          Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={1}
        renderItem={({item}) => (
          <View style={{width: windowWidth, height: 250}} key={item.texto}>
            <Text style={styles.infoText}>
              {item.texto}
            </Text>
          </View>
        )}

      />

      <View style={{width: windowWidth, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'space-between'}}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            if (index > 0) {
              let newIndex = index - 1
              setIndex(newIndex)
              flatListRef.scrollToIndex({animated: true, index: newIndex})
            }
          }}>
          <Text>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => {
            if (index < (lista.length - 1)) {
              let newIndex = index + 1
              setIndex(newIndex)
              flatListRef.scrollToIndex({animated: true, index: newIndex})
            }
          }}>
          <Text>Avançar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    textAlign: 'center',
    color: 'rgba(0,0,0, 0.7)',
    fontSize: 36,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: 'silver',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botao: {
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});

export default App;
