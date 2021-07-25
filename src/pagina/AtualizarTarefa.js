import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from "react-native";

import Texto from "./components/Texto";
import TextoEntrada from "./components/TextoEntrada";
import Botao from "./components/Botao";
import { DbConnection } from "../database/dbconnection";

const db = DbConnection.getConnection();

const AtualizarTarefa = ({ navigation }) => {
  let [inputTarefaId, setInputTarefaId] = useState("");
  let [tarefaName, setTarefaName] = useState("");
  let [tarefaData, setTarefaData] = useState("");
  let [tarefaPriodade, setTarefaPrioridade] = useState("");

  let updateAllStates = (name, data, prioridade) => {
    setTarefaName(name);
    setTarefaData(data);
    setTarefaPrioridade(prioridade);
  };

  let searchTarefa = () => {
    console.log(inputTarefaId);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_tarefa where tarefa_id = ?",
        [inputTarefaId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.tarefa_name, res.tarefa_data, res.tarefa_prioridade);
          } else {
            alert("Tarefa não encontrada!");
            updateAllStates("", "", "");
          }
        }
      );
    });
  };
  let updateTarefa = () => {
    console.log(inputTarefaId, tarefaName, tarefaData, tarefaPriodade);

    if (!inputTarefaId) {
      alert("Por Favor informe o Código!");
      return;
    }
    if (!tarefaName) {
      alert("Por favor informe a Descrição !");
      return;
    }
    if (!tarefaData) {
      alert("Por Favor informe Data de Término !");
      return;
    }
    if (!tarefaPriodade) {
      alert("Por Favor informe a Prioridade !");
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE table_tarefa set tarefa_name=?, tarefa_data=? , tarefa_prioridade=? where tarefa_id=?",
        [tarefaName, tarefaData, tarefaPriodade, inputTarefaId],
        (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              "Sucesso",
              "Tarefa atualizada com sucesso !!",
              [
                {
                  text: "Ok",
                  onPress: () => navigation.navigate("Home"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Erro ao atualizar a tarefa");
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
              <Texto text="Filtro de Tarefa" />
              <TextoEntrada
                placeholder="Entre com o Código da Tarefa"
                style={{ padding: 10 }}
                onChangeText={(inputTarefaId) => setInputTarefaId(inputTarefaId)}
              />
              <Botao title="Buscar Tarefa" customClick={searchTarefa} />
              <TextoEntrada
                placeholder="Entre com a Descrição"
                value={tarefaName}
                style={{ padding: 10 }}
                onChangeText={(tarefaName) => setTarefaName(tarefaName)}
              />
              <TextoEntrada
                placeholder="Entre com a Data de Término"
                value={"" + tarefaData}
                onChangeText={(tarefaData) => setTarefaData(tarefaData)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <TextoEntrada
                value={tarefaPriodade}
                placeholder="Entre com a Prioridade"
                onChangeText={(tarefaPrioridade) => setTarefaPrioridade(tarefaPrioridade)}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={{ textAlignVertical: "top", padding: 10 }}
              />
              <Mybutton title="Atualizar Tarefa" customClick={updateTarefa} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AtualizarTarefa;
