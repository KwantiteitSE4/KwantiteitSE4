using System;
using System.IO;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Primitives;

namespace KwantiteitSE4.Controllers
{
    public class DBAccessController
    {
        private static DBAccessController instance;
        private const string DBFILENAME = "KwanDB.db";
        private const string DBBACKUPFILE = "dbbackup.sql";

        private string DBPATH = Path.Combine(Directory.GetCurrentDirectory(), DBFILENAME);
        private string DBBACKUPPATH = Path.Combine(Directory.GetCurrentDirectory(), DBBACKUPFILE);
        private SqliteConnection connection;

        private DBAccessController(bool reset = false) 
        {
            if (reset) Reset();
            if (!File.Exists(DBPATH))
            {
                RepopulateDB();
            }
            else
            {
                CreateConnection();
            }
        }

        public static DBAccessController GetInstance(bool reset = false)
        {
            return instance ??= new DBAccessController(reset);
        }

        private void CreateConnection()
        {
            string connectionString = new SqliteConnectionStringBuilder()
            {
                DataSource = DBPATH,
                Mode = SqliteOpenMode.ReadWriteCreate,
                ForeignKeys = true
            }.ToString();
            connection = new SqliteConnection(connectionString);
        }

        private void Reset()
        {
            File.Delete(DBPATH);
            RepopulateDB();
        }

        private void RepopulateDB()
        {
            if (connection == null)
            {
                CreateConnection();
            }
            string script = File.ReadAllText(DBBACKUPPATH);
            connection.Open();
            SqliteCommand t = connection.CreateCommand();
            t.CommandText = script;
            t.ExecuteNonQuery();
            connection.Close();
        }
    }
}
