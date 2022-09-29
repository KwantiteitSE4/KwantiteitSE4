using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KwantiteitSE4.Models
{
    public class Set
    {
        [Key]
        public int setID { get; set; }

        public int gameFK { get; set; }
        public Game game { get; set; }

        public int startPlayerFK { get; set; }
        public Player startPlayer { get; set; }

        public int? winnerFK { get; set; }
        public Player? winner { get; set; }
        public int numberOfLegsPerSet { get; set; }
        public List<Leg> legs { get; set; }
    }
}
