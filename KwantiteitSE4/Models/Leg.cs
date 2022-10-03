using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KwantiteitSE4.Models
{
    public class Leg
    {
        [Key]
        public int legID { get; set; }

        public int setID { get; set; }
        public Set set { get; set; }

        public int startPlayerID { get; set; }
        public Player startPlayer { get; set; }

        public int? winnerID { get; set; }
        public Player? winner { get; set; }
        public List<Turn> turns { get; set; }
    }
}
