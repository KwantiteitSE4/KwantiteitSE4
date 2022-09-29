using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KwantiteitSE4.Models
{
    public class Game
    {
        [Key]
        public int gameID { get; set; }

        public int player1ID { get; set; }
        public Player player1 { get; set; }

        public int player2ID { get; set; }
        public Player player2 { get; set; }

        public int? winnerID { get; set; }
        public Player? winner { get; set; }
        public int numberOfSets { get; set; }

        public int numberOfLegs { get; set; }
        public DateTime gameDateTime { get; set; }
        public List<Set> sets { get; set; }
    }
}
