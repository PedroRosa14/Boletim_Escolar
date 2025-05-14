import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import TabelaNotas from '../Pages/Ler';
import Adicionar from '../Pages/Adicionar';
import EditarNotas from '../Pages/Editar';
import ExcluirNotas from '../Pages/Excluir';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen
          name="Inicio"
          component={TabelaNotas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Adicionar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editar"
          component={EditarNotas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Excluir"
          component={ExcluirNotas}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
