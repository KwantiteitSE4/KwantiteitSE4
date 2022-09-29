using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KwantiteitSE4.Models
{
    public class Set
    {
        [Key]
        public int setID { get; set; }

        public int gameID { get; set; }
        public Game game { get; set; }

        public int? winnerID { get; set; }
        public Player? winner { get; set; }
        public List<Leg> legs { get; set; }
    }
}
