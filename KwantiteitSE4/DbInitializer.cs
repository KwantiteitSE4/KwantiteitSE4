using KwantiteitSE4.Models;
using System;
using System.Linq;
using System.Runtime.CompilerServices;

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

            var players = new Player[]
            {
                new Player{playerID=1, name="Nick de Boer"},
                new Player{playerID=2, name="Patrick Norden"},
                new Player{playerID=3, name="Musaab Azawi"},
                new Player{playerID=4, name="Alexander de Haan"},
                new Player{playerID=5, name="Frank Stekelenburg"},
                new Player{playerID=6, name="Kobus Hettinga"},
                new Player{playerID=7, name="Jan Minne Holwerda"},
                new Player{playerID=8, name="Jasper Steenhuis"},
                new Player{playerID=9, name="Martin Molema"},
            };
            foreach (Player p in players)
            {
                context.players.Add(p);
            }
            context.SaveChanges();


            //games
            var games = new Game[]
            {
                new Game{gameID=1, player1ID=1, player2ID=2, numberOfSets=1, numberOfLegs=1, winnerID=1, gameDateTime=System.DateTime.Now},
                new Game{gameID=2, player1ID=3, player2ID=4, numberOfSets=5, numberOfLegs=3, gameDateTime=System.DateTime.Now}
            };
            foreach (Game g in games)
            {
                context.games.Add(g);
            }
            context.SaveChanges();


            //sets
            var sets = new Set[]
            {
                new Set{setID=1, gameID=1, winnerID=1},
                new Set{setID=2, gameID=2},
            };
            foreach (Set s in sets)
            {
                context.sets.Add(s);
            }
            context.SaveChanges();


            //legs
            var legs = new Leg[]
            {
                new Leg{legID=1, setID=1, startPlayerID=1, winnerID=1},
                new Leg{legID=2, setID=2, startPlayerID=3, winnerID=3},
                new Leg{legID=3, setID=2, startPlayerID=4, winnerID=3},
                new Leg{legID=4, setID=3, startPlayerID=4}
            };
            foreach (Leg l in legs)
            {
                context.legs.Add(l);
            }
            context.SaveChanges();


            //turns
            var turns = new Turn[]
            {
                new Turn{turnID=1, endScore=321, playerID=1, legID=1},
                new Turn{turnID=2, endScore=321, playerID=2, legID=1},
                new Turn{turnID=3, endScore=141, playerID=1, legID=1},
                new Turn{turnID=4, endScore=141, playerID=2, legID=1},
                new Turn{turnID=5, endScore=0, playerID=1, legID=1},
                new Turn{turnID=6, endScore=321, playerID=3, legID=2},
                new Turn{turnID=7, endScore=321, playerID=4, legID=2},
                new Turn{turnID=8, endScore=141, playerID=3, legID=2},
                new Turn{turnID=9, endScore= 281, playerID=4, legID=2 },
                new Turn{turnID=10, endScore=0, playerID=3, legID=2},
                new Turn{turnID=11, endScore=321, playerID=4, legID=3},
                new Turn{turnID=12, endScore=321, playerID=3, legID=3},
                new Turn{turnID=13, playerID=4, legID=3}
            };
            foreach (Turn t in turns)
            {
                context.turns.Add(t);
            }
            context.SaveChanges();


            //throws
            var throws = new Throw[]
            {
                //game 1
                new Throw{throwID=1, multiplier='T', throwScore=20, turnID=1},
                new Throw{throwID=2, multiplier='T', throwScore=20, turnID=1},
                new Throw{throwID=3, multiplier='T', throwScore=20, turnID=1},

                new Throw{throwID=4, multiplier='T', throwScore=20, turnID=2},
                new Throw{throwID=5, multiplier='T', throwScore=20, turnID=2},
                new Throw{throwID=6, multiplier='T', throwScore=20, turnID=2},

                new Throw{throwID=7, multiplier='T', throwScore=20, turnID=3},
                new Throw{throwID=8, multiplier='T', throwScore=20, turnID=3},
                new Throw{throwID=9, multiplier='T', throwScore=20, turnID=3},

                new Throw{throwID=10, multiplier='T', throwScore=20, turnID=4},
                new Throw{throwID=11, multiplier='T', throwScore=20, turnID=4},
                new Throw{throwID=12, multiplier='T', throwScore=20, turnID=4},

                new Throw{throwID=13, multiplier='T', throwScore=20, turnID=5},
                new Throw{throwID=14, multiplier='T', throwScore=19, turnID=5},
                new Throw{throwID=15, multiplier='D', throwScore=12, turnID=5},


                //game 2
                new Throw{throwID=16, multiplier='T', throwScore=20, turnID=6},
                new Throw{throwID=17, multiplier='T', throwScore=20, turnID=6},
                new Throw{throwID=18, multiplier='T', throwScore=20, turnID=6},

                new Throw{throwID=19, multiplier='T', throwScore=20, turnID=7},
                new Throw{throwID=20, multiplier='T', throwScore=20, turnID=7},
                new Throw{throwID=21, multiplier='T', throwScore=20, turnID=7},

                new Throw{throwID=22, multiplier='T', throwScore=20, turnID=8},
                new Throw{throwID=23, multiplier='T', throwScore=20, turnID=8},
                new Throw{throwID=24, multiplier='T', throwScore=20, turnID=8},

                new Throw{throwID=25, multiplier='S', throwScore=20, turnID=9},
                new Throw{throwID=26, multiplier='S', throwScore=20, turnID=9},
                new Throw{throwID=27, multiplier='S', throwScore=0, turnID=9},

                new Throw{throwID=28, multiplier='T', throwScore=20, turnID=10},
                new Throw{throwID=29, multiplier='T', throwScore=19, turnID=10},
                new Throw{throwID=30, multiplier='T', throwScore=12, turnID=10},

                new Throw{throwID=31, multiplier='T', throwScore=20, turnID=11},
                new Throw{throwID=32, multiplier='T', throwScore=20, turnID=11},
                new Throw{throwID=33, multiplier='T', throwScore=20, turnID=11},

                new Throw{throwID=34, multiplier='T', throwScore=20, turnID=12},
                new Throw{throwID=35, multiplier='T', throwScore=20, turnID=12},
                new Throw{throwID=36, multiplier='T', throwScore=20, turnID=12},

                new Throw{throwID=37, multiplier='T', throwScore=20, turnID=13},
                new Throw{throwID=38, multiplier='S', throwScore=5, turnID=13},
            };
            foreach (Throw t in throws)
            {
                context.throws.Add(t);
            }
            context.SaveChanges();


        }
    }
}
