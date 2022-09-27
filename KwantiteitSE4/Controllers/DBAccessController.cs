using System;
using System.IO;

namespace KwantiteitSE4.Controllers
{
    public class DBAccessController
    {
        private static DBAccessController instance;

        private DBAccessController(bool reset = false) 
        {
            if (reset) Reset();
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
