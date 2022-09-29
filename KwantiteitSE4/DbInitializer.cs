using System.Linq;

namespace KwantiteitSE4
{
    public class DbInitializer
    {
        public static void Initialize(DartContext context)
        {
            context.Database.EnsureCreated();
            if (context.players.Any())
            {
                return;   // DB has been seeded
            }


        }
    }
}
