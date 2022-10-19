using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KwantiteitSE4.Models
{
    public class Player
    {
        [Key]
        public int playerID { get; set; }
        [StringLength(25)]
        public string name { get; set; }
        [StringLength(2)]
        public string country { get; set; }
    }
}
