import "react-native-gesture-handler";

import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/pagina/Home";
import RegistrarTarefa from "./src/pagina/RegistrarTarefa";
import AtualizarTarefa from "./src/pagina/AtualizarTarefa";
import VisualizarTarefa from "./src/pagina/VisualizarTarefa";
import VisualizarTodasTarefas from "./src/pagina/VisualizarTodasTarefas";
import DeletarTarefa from "./src/pagina/DeletarTarefa";

const Navegar = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navegar.Navigator initialRouteName="Home">
      <Navegar.Screen
        name="Home"
        component={Home}
        options={{
          title: "IDSoftware: Sistema de Tarefas",
          headerStyle:{
            backgroundColor: "#4cb3d4"
          },
          headerTintColor: "#fff",
          headerTitleStyle:{
            fontWeight: "bold",
          }
        }}
        />

        <Navegar.Screen
          name="Register"
          component={RegistrarTarefa}
          options={{
            title: "Cadastrar Tarefa",
            headerStyle: {
              backgroundColor: "#90ee90",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Navegar.Screen
          name="Update"
          component={AtualizarTarefa}
          options={{
            title: "Atualizar Tarefa",
            headerStyle: {
              backgroundColor: "#90ee90",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Navegar.Screen
          name="View"
          component={VisualizarTarefa}
          options={{
            title: "Visualizar Tarefa",
            headerStyle: {
              backgroundColor: "#90ee90",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Navegar.Screen
          name="ViewAll"
          component={VisualizarTodasTarefas}
          options={{
            title: "Visualizar Todas as Tarefas",
            headerStyle: {
              backgroundColor: "#90ee90",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />

        <Navegar.Screen
          name="Delete"
          component={DeletarTarefa}
          options={{
            title: "Excluir Tarefa",
            headerStyle: {
              backgroundColor: "#D1503A",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />    


      </Navegar.Navigator>
    </NavigationContainer>
  );
};

export default App;