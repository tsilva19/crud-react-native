import React, { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import Texto from "./components/Texto";
import TextoEntrada from "./components/TextoEntrada";
import Botao from "./components/Botao";
import { DbConnection } from "../database/dbconnection";

const db = DbConnection.getConnection();

const VisualizarTarefa = () => {
  let [inputTarefaId, setInputTarefaId] = useState("");
  let [tarefaDados, setTarefaDados] = useState({});

  let searchTarefa = () => {
    console.log(inputTarefaId);
    setTarefaDados({});
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM table_tarefa where tarefa_id = ?",
        [inputTarefaId],
        (tx, results) => {
          var len = results.rows.length;
          console.log("len", len);
          if (len > 0) {
            setTarefaDados(results.rows.item(0));
          } else {
            alert("Tarefa não encontrado !");
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <Texto text="Filtro de Tarefa" />
          <TextoEntrada
            placeholder="Entre com o Código da Tarefa"
            onChangeText={(inputTarefaId) => setInputTarefaId(inputTarefaId)}
            style={{ padding: 10 }}
          />
          <Botao title="Buscar Tarefa" customClick={searchTarefa} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10,
            }}
          >
            <Text>Código : {tarefaDados.tarefa_id}</Text>
            <Text>Descrição : {tarefaDados.tarefa_name}</Text>
            <Text>Data de Término : {tarefaDados.tarefa_data}</Text>
            <Text>Prioridade : {tarefaDados.tarefa_prioridade}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VisualizarTarefa;
