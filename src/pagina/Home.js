import React, {useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import ImagemBotao from "./components/ImagemBotao";
import { DbConnection } from "../database/dbconnection";

const db = DbConnection.getConnection();

const Home = ({ navigation }) =>{
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_tarefa'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_tarefa", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_tarefa(tarefa_id INTEGER PRIMARY KEY AUTOINCREMENT, tarefa_name VARCHAR(20), tarefa_data INT(10), tarefa_prioridade VARCHAR(255))",
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ImagemBotao
              title="Cadastrar Tarefa"
              btnColor="#90ee90"
              btnIcon="plus"
              customClick={() => navigation.navigate("Register")}
            />

            <ImagemBotao
              title="Atualizar Tarefa"
              btnColor="#90ee90"
              btnIcon="refresh"
              customClick={() => navigation.navigate("Update")}
            />

            <ImagemBotao
              title="Visualizar Tarefa"
              btnColor="#90ee90"
              btnIcon="eye"
              customClick={() => navigation.navigate("View")}
            />
            <ImagemBotao
              title="Visualizar Tarefas"
              btnColor="#90ee90"
              btnIcon="tasks"
              customClick={() => navigation.navigate("ViewAll")}
            />
            <ImagemBotao
              title="Excluir Tarefa"
              btnColor="#D1503A"
              btnIcon="close"
              customClick={() => navigation.navigate("Delete")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Home;