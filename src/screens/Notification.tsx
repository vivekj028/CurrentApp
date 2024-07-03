import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

interface NotificationItem {
  id: number;
  url: string;
  title: string;
}

const Notification: React.FC = () => {
  const [data, setData] = useState<NotificationItem[]>([]);

  const getApiData = async () => {
    const url = "https://jsonplaceholder.typicode.com/photos?_limit=50";
    let response: Response = await fetch(url);
    const result: NotificationItem[] = await response.json(); // Extract data as NotificationItem[]
    setData(result);
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.length ? (
        data.map((item: NotificationItem) => (
          <View key={item.id} style={styles.notificationCard}>
            <Image
              source={{ uri: item.url }} // Use URI for network images
              style={styles.notificationImage}
              resizeMode="cover"
            />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Notification {item.id}</Text>
              <Text style={styles.notificationDescription}>{item.title}</Text>
            </View>
          </View>
        ))
      ) : (
        null
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notificationCard: {
    backgroundColor: '#fff', // White background for the card
    borderRadius: 8, // Add rounded corners for a softer look
    shadowColor: '#000', // Set shadow for depth effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Add elevation for a more prominent card
    marginBottom: 20,
    padding: 15, // Add some padding for content spacing
    width: 350,
  },
  notificationImage: {
    width: '100%', // Make the image fill the card width
    height: 150, // Adjust image height as needed
    marginBottom: 10,
  },
  notificationContent: {
    alignItems: 'center', // Center content within the card
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#555555',
  },
});

export default Notification;


// import { View, Text,Image, StyleSheet } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { ScrollView } from 'react-native-gesture-handler';

// const Notification = () => {

//     const [data,setData] = useState([]);

//     const getApiData = async ()=>{
//         const url = "https://jsonplaceholder.typicode.com/photos?_limit=50"
//         let result = await fetch(url);
//         result = await result.json();
//         setData(result);
//     }

//     useEffect(()=>{
//         getApiData();
//     },[data])

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {data.length ?
//       data.map(item=>(<View style={styles.notificationCard}>
//             <Image
//                 source={{ uri: item.url }} // Use URI for network images
//                 style={styles.notificationImage}
//                 resizeMode="cover"
//                 key={item.id}
//             />
//             <View style={styles.notificationContent}>
//               <Text style={styles.notificationTitle}>Notification {item.id}</Text>
//               <Text style={styles.notificationDescription}>{item.title}</Text>
//             </View>
        
        
//       </View>
//       ))
//       :
//       null

//       }
//     </ScrollView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   notificationCard: {
//     backgroundColor: '#fff', // White background for the card
//     borderRadius: 8, // Add rounded corners for a softer look
//     shadowColor: '#000', // Set shadow for depth effect
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5, // Add elevation for a more prominent card
//     marginBottom: 20,
//     padding: 15, // Add some padding for content spacing
//     width: 350,
//   },
//   notificationImage: {
//     width: '100%', // Make the image fill the card width
//     height: 150, // Adjust image height as needed
//     marginBottom: 10,
//   },
//   notificationContent: {
//     alignItems: 'center', // Center content within the card
//   },
//   notificationTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'black',
//   },
//   notificationDescription: {
//     fontSize: 14,
//     color: '#555555',
//   },
//   });

// export default Notification;