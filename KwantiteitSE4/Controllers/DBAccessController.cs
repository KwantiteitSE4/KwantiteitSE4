using System;
using System.IO;
using Microsoft.Data.Sqlite;

namespace KwantiteitSE4.Controllers
{
    public class DBAccessController
    {
        private static DBAccessController instance;
        private const string DBFILENAME = "KwanDB.db";
        private SqliteConnection connection;

        private DBAccessController(bool reset = false) 
        {
            if (reset) Reset();
            string connectionString = new SqliteConnectionStringBuilder()
            {
                DataSource = DBFILENAME,
                Mode = SqliteOpenMode.ReadWriteCreate,
                ForeignKeys = true
            }.ToString();
            connection = new SqliteConnection(connectionString);
        }

        public static DBAccessController GetInstance(bool reset = false)
        {
            return instance ??= new DBAccessController(reset);
        }




        private void Reset()
        {

        }
    }
}
