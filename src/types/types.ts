import { ParamListBase } from '@react-navigation/native';
export type DrawerParamList = {
  Shop: undefined;
  Dashboard: undefined;
  Notification: undefined;
  Gallery: undefined;
  Canteens: undefined;
};

export type RootStackParamList =  ParamListBase & {
  SplashScreen: undefined;
  LoginScreen: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Dashboard: undefined;
  Home: undefined;
  Notification: undefined;
  Gallery: undefined;
  ProductDetails: { product: Products };
  Canteen: string;
  Cart: undefined;
  CartScreen: undefined;
  Payment: {
    total: number;
    walletBalance: number;
    orderNumber: string;
    orderDate: string;
    transactionId: string;
  };
  OrderCompleted: {
    orderNumber: string;
    orderDate: string;
    total: number;
    transactionId: string;
  };
  Shop: undefined;
  Uniform: undefined;
  SupplierProducts: { supplier: Supplier };
  Notification1: undefined;
  Notification2: undefined;
  Notification3: undefined;
};

export type Supplier = {
  name: string;
  icon: string;
  address: string;
  products: Product[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
};

export interface Products {
  id: number;
  title: string;
  brand: string;
  category: string;
  stock: number;
  thumbnail: string;
  images: string[];
}

export type Option = {
  name: string;
  icon: string;
  caption: string;
};

export type MenuOption = {
  id: number;
  name: string;
  price: string;
};

export type CanteenSection = {
  title: string;
  data: MenuOption[];
};

export type CanteenProduct = {
  id: number;
  name: string;
  price: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: string;
};

export type CartItems = {
  id: string;
  name: string;
  price: string;
};

export type Notification = {
  title: string;
  imageUrl: any; // Using 'any' for image imports. For stricter typing, we can use the type 'ImageSourcePropType'.
  description: string;
  screenName?: keyof RootStackParamList; 
};
