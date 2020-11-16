import * as React from 'react';
import Signin from '../travelApp/src/signin/Signin';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import  * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const App = () => {
  return(
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <Signin />
    </ApplicationProvider>
    </>
  );
}

export default App;
