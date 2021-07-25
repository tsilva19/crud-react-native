import * as SQLite from 'expo-sqlite';

// Conexão com o Banco de Dados do Sqlite 
export const DbConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};