using System.ComponentModel.DataAnnotations;

namespace KwantiteitSE4.Models
{
    public class Throw
    {
        [Key]
        public int throwID { get; set; }

        public int turnID { get; set; }
        public Turn turn { get; set; }
        public char multiplier { get; set; }
        public int throwScore { get; set; }
    }
}
