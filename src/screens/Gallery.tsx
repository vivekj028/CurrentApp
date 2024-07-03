import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

interface Product {
  id: number;
  title: string;
  brand: string;
  category: string;
  stock: number;
  thumbnail: string;
  images: string[];
}

type RootStackParamList = {
  Gallery: undefined;
  ProductDetails: { product: Product };
};

type GalleryScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Gallery'>['navigation'];
type GalleryScreenRouteProp = RouteProp<RootStackParamList, 'Gallery'>;

interface Props {
  navigation: GalleryScreenNavigationProp;
  route: GalleryScreenRouteProp;
}

const Gallery: React.FC<Props> = ({ navigation }) => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getApiData = async () => {
    try {
      const url = "https://dummyjson.com/products";
      let result = await fetch(url);
      const json = await result.json();
      setData(json.products); // Adjust according to the API response structure
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    getApiData();
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.imageCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.imageImage}
          resizeMode="cover"
        />
        <View style={styles.imageCountContainer}>
          <Text style={styles.imageCountText}>{item.images.length}</Text>
        </View>
      </View>
      <View style={styles.imageContent}>
        <Text style={styles.imageTitle}>{item.title}</Text>
        <Text style={styles.imageTime}>{item.stock} days ago</Text>
        <Text style={styles.imageName}>{item.brand} {item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? ( // Conditionally render ActivityIndicator
        <ActivityIndicator size="large" color="#0000ff" /> // Loading indicator
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 1,
    paddingTop: 2,
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
  imageContainer: {
    position: 'relative',
  },
  imageImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  imageCountContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  imageCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageContent: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: '#d3d3d3', // Set grey background color
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  imageTitle: {
    fontSize: 12,
    marginBottom: 0,
    color: 'black',
    fontFamily: 'WorkSans-300',
  },
  imageTime: {
    fontSize: 8,
    marginBottom: 0,
    color: 'black',
    fontFamily: 'WorkSans-300',
  },
  imageName: {
    fontSize: 10,
    marginBottom: 0,
    color: 'black',
    fontFamily: 'WorkSans-300',
  },
  flatListContentContainer: {
    paddingBottom: 10,
  },
});

export default Gallery;


// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
// // import { StackNavigationProp } from '@react-navigation/stack';
// import type { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RouteProp } from '@react-navigation/native';

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
//   ProductDetails: { product: Product };
// };

// type GalleryScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;
// type GalleryScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

// interface Props {
//   navigation: GalleryScreenNavigationProp;
// }

// const Gallery: React.FC<Props> = ({ navigation }) => {
//   const [data, setData] = React.useState<Product[]>([]);
//   const [loading, setLoading] = React.useState(true);

//   const getApiData = async () => {
//     try {
//       const url = "https://dummyjson.com/products";
//       let result = await fetch(url);
//       const json = await result.json();
//       setData(json.products); // Adjust according to the API response structure
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false); // Set loading to false after data is fetched
//     }
//   };

//   useEffect(() => {
//     getApiData();
//     navigation.setOptions({ headerShown: true });
//   }, [navigation]);

//   const renderItem = ({ item }: { item: Product }) => (
//     <TouchableOpacity
//       style={styles.imageCard}
//       onPress={() => navigation.navigate('ProductDetails', { product: item })}
//     >
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: item.thumbnail }}
//           style={styles.imageImage}
//           resizeMode="cover"
//         />
//         <View style={styles.imageCountContainer}>
//           <Text style={styles.imageCountText}>{item.images.length}</Text>
//         </View>
//       </View>
//       <View style={styles.imageContent}>
//         <Text style={styles.imageTitle}>{item.title}</Text>
//         <Text style={styles.imageTime}>{item.stock} days ago</Text>
//         <Text style={styles.imageName}>{item.brand} {item.category}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? ( // Conditionally render ActivityIndicator
//         <ActivityIndicator size="large" color="#0000ff" /> // Loading indicator
//       ) : (
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           contentContainerStyle={styles.flatListContentContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 1,
//     paddingTop: 2,
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
//   imageContainer: {
//     position: 'relative',
//   },
//   imageImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//   },
//   imageCountContainer: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     borderRadius: 12,
//     paddingVertical: 2,
//     paddingHorizontal: 5,
//   },
//   imageCountText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   imageContent: {
//     alignItems: 'flex-start',
//     paddingHorizontal: 10,
//     backgroundColor: '#d3d3d3', // Set grey background color
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//   },
//   imageTitle: {
//     fontSize: 12,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
//   imageTime: {
//     fontSize: 8,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
//   imageName: {
//     fontSize: 10,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
//   flatListContentContainer: {
//     paddingBottom: 10,
//   },
// });

// export default Gallery;


// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

// const Gallery = ({ navigation }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getApiData = async () => {
//     try {
//       const url = "https://dummyjson.com/products";
//       let result = await fetch(url);
//       result = await result.json();
//       setData(result.products); // Adjust according to the API response structure
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false); // Step 2: Set loading to false after data is fetched
//     }
//   };

//   useEffect(() => {
//     getApiData();
//     navigation.setOptions({ headerShown: true });
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.imageCard}
//       onPress={() => navigation.navigate('ProductDetails', { product: item })}
//     >
//       <View style={styles.imageContainer}>
//         <Image
//           source={{ uri: item.thumbnail }}
//           style={styles.imageImage}
//           resizeMode="cover"
//         />
//         <View style={styles.imageCountContainer}>
//           <Text style={styles.imageCountText}>{item.images.length}</Text>
//         </View>
//       </View>
//       <View style={styles.imageContent}>
//         <Text style={styles.imageTitle}>{item.title}</Text>
//         <Text style={styles.imageTime}>{item.stock} days ago</Text>
//         <Text style={styles.imageName}>{item.brand} {item.category}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       {loading ? ( // Step 3: Conditionally render ActivityIndicator
//         <ActivityIndicator size="large" color="#0000ff" /> // Loading indicator
//       ) : (
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           contentContainerStyle={styles.flatListContentContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 1,
//     paddingTop: 2,
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
//   imageContainer: {
//     position: 'relative',
//   },
//   imageImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//   },
//   imageCountContainer: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     borderRadius: 12,
//     paddingVertical: 2,
//     paddingHorizontal: 5,
//   },
//   imageCountText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   imageContent: {
//     alignItems: 'flex-start',
//     paddingHorizontal: 10,
//     backgroundColor: '#d3d3d3', // Set grey background color
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//   },
//   imageTitle: {
//     fontSize: 12,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
//   imageTime: {
//     fontSize: 8,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
//   imageName: {
//     fontSize: 10,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
// });

// export default Gallery;



// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

// const Gallery = ({ navigation }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

// //   const getApiData = async () => {
// //     const url = "https://dummyjson.com/products";
// //     let result = await fetch(url);
// //     result = await result.json();
// //     setData(result.products); // Adjust according to the API response structure
// //   };
// const getApiData = async () => {
//     try {
//       const url = "https://dummyjson.com/products";
//       let result = await fetch(url);
//       result = await result.json();
//       setData(result.products); // Adjust according to the API response structure
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false); // Step 2: Set loading to false after data is fetched
//     }
//   };

//   useEffect(() => {
//     getApiData();
//   }, []);

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.imageCard}
//       onPress={() => navigation.navigate('ProductDetails', { product: item })}
//     >
//       <Image
//         source={{ uri: item.thumbnail }}
//         style={styles.imageImage}
//         resizeMode="cover"
//       />
//       <View style={styles.imageCountContainer}>
//           <Text style={styles.imageCountText}>{item.images.length}</Text>
//         </View>
//       <View style={styles.imageContent}>
//         <Text style={styles.imageTitle}>{item.title}</Text>
//         <Text style={styles.imageTime}>{item.stock} days ago</Text>
//         <Text style={styles.imageName}>{item.brand} {item.category}</Text>
//       </View>
      
//     </TouchableOpacity>
//   );

//   return (
//     // <FlatList
//     //   data={data}
//     //   renderItem={renderItem}
//     //   keyExtractor={item => item.id.toString()}
//     //   numColumns={2}
//     //   contentContainerStyle={styles.container}
//     // />
//     <View style={styles.container}>
//       {loading ? ( // Step 3: Conditionally render ActivityIndicator
//         <ActivityIndicator size="large" color="#0000ff" /> // Loading indicator
//       ) : (
//         <FlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={item => item.id.toString()}
//           numColumns={2}
//           contentContainerStyle={styles.flatListContentContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 1,
//     paddingTop: 2,
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
//   imageImage: {
//     width: '100%',
//     height: 150,
//     borderRadius: 8,
//   },
//   imageCountContainer: {
//     position: 'absolute',
//     bottom: 5,
//     right: 5,
//     backgroundColor: 'red',
//     borderRadius: 12,
//     paddingVertical: 2,
//     paddingHorizontal: 5,
//   },
//   imageCountText: {
//     color: 'black',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   imageContent: {
//     alignItems: 'left',
//     paddingHorizontal: 10,
//     backgroundColor: '#d3d3d3', 
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//   },
//   imageTitle: {
//     fontSize: 12,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
//   imageTime: {
//     fontSize: 8,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
//   imageName: {
//     fontSize: 10,
//     marginBottom: 0,
//     color: 'black',
//     fontFamily: 'WorkSans-300',
//   },
// });

// export default Gallery;


// import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';

// const Gallery = () => {
//   const [data, setData] = useState([]);

//   const getApiData = async () => {
//     const url = "https://jsonplaceholder.typicode.com/photos?_limit=50";
//     let result = await fetch(url);
//     result = await result.json();
//     setData(result);
//   };

//   useEffect(() => {
//     getApiData();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.notificationCard}>
//       <Image
//         source={{ uri: item.url }} // Use URI for network images
//         style={styles.notificationImage}
//         resizeMode="cover"
//       />
//       <View style={styles.notificationContent}>
//         <Text style={styles.notificationTitle}>Image {item.id}</Text>
//         {/* <Text style={styles.notificationDescription}>{item.title}</Text> */}
//       </View>
//     </View>
//   );

//   return (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={item => item.id.toString()}
//       numColumns={2}
//       contentContainerStyle={styles.container}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 1,
//     paddingTop: 25,
//   },
//   notificationCard: {
//     flex: 1,
//     backgroundColor: '#fff', // White background for the card
//     borderRadius: 8, // Add rounded corners for a softer look
//     shadowColor: '#000', // Set shadow for depth effect
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5, // Add elevation for a more prominent card
//     margin: 5,
//     padding: 0, // Add some padding for content spacing
//   },
//   notificationImage: {
//     width: '100%', // Make the image fill the card width
//     height: 150, // Adjust image height as needed
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   notificationContent: {
//     alignItems: 'center', // Center content within the card
//   },
//   notificationTitle: {
//     fontSize: 14,
//     marginBottom: 5,
//     color: 'black',
//     fontFamily: 'WorkSans-Regular',
//   },
//   notificationDescription: {
//     fontSize: 14,
//     color: '#555555',
//   },
// });

// export default Gallery;