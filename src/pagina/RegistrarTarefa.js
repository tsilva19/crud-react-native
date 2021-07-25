import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from "react-native";
import TextoEntrada from "./components/TextoEntrada";
import Botao from "./components/Botao";
import { DbConnection } from "../database/dbconnection";

const db = DbConnection.getConnection();

const RegistrarTarefa = ({ navigation }) => {
  let [tarefaName, setTarefaName] = useState("");
  let [tarefaData, setTarefaData] = useState("");
  let [tarefaPrioridade, setTarefaPrioridade] = useState("");

  let register_tarefa = () => {
    console.log(tarefaName, tarefaData, tarefaPrioridade);

    if (!tarefaName) {
      alert("Por favor preencha a descrição !");
      return;
    }
    if (!tarefaData) {
      alert("Por favor preencha a data de término!");
      return;
    }
    if (!tarefaPrioridade) {
      alert("Por favor preencha a prioridade !");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO table_tarefa (tarefa_name, tarefa_data, tarefa_prioridade) VALUES (?,?,?)",
        [tarefaName, tarefaData, tarefaPrioridade],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Sucesso",
              "Tarefa Registrada com Sucesso !!!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Home"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Erro ao tentar Registrar a Tarefa !!!");
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <TextoEntrada
                placeholder="Descrição da Tarefa"
                onChangeText={(tarefaName) => setTarefaName(tarefaName)}
                style={{ padding: 10 }}
              />
              <TextoEntrada
                placeholder="Data de Término"
                onChangeText={(tarefaData) => setTarefaData(tarefaData)}
                maxLength={10}
                keyboardType="Prioridade"
                style={{ padding: 10 }}
              />
              <TextoEntrada
                placeholder="Prioridade"
                onChangeText={(tarefaPrioridade) => setTarefaPrioridade(tarefaPrioridade)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top", padding: 10 }}
              />
              <Botao title="Cadastrar Tarefa" customClick={register_tarefa} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegistrarTarefa;
