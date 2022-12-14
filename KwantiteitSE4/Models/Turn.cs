using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KwantiteitSE4.Models
{
    public class Turn
    {
        [Key]
        public int turnID { get; set; }

        public int legID { get; set; }
        public Leg leg { get; set; }

        public int playerID { get; set; }
        public Player player { get; set; }
        public int? endScore { get; set; }
        public List<Throw> throws { get; set; }

    }
}
