import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

// interface Product {
//   id: number;
//   title: string;
//   brand: string;
//   category: string;
//   stock: number;
//   thumbnail: string;
//   images: string[];
// }

// type RootStackParamList = {
//   ProductDetails: { product: Products };
// };

type ProductDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const ProductDetails: React.FC<ProductDetailsScreenProps> = ({ route, navigation }) => {
  const { product } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      style={styles.imageCard}
      onPress={() => openModal(index)}
    >
      <Image
        source={{ uri: item }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const images = product.images.map(image => ({ url: image }));

  return (
    <View style={styles.container}>
      <Text style={styles.album}>Album Name</Text>
      <Text style={styles.title}>{product.title}</Text>
      <FlatList
        data={product.images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.imagesContainer}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <ImageViewer
          imageUrls={images}
          index={selectedIndex}
          onSwipeDown={closeModal}
          enableSwipeDown={true}
          onCancel={closeModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 5,
    padding: 0,
  },
  title: {
    fontFamily: 'WorkSans-300',
    marginBottom: 16,
    textAlign: 'left',
    color: 'black',
  },
  album: {
    color: 'red',
    fontFamily: 'WorkSans-300',
  },
  imagesContainer: {
    position: 'relative',
  },
  image: {
    height: 150,
    margin: 8,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetails;


// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
// import ImageViewer from 'react-native-image-zoom-viewer';

// const ProductDetails = ({ route, navigation }) => {
//   const { product } = route.params;
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   useEffect(() => {
//     navigation.setOptions({ headerShown: true });
//   }, []);

//   const openModal = (index) => {
//     setSelectedIndex(index);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const renderItem = ({ item, index }) => (
//     <TouchableOpacity 
//       style={styles.imageCard}
//       onPress={() => openModal(index)}>
//       <Image
//         source={{ uri: item }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//     </TouchableOpacity>
//   );

//   const images = product.images.map(image => ({ url: image }));

//   return (
//     <View style={styles.container}>
//       <Text style={styles.album}>Album Name</Text>
//       <Text style={styles.title}>{product.title}</Text>
//       <FlatList
//         data={product.images}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.imagesContainer}
//       />

//       <Modal
//         visible={modalVisible}
//         transparent={true}
//         onRequestClose={closeModal}
//       >
//         <ImageViewer
//           imageUrls={images}
//           index={selectedIndex}
//           onSwipeDown={closeModal}
//           enableSwipeDown={true}
//           onCancel={closeModal}
//         />
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   imageCard: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     margin: 5,
//     padding: 0,
//   },
//   title: {
//     fontFamily: 'WorkSans-300',
//     marginBottom: 16,
//     textAlign: 'left',
//     color: 'black',
//   },
//   album: {
//     color: 'red',
//     fontFamily: 'WorkSans-300',
//   },
//   imagesContainer: {
//     position: 'relative',
//   },
//   image: {
//     height: 150,
//     margin: 8,
//     borderRadius: 8,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default ProductDetails;



// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

// const ProductDetails = ({ route, navigation }) => {
//   const { product } = route.params;
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     navigation.setOptions({ headerShown: true });
//   }, []);

//   const openModal = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//     setModalVisible(false);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity 
//     style={styles.imageCard}
//     onPress={() => openModal(item)}>
//       <Image
//         source={{ uri: item }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.album}>Album Name</Text>
//       <Text style={styles.title}>{product.title}</Text>
//       <FlatList
//         data={product.images}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.imagesContainer}
//       />

//       {selectedImage && (
//         <Modal
//           visible={modalVisible}
//           transparent={true}
//           onRequestClose={closeModal}
//         >
//           <TouchableWithoutFeedback onPress={closeModal}>
//             <View style={styles.modalBackground}>
//               <Image
//                 source={{ uri: selectedImage }}
//                 style={styles.fullImage}
//                 resizeMode="contain"
//               />
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   imageCard: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     margin: 5,
//     padding: 0, 
//   },
//   title: {
//     fontFamily : 'WorkSans-300',
//     marginBottom: 16,
//     textAlign: 'left',
//     color: 'black',
//   },
//   album :{
//     color: 'red',
//     fontFamily : 'WorkSans-300',
//   },
//   imagesContainer: {
//     position: 'relative',
//   },
//   image: {

//     height: 150,
//     margin: 8,
//     borderRadius: 8,
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   fullImage: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default ProductDetails;



// import React from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// const ProductDetails = ({ route }) => {
//   const { product } = route.params;

//   const renderItem = ({ item }) => (
//     <TouchableOpacity onPress={() => console.log(item)}>
//       <Image
//         source={{ uri: item }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{product.title}</Text>
//       <FlatList
//         data={product.images}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         contentContainerStyle={styles.imagesContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//     color: 'red',
//   },
//   imagesContainer: {
//     alignItems: 'center',
//   },
//   image: {
//     width: 150,
//     height: 150,
//     margin: 8,
//     borderRadius: 8,
//   },
// });

// export default ProductDetails;