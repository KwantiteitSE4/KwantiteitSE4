using System;
using System.IO;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Primitives;

namespace KwantiteitSE4.Controllers
{
    public class DBAccessController
    {
        //static instance of the database access controller for singleton pattern
        private static DBAccessController instance;

        //Database and backup sql file name
        private const string DBFILENAME = "KwanDB.db";
        private const string DBBACKUPFILE = "dbbackup.sql";

        private readonly string DBPATH = Path.Combine(Directory.GetCurrentDirectory(), DBFILENAME);
        private readonly string DBBACKUPPATH = Path.Combine(Directory.GetCurrentDirectory(), DBBACKUPFILE);
        private SqliteConnection connection;

        /*
         * 
         */
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

        /*
         * 
         */
        public static DBAccessController GetInstance(bool reset = false)
        {
            return instance ??= new DBAccessController(reset);
        }

        /*
         * 
         */
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

        /*
         * 
         */
        private void Reset()
        {
            File.Delete(DBPATH);
            RepopulateDB();
        }

        /*
         * 
         */
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
