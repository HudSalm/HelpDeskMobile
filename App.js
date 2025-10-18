import 'react-native-gesture-handler';
import React, { useState, useEffect, Profiler } from 'react';
import { View, StyleSheet } from 'react-native';
import { supabase } from './lib/supabase';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import Account from '@/app/Screens/Mycalls/Mycalls';
import LoginScreen from '@/app/Screens/LoginScreen/LoginScreen';
import SignUpScreen from '@/app/Screens/SignUpScreen/SignUpScreen';
import RecoverPassword from '@/app/RecoverPassword/RecoverPassword';
import UpdatePassword from '@/app/Screens/UpdatePassword/UpdatePassword';
import RegisterCall from '@/app/Screens/RegisterCall/RegisterCall';
import CallsReceived from '@/app/Screens/CallsReceived/CallsReceived';
import UpdateCalls from '@/app/Screens/UpdateCalls/UpdateCalls';
import Profile from '@/app/Screens/Profile/Profile';
import UpdateInfo from '@/app/Screens/UpdateInfo/UpdateInfo';
import UpdateEmail from '@/app/Screens/UpdateInfo/UpdateEmail';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#21bd5aff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#121212' },
      }}
    >
      <Tab.Screen
        name="Histórico"
        component={Account}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="history" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chamados"
        component={CallsReceived}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="customer-service" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Meu Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="customer-service" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#090808ff' },
          headerTitle: '',
          headerTintColor: '#e7e1e1ff',
        }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPassword}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#090808ff' },
          headerTitle: '',
          headerTintColor: '#e7e1e1ff',
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterCall"
        component={RegisterCall}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#090808ff' },
          headerTitle: '',
          headerTintColor: '#e7e1e1ff',
        }}
      />
      <Stack.Screen
        name="UpdateCalls"
        component={UpdateCalls}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#090808ff' },
          headerTitle: '',
          headerTintColor: '#e7e1e1ff',
        }}
      />
      <Stack.Screen
        name="UpdateInfo"
        component={UpdateInfo}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#090808ff' },
          headerTitle: '',
          headerTintColor: '#e7e1e1ff',
        }}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#090808ff' },
          headerTitle: '',
          headerTintColor: '#e7e1e1ff',
        }}
      />
      <Stack.Screen
        name="UpdateEmail"
        component={UpdateEmail}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: '#090808ff' },
          headerTitle: '',
          headerTintColor: '#e7e1e1ff',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  //Estado "persistente" para o modo de recuperação
  const [recoveryMode, setRecoveryMode] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        //Lógica para o modo de recuperação
        if (event === 'PASSWORD_RECOVERY') {
          setRecoveryMode(true); // "Liga" o modo de recuperação
        } else if (event === 'SIGNED_OUT') {
          setRecoveryMode(false); // "Desliga" ao fazer logout
        }

        setSession(session);
        setLoading(false);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <View style={styles.container} />;
  }

  let screenToRender;
  if (recoveryMode && session) {
    screenToRender = <UpdatePassword />;
  } else if (session && session.user) {
    screenToRender = <AppStack />;
  } else {
    screenToRender = <AuthStack />;
  }

  return <NavigationContainer>{screenToRender}</NavigationContainer>;
}
