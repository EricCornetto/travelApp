import * as React from 'react';
import Signin from '../travelApp/src/signin/Signin';
import { ApplicationProvider, IconRegistry, Button } from '@ui-kitten/components';
import  * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Signup from './src/signup/Signup';
import Home from './src/home/Home';
import { ThemeProvider } from 'react-native-elements';

const Stack = createStackNavigator();

const App = () => {
  return(
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <ThemeProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name='Signin' component={Signin}  options={{headerShown: false}}/>
        <Stack.Screen name='Signup' component={Signup}  options={{headerShown: false}}/>
        <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
      </Stack.Navigator>
      </NavigationContainer>
      </ThemeProvider>
    </ApplicationProvider>
    </>
  );
}

export default App;
