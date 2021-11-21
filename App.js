import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import mainPhoto from './assets/beads.jpeg';
import {createDrawerNavigator} from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './screens/Profile';
import SettingsScreen from './screens/Settings';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import SavedScreen from './screens/Saved';
import ReferScreen from './screens/Refer';
import DrawerItems from './constants/DrawerItems';
import Header from './components/Header';


const Drawer = createDrawerNavigator();

export default function App() {


  const [beadNumber, setBeadNumber] = useState(0);
  const [malaNumber, setMalaNumber] = useState(0);
  const maxMala = 10;
  const maxBead = 10;


  return (
    <>

      <NavigationContainer>
        <Drawer.Navigator
          drawerType = "front" 
          initialRouteName = "Profile"
          screenOptions = {{ 
            activeTintColor: 'e91e63',
            itemStyle: { marginVertical: 10 },
          }}
          >
            {
          
          DrawerItems.map(drawer=><Drawer.Screen 
            key={drawer.name}
            name={drawer.name} 
            options={{
            drawerIcon:({focused})=>
             drawer.iconType==='Material' ? 
              <MaterialCommunityIcons 
                  name={drawer.iconName}
                  size={24} 
                  color={focused ? "#e91e63" : "black"} 
              />
            :
            drawer.iconType==='Feather' ?
              <Feather 
                name={drawer.iconName}
                size={24} 
                color={focused ? "#e91e63" : "black"} 
              /> 
            :
              <FontAwesome5 
                name={drawer.iconName}
                size={24} 
                color={focused ? "#e91e63" : "black"} 
              />
            ,
                headerShown:true,
                header: ({scene}) => {
                  const { options } = scene?.descriptor ?? {options:{headerTitle:"The Mala Menu"}};
                  const title =
                    options.headerTitle !== undefined
                      ? options.headerTitle
                      : options.title !== undefined
                      ? options.title
                      : scene.route.name;
                
                  return (
                    <Header screen={title}/>
                  );
                }
          
            }} 
            component={
              drawer.name==='Profile' ? ProfileScreen 
                : drawer.name==='Settings' ? SettingsScreen 
                  : drawer.name==='Saved Items' ? SavedScreen 
                    : ReferScreen
            }
          />)
        }
            </Drawer.Navigator> 
      </NavigationContainer>
      
      <View style={styles.container}>
        <Text style={styles.instructions}> Mala app to help you keep count! </Text>

        <Image source={mainPhoto} style={styles.startScreen} />
        <Text style={styles.instructions}> Tap on the area below this line. </Text>
        <StatusBar style="auto" />


        <TouchableOpacity onPress={() => setBeadNumber(beadNumber + 1)} style={styles.button}>
          <Text style={styles.buttontext}> Press here. </Text>
          <Text style={styles.buttontext}> Bead : {beadNumber % maxBead} {"\n"} Mala : {Math.floor(beadNumber / maxBead)}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startScreen: {
    width: 350,
    height: 250,
    marginTop: 10,

  },
  instructions: {
    color: "#838",
    fontSize: 20,
    marginTop: 1,
  },
  button: {
    backgroundColor: "yellow",
    padding: 120,
    borderRadius: 5,
  },
  buttontext: {
    fontSize: 20,
    color: "blue",
    textAlign: "center",
  },


});
