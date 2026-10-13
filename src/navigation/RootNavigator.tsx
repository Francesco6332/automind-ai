import { createNativeStackNavigator, type NativeStackNavigationOptions } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import Home from '../screens/Home/Home';
import CaseDetail from '../screens/CaseDetail/CaseDetail';
import AddCase from '../screens/AddCase/AddCase';
import { colors } from '../theme/colors';

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  CaseDetail: { caseId: number };
  AddCase: { caseId: number } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const pushedScreenOptions: NativeStackNavigationOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  animation: 'slide_from_right',
};

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CaseDetail"
        component={CaseDetail}
        options={{ ...pushedScreenOptions, title: 'Dettaglio caso', headerBackTitle: 'Casi' }}
      />
      <Stack.Screen
        name="AddCase"
        component={AddCase}
        options={({ route }) => ({
          ...pushedScreenOptions,
          title: route.params?.caseId ? 'Nuova nota' : 'Nuovo caso',
          headerBackTitle: 'Indietro',
        })}
      />
    </Stack.Navigator>
  );
}
