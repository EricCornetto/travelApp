import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/home/Home';


const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();

    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;