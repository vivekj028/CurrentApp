import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import Home from './screens/Home';
import LoginScreen from './screens/LoginScreen';
import ForgotPassword from './screens/ForgotPassword';
import SignUp from './screens/SignUp';
import SplashScreen from './screens/SplashScreen';
import Dashboard from './screens/Dashboard';
import Notification from './screens/Notification';
import Gallery from './screens/Gallery';
import ProductDetails from './screens/ProductDetails';
import Canteen from './screens/Canteen';
import CartScreen from './screens/CartScreen';
import Cart from './screens/Cart';
import DrawerContent from './screens/DrawerContent';
import Payment from './screens/Payment';
import OrderCompleted from './screens/OrderCompleted';
import Shop from './screens/Shop';
import UniformScreen from './screens/UniformScreen';
import SupplierProductsScreen from './screens/SupplierProductsScreen';
import CartIcon from './screens/CartIcon';
import { RootStackParamList } from './screens/types';
import { CartProvider } from './screens/CartContext';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerComponent = () => (
  <Drawer.Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    screenOptions={{
      headerStyle: {
        backgroundColor: '#bd2323',
      },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    }}
  >
    <Drawer.Screen
      name="Dashboards"
      component={Dashboard}
      options={{ headerShown: true }}
    />
    <Drawer.Screen
      name="Notification"
      component={Notification}
      options={{ headerShown: true }}
    />
    <Drawer.Screen
      name="Gallery"
      component={Gallery}
      options={{ headerShown: true }}
    />
    <Drawer.Screen
      name="Canteen"
      component={Canteen}
      options={{ headerShown: true }}
    />
    <Drawer.Screen
      name="Shop"
      component={Shop}
      options={{ headerShown: true }}
    />
  </Drawer.Navigator>
);

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
    <NavigationContainer>
      {isSplashVisible ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#bd2323',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DrawerComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notification"
            component={Notification}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Gallery"
            component={Gallery}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Canteen"
            component={Canteen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="OrderCompleted"
            component={OrderCompleted}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Uniform"
            component={UniformScreen}
            options={{ headerShown: true, headerRight: () => <CartIcon /> }}
          />
          <Stack.Screen
            name="SupplierProducts"
            component={SupplierProductsScreen}
            options={{ headerShown: true, headerRight: () => <CartIcon />  }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </CartProvider>
  );
}

export default App;


// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import Home from './screens/Home';
// import LoginScreen from './screens/LoginScreen';
// import ForgotPassword from './screens/ForgotPassword';
// import SignUp from './screens/SignUp';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import Notification from './screens/Notification';
// import Gallery from './screens/Gallery';
// import ProductDetails from './screens/ProductDetails';
// import Canteen from './screens/Canteen';
// import Cart from './screens/Cart';
// import DrawerContent from './screens/DrawerContent';
// import Payment from './screens/Payment';
// import OrderCompleted from './screens/OrderCompleted';
// import Shop from './screens/Shop';
// import UniformScreen from './screens/UniformScreen';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// const DrawerComponent = () => (
//   <Drawer.Navigator
//     drawerContent={(props) => <DrawerContent {...props} />}
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#bd2323',
//       },
//       headerTintColor: '#fff',
//       headerTitleAlign: 'center',
//     }}
//   >
//     <Drawer.Screen
//       name="Dashboards"
//       component={Dashboard}
//       options={{ headerShown: true }}
//     />
//     <Drawer.Screen
//       name="Notification"
//       component={Notification}
//       options={{ headerShown: true }}
//     />
//     <Drawer.Screen
//       name="Gallery"
//       component={Gallery}
//       options={{ headerShown: true }}
//     />
//     <Drawer.Screen
//       name="Canteens"
//       component={Canteen}
//       options={{ headerShown: true }}
//     />
//     <Drawer.Screen
//       name="Shop"
//       component={Shop}
//       options={{ headerShown: true }}
//     />
//   </Drawer.Navigator>
// );

// function App() {
//   const [isSplashVisible, setIsSplashVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsSplashVisible(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <NavigationContainer>
//       {isSplashVisible ? (
//         <Stack.Navigator>
//           <Stack.Screen
//             name="SplashScreen"
//             component={SplashScreen}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       ) : (
//         <Stack.Navigator
//           screenOptions={{
//             headerStyle: {
//               backgroundColor: '#bd2323',
//             },
//             headerTintColor: '#fff',
//             headerTitleAlign: 'center',
//           }}
//         >
//           <Stack.Screen
//             name="LoginScreen"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="ForgotPassword"
//             component={ForgotPassword}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Dashboard"
//             component={DrawerComponent}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Home"
//             component={Home}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Notification"
//             component={Notification}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="Gallery"
//             component={Gallery}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="ProductDetails"
//             component={ProductDetails}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="Canteen"
//             component={Canteen}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="Cart"
//             component={Cart}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="Payment"
//             component={Payment}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="Order Completed"
//             component={OrderCompleted}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Uniform"
//             component={UniformScreen}
//             options={{ headerShown: true}}
//           />
//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// }

// export default App;



// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import Home from './screens/Home';
// import LoginScreen from './screens/LoginScreen';
// import ForgotPassword from './screens/ForgotPassword';
// import SignUp from './screens/SignUp';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import Notification from './screens/Notification';
// import Gallery from './screens/Gallery';
// import ProductDetails from './screens/ProductDetails';
// import Canteen from './screens/Canteen';
// import Cart from './screens/Cart.js';
// import DrawerContent from './screens/DrawerContent.js';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// const DrawerComponent = () => (
//   <Drawer.Navigator
//     drawerContent={(props) => <DrawerContent {...props} />}
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: '#bd2323',
//       },
//       headerTintColor: '#fff',
//       headerTitleAlign: 'center',
//     }}
//   >
//     <Drawer.Screen
//       name="Dashboards"
//       component={Dashboard}
//       options={{ headerShown: true }}
//     />
//     <Drawer.Screen
//       name="Notification"
//       component={Notification}
//       options={{ headerShown: true }}
//     />
//     <Drawer.Screen
//       name="Gallery"
//       component={Gallery}
//       options={{ headerShown: true }}
//     />
//     <Drawer.Screen
//       name="Home"
//       component={Home}
//       options={{ headerShown: false }}
//     />
//     <Drawer.Screen
//       name="Canteen"
//       component={Canteen}
//       options={{ headerShown: true }}
//     />
//   </Drawer.Navigator>
// );

// function App() {
//   const [isSplashVisible, setIsSplashVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsSplashVisible(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <NavigationContainer>
//       {isSplashVisible ? (
//         <Stack.Navigator>
//           <Stack.Screen
//             name="SplashScreen"
//             component={SplashScreen}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       ) : (
//         <Stack.Navigator
//           screenOptions={{
//             headerStyle: {
//               backgroundColor: '#bd2323',
//             },
//             headerTintColor: '#fff',
//             headerTitleAlign: 'center',
//           }}
//         >
//           <Stack.Screen
//             name="LoginScreen"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="ForgotPassword"
//             component={ForgotPassword}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Dashboard"
//             component={DrawerComponent}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Home"
//             component={Home}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Notification"
//             component={Notification}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="Gallery"
//             component={Gallery}
//             options={{
//               headerShown: true,
//             }}
//           />
//           <Stack.Screen
//             name="ProductDetails"
//             component={ProductDetails}
//             options={{ headerShown: true }}
//           />

//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// }

// export default App;


// import 'react-native-gesture-handler';
// import React, {useEffect, useState} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {
//   DrawerToggleButton,
//   createDrawerNavigator,
// } from '@react-navigation/drawer';

// import Home from './screens/Home';
// import LoginScreen from './screens/LoginScreen';
// import ForgotPassword from './screens/ForgotPassword';
// import SignUp from './screens/SignUp';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import Notification from './screens/Notification';
// import Gallery from './screens/Gallery';
// import ProductDetails from './screens/ProductDetails';
// import DrawerContent from './screens/DrawerContent.js';


// const Drawers = createDrawerNavigator();

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// const DrawerComponent = () => (
//   <Drawer.Navigator
//   drawerContent={(props) => <DrawerContent {...props} />}
//   screenOptions={{
//     headerStyle: {
//       backgroundColor: '#bd2323',
//     },
//     headerTintColor: '#fff',
//     headerTitleAlign: 'center',
//   }}
//   >
//     <Drawer.Screen
//       name="Dashboards"
//       component={Dashboard}
//       options={{headerShown: true}}
//     />
//     <Drawer.Screen
//       name="Notification"
//       component={Notification}
//       options={{headerShown: true}}
//     />
//     <Drawer.Screen
//       name="Gallery"
//       component={Gallery}
//       options={{headerShown: true}}
//     />
//     <Drawer.Screen
//       name="Home"
//       component={Home}
//       options={{headerShown: false}}
//     />
//   </Drawer.Navigator>
// );

// function App() {
//   const [isSplashVisible, setIsSplashVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsSplashVisible(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <NavigationContainer>
//       {isSplashVisible ? (
//         <Stack.Navigator>
//           <Stack.Screen
//             name="SplashScreen"
//             component={SplashScreen}
//             options={{headerShown: false}}
//           />
//         </Stack.Navigator>
//       ) : (
//         <Stack.Navigator
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: '#bd2323',
//           },
//           headerTintColor: '#fff',
//           headerTitleAlign: 'center',
//         }}
//         >
//           <Stack.Screen
//             name="LoginScreen"
//             component={LoginScreen}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="ForgotPassword"
//             component={ForgotPassword}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Dashboard"
//             component={DrawerComponent}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Home"
//             component={Home}
//             options={{headerShown: false}}
//           />
//           <Stack.Screen
//             name="Notification"
//             component={Notification}
//             options={{headerShown: true}}
//           />
//           <Stack.Screen
//             name="Gallery"
//             component={Gallery}
//             options={{
//               headerShown: true
//             }}
//           />
//           <Stack.Screen
//             name="ProductDetails"
//             component={ProductDetails}
//             options={{headerShown: true}}
//           />
//         </Stack.Navigator>
//       )}
//     </NavigationContainer>
//   );
// }

// export default App;

// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import Home from './screens/Home';
// import LoginScreen from './screens/LoginScreen';
// import ForgotPassword from './screens/ForgotPassword';
// import SignUp from './screens/SignUp';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import Notification1 from './screens/Notification1'
// import Notification2 from './screens/Notification2'
// import Notification3 from './screens/Notification3'
// import Notification from './screens/Notification';
// import Gallery from './screens/Gallery';
// import ProductDetails from './screens/ProductDetails';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function App(){

//   const [isSplashVisible, setIsSplashVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsSplashVisible(false);
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   return(
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName='LoginScreen'>
//       {isSplashVisible ? (
//           <Drawer.Screen
//             name='SplashScreen'
//             component={SplashScreen}
//             options={{ headerShown: false }} // Hide the header for splash screen
//           />
//         ) : (
//           <>
//       <Drawer.Screen
//         name='LoginScreen'
//         component={LoginScreen}
//         options={{
//           headerShown: false
//         }}
//         />
//         <Drawer.Screen
//         name='Home'
//         component={Home}
//         options={{
//           headerShown: false
//         }}
//         />
//         <Drawer.Screen
//         name='ForgotPassword'
//         component={ForgotPassword}
//         options={{
//           headerShown: false
//         }}
//         />
//         <Drawer.Screen
//         name='SignUp'
//         component={SignUp}
//         options={{
//           headerShown: false
//         }}
//         />
//         <Drawer.Screen
//         name='Dashboard'
//         component={Dashboard}
//         options={{
//           headerShown: true
//         }}
//         />
//         {/* <Drawer.Screen
//         name='Notification1'
//         component={Notification1}
//         options={{
//           headerShown: false
//         }}
//         />
//         <Drawer.Screen
//         name='Notification2'
//         component={Notification2}
//         options={{
//           headerShown: false
//         }}
//         />
//         <Drawer.Screen
//         name='Notification3'
//         component={Notification3}
//         options={{
//           headerShown: false
//         }}
//         /> */}
//         <Drawer.Screen
//         name='Gallery'
//         component={Gallery}
//         options={{
//           headerShown: true
//         }}
//         />
//         <Drawer.Screen
//         name='Notification'
//         component={Notification}
//         options={{
//           headerShown: true
//         }}
//         />
//         <Drawer.Screen
//         name='ProductDetails'
//         component={ProductDetails}
//         options={{
//           headerShown: true
//         }}
//         />
//          </>
//         )}
//       </Drawer.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App;

// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// import Home from './screens/Home';
// import LoginScreen from './screens/LoginScreen';
// import ForgotPassword from './screens/ForgotPassword';
// import SignUp from './screens/SignUp';
// import SplashScreen from './screens/SplashScreen';
// import Dashboard from './screens/Dashboard';
// import Sidebar from './screens/Sidebar'

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function App() {
//   const [isSplashVisible, setIsSplashVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsSplashVisible(false);
//     }, 3000); // 3000 milliseconds = 3 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <NavigationContainer>
//       {isSplashVisible ? (
//         <Stack.Navigator>
//           <Drawer.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
//         </Stack.Navigator>
//       ) : (
//         <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
//           <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
//           <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
//           <Drawer.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
//           <Drawer.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
//           <Drawer.Screen name="Dashboard" component={Dashboard} />
//         </Drawer.Navigator>
//       )}
//     </NavigationContainer>
//   );
// }

// export default App;

// import React, { useEffect } from 'react';
// import { Dynatrace, DataCollectionLevel, UserPrivacyOptions } from '@dynatrace/react-native-plugin';

// // ... other imports for your App.js

// let privacyConfig = new UserPrivacyOptions(DataCollectionLevel.UserBehavior, true); // Placeholder for user consent

// // Initialize Dynatrace RUM with privacy configuration (optional)
// useEffect(() => {
//   Dynatrace.applyUserPrivacyOptions(privacyConfig);
// }, []);

// function App() {
//   return (
//     <LoginScreen /> // Or <Home /> based on your logic
//   );
// }

// export default App;

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './LoginScreen';
// import HomeScreen from './Home';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Drawer.Screen name="Login" component={LoginScreen} />
//         <Drawer.Screen name="Home" component={HomeScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;
