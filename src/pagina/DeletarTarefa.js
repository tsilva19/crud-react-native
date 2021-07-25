import React, { useState } from "react";
import { View, Alert, SafeAreaView } from "react-native";
import TextoEntrada from "./components/TextoEntrada";
import Botao from "./components/Botao";
import { DbConnection } from "../database/dbconnection";

const db = DbConnection.getConnection();

const DeletarTarefa = ({ navigation }) => {
  let [inputTarefaId, setInputTarefaId] = useState("");

  let deleteTarefa = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  table_tarefa where tarefa_id=?",
        [inputTarefaId],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Sucesso",
              "Tarefa Excluída com Sucesso !",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Home"),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert("Por favor entre com um código de tarefa válido !");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <TextoEntrada
            placeholder="Entre com o Código da Tarefa"
            onChangeText={(inputTarefaId) => setInputTarefaId(inputTarefaId)}
            style={{ padding: 10 }}
          />
          <Botao title="Excluir Tarefa" customClick={deleteTarefa} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeletarTarefa;
