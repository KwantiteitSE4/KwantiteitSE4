using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KwantiteitSE4.Models
{
    public class Leg
    {
        [Key]
        public int legID { get; set; }

        public int setFK { get; set; }
        public Set set { get; set; }

        public int startPlayerFK { get; set; }
        public Player startPlayer { get; set; }

        public int winnerFK { get; set; }
        public Player? winner { get; set; }
        public List<Turn> turns { get; set; }
    }
}
