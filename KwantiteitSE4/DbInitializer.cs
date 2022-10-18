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
                new Player{playerID=10, name="van Gerwen"},
                new Player{playerID=11, name="Aspinall"},
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
                new Game{gameID=2, player1ID=3, player2ID=4, numberOfSets=5, numberOfLegs=3, gameDateTime=System.DateTime.Now},
                new Game{gameID=3, player1ID=11, player2ID=10, numberOfSets=8, numberOfLegs=5, winnerID=10, gameDateTime=System.DateTime.Now},
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

                new Set{setID=3, gameID=3, winnerID=10},
                new Set{setID=4, gameID=3, winnerID=10},
                new Set{setID=5, gameID=3, winnerID=10},
                new Set{setID=6, gameID=3, winnerID=10},
                new Set{setID=7, gameID=3, winnerID=11},
                new Set{setID=8, gameID=3, winnerID=11},
                new Set{setID=9, gameID=3, winnerID=11},
                new Set{setID=10, gameID=3, winnerID=10},
            };
            foreach (Set s in sets)
            {
                context.sets.Add(s);
            }
            context.SaveChanges();


            //legs
            var legs = new Leg[]
            {
                //game 1
                new Leg{legID=1, setID=1, startPlayerID=1, winnerID=1},

                //game 2
                new Leg{legID=2, setID=2, startPlayerID=3, winnerID=3},
                new Leg{legID=3, setID=2, startPlayerID=4, winnerID=3},
                new Leg{legID=4, setID=2, startPlayerID=4},

                //game 3
                new Leg{legID=5, setID=3, startPlayerID=10, winnerID=10},
                new Leg{legID=6, setID=3, startPlayerID=11, winnerID=10},
                new Leg{legID=7, setID=3, startPlayerID=10, winnerID=10},

                new Leg{legID=8, setID=4, startPlayerID=11, winnerID=11},
                new Leg{legID=9, setID=4, startPlayerID=10, winnerID=10},
                new Leg{legID=10, setID=4, startPlayerID=11, winnerID=11},
                new Leg{legID=11, setID=4, startPlayerID=10, winnerID=10},
                new Leg{legID=12, setID=4, startPlayerID=11, winnerID=10},

                new Leg{legID=13, setID=5, startPlayerID=10, winnerID=10},
                new Leg{legID=14, setID=5, startPlayerID=11, winnerID=11},
                new Leg{legID=15, setID=5, startPlayerID=10, winnerID=10},
                new Leg{legID=16, setID=5, startPlayerID=11, winnerID=11},
                new Leg{legID=17, setID=5, startPlayerID=10, winnerID=10},

                new Leg{legID=18, setID=6, startPlayerID=11, winnerID=11},
                new Leg{legID=19, setID=6, startPlayerID=10, winnerID=10},
                new Leg{legID=20, setID=6, startPlayerID=11, winnerID=10},
                new Leg{legID=21, setID=6, startPlayerID=10, winnerID=10},

                new Leg{legID=22, setID=7, startPlayerID=11, winnerID=10},
                new Leg{legID=23, setID=7, startPlayerID=10, winnerID=11},
                new Leg{legID=24, setID=7, startPlayerID=11, winnerID=11},
                new Leg{legID=25, setID=7, startPlayerID=10, winnerID=11},

                new Leg{legID=26, setID=8, startPlayerID=11, winnerID=11},
                new Leg{legID=27, setID=8, startPlayerID=10, winnerID=10},
                new Leg{legID=28, setID=8, startPlayerID=11, winnerID=11},
                new Leg{legID=29, setID=8, startPlayerID=10, winnerID=11},

                new Leg{legID=30, setID=9, startPlayerID=10, winnerID=11},
                new Leg{legID=31, setID=9, startPlayerID=11, winnerID=10},
                new Leg{legID=32, setID=9, startPlayerID=10, winnerID=11},
                new Leg{legID=33, setID=9, startPlayerID=11, winnerID=11},

                new Leg{legID=34, setID=10, startPlayerID=11, winnerID=10},
                new Leg{legID=35, setID=10, startPlayerID=10, winnerID=10},
                new Leg{legID=36, setID=10, startPlayerID=11, winnerID=11},
                new Leg{legID=37, setID=10, startPlayerID=10, winnerID=11},
                new Leg{legID=38, setID=10, startPlayerID=11, winnerID=10},



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
                new Turn{turnID=13, playerID=4, legID=3},

                //leg 1, set 1
                new Turn{turnID=14, legID=5, playerID=10, endScore=465},
                new Turn{turnID=15, legID=5, playerID=11, endScore=501},
                new Turn{turnID=16, legID=5, playerID=10, endScore=368},
                new Turn{turnID=17, legID=5, playerID=11, endScore=421},
                new Turn{turnID=18, legID=5, playerID=10, endScore=272},
                new Turn{turnID=19, legID=5, playerID=11, endScore=359},
                new Turn{turnID=20, legID=5, playerID=10, endScore=212},
                new Turn{turnID=21, legID=5, playerID=11, endScore=264},
                new Turn{turnID=22, legID=5, playerID=10, endScore=116},
                new Turn{turnID=23, legID=5, playerID=11, endScore=164},
                new Turn{turnID=24, legID=5, playerID=10, endScore=0},
                //leg 2, set 1
                new Turn{turnID=25, legID=6, playerID=11, endScore=461},
                new Turn{turnID=26, legID=6, playerID=10, endScore=421},
                new Turn{turnID=27, legID=6, playerID=11, endScore=361},
                new Turn{turnID=28, legID=6, playerID=10, endScore=362},
                new Turn{turnID=29, legID=6, playerID=11, endScore=227},
                new Turn{turnID=30, legID=6, playerID=10, endScore=223},
                new Turn{turnID=31, legID=6, playerID=11, endScore=47},
                new Turn{turnID=32, legID=6, playerID=10, endScore=83},
                new Turn{turnID=33, legID=6, playerID=11, endScore=32},
                new Turn{turnID=34, legID=6, playerID=10, endScore=0},
                //leg 3, set 1
                new Turn{turnID=35, legID=7, playerID=10, endScore=341},
                new Turn{turnID=36, legID=7, playerID=11, endScore=421},
                new Turn{turnID=37, legID=7, playerID=10, endScore=257},
                new Turn{turnID=38, legID=7, playerID=11, endScore=336},
                new Turn{turnID=39, legID=7, playerID=10, endScore=198},
                new Turn{turnID=40, legID=7, playerID=11, endScore=236},
                new Turn{turnID=41, legID=7, playerID=10, endScore=58},
                new Turn{turnID=42, legID=7, playerID=11, endScore=102},
                new Turn{turnID=43, legID=7, playerID=10, endScore=0},

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

                //leg 1
                new Throw{throwID=39, multiplier='S', throwScore=0, turnID=14},
                new Throw{throwID=40, multiplier='S', throwScore=0, turnID=14},
                new Throw{throwID=41, multiplier='D', throwScore=18, turnID=14},

                new Throw{throwID=42, multiplier='S', throwScore=0, turnID=15},
                new Throw{throwID=43, multiplier='S', throwScore=0, turnID=15},
                new Throw{throwID=44, multiplier='S', throwScore=0, turnID=15},

                new Throw{throwID=45, multiplier='S', throwScore=20, turnID=16},
                new Throw{throwID=46, multiplier='S', throwScore=20, turnID=16},
                new Throw{throwID=47, multiplier='T', throwScore=19, turnID=16},

                new Throw{throwID=48, multiplier='D', throwScore=20, turnID=17},
                new Throw{throwID=49, multiplier='S', throwScore=20, turnID=17},
                new Throw{throwID=50, multiplier='S', throwScore=20, turnID=17},

                new Throw{throwID=51, multiplier='S', throwScore=20, turnID=18},
                new Throw{throwID=52, multiplier='S', throwScore=19, turnID=18},
                new Throw{throwID=53, multiplier='T', throwScore=19, turnID=18},

                new Throw{throwID=54, multiplier='S', throwScore=1, turnID=19},
                new Throw{throwID=55, multiplier='T', throwScore=20, turnID=19},
                new Throw{throwID=56, multiplier='S', throwScore=1, turnID=19},

                new Throw{throwID=57, multiplier='S', throwScore=20, turnID=20},
                new Throw{throwID=58, multiplier='S', throwScore=20, turnID=20},
                new Throw{throwID=59, multiplier='S', throwScore=20, turnID=20},

                new Throw{throwID=60, multiplier='T', throwScore=5, turnID=21},
                new Throw{throwID=61, multiplier='T', throwScore=20, turnID=21},
                new Throw{throwID=62, multiplier='S', throwScore=20, turnID=21},

                new Throw{throwID=63, multiplier='S', throwScore=20, turnID=22},
                new Throw{throwID=64, multiplier='T', throwScore=19, turnID=22},
                new Throw{throwID=65, multiplier='S', throwScore=19, turnID=22},

                new Throw{throwID=66, multiplier='S', throwScore=20, turnID=23},
                new Throw{throwID=67, multiplier='T', throwScore=20, turnID=23},
                new Throw{throwID=68, multiplier='S', throwScore=20, turnID=23},

                new Throw{throwID=69, multiplier='S', throwScore=20, turnID=24},
                new Throw{throwID=70, multiplier='T', throwScore=20, turnID=24},
                new Throw{throwID=71, multiplier='D', throwScore=18, turnID=24},

                //leg 2
                new Throw{throwID=72, multiplier='S', throwScore=0, turnID=25},
                new Throw{throwID=73, multiplier='S', throwScore=0, turnID=25},
                new Throw{throwID=74, multiplier='D', throwScore=20, turnID=25},

                new Throw{throwID=75, multiplier='D', throwScore=20, turnID=26},
                new Throw{throwID=76, multiplier='S', throwScore=20, turnID=26},
                new Throw{throwID=77, multiplier='S', throwScore=20, turnID=26},

                new Throw{throwID=78, multiplier='S', throwScore=20, turnID=27},
                new Throw{throwID=79, multiplier='D', throwScore=20, turnID=27},
                new Throw{throwID=80, multiplier='S', throwScore=20, turnID=27},

                new Throw{throwID=81, multiplier='S', throwScore=20, turnID=28},
                new Throw{throwID=82, multiplier='S', throwScore=20, turnID=28},
                new Throw{throwID=83, multiplier='S', throwScore=19, turnID=28},

                new Throw{throwID=84, multiplier='S', throwScore=20, turnID=29},
                new Throw{throwID=85, multiplier='T', throwScore=19, turnID=29},
                new Throw{throwID=86, multiplier='T', throwScore=19, turnID=29},

                new Throw{throwID=87, multiplier='S', throwScore=19, turnID=30},
                new Throw{throwID=88, multiplier='D', throwScore=20, turnID=30},
                new Throw{throwID=89, multiplier='D', throwScore=20, turnID=30},

                new Throw{throwID=90, multiplier='T', throwScore=20, turnID=31},
                new Throw{throwID=91, multiplier='T', throwScore=20, turnID=31},
                new Throw{throwID=92, multiplier='T', throwScore=20, turnID=31},

                new Throw{throwID=93, multiplier='T', throwScore=20, turnID=32},
                new Throw{throwID=94, multiplier='T', throwScore=20, turnID=32},
                new Throw{throwID=95, multiplier='S', throwScore=20, turnID=32},

                new Throw{throwID=96, multiplier='S', throwScore=15, turnID=33},
                new Throw{throwID=97, multiplier='S', throwScore=0, turnID=33},
                new Throw{throwID=98, multiplier='S', throwScore=0, turnID=33},

                new Throw{throwID=99, multiplier='T', throwScore=17, turnID=34},
                new Throw{throwID=100, multiplier='S', throwScore=16, turnID=34},
                new Throw{throwID=101, multiplier='D', throwScore=8, turnID=34},

                //leg 3
                new Throw{throwID=102, multiplier='D', throwScore=20, turnID=35},
                new Throw{throwID=103, multiplier='T', throwScore=20, turnID=35},
                new Throw{throwID=104, multiplier='T', throwScore=20, turnID=35},

                new Throw{throwID=105, multiplier='D', throwScore=20, turnID=36},
                new Throw{throwID=106, multiplier='S', throwScore=20, turnID=36},
                new Throw{throwID=107, multiplier='S', throwScore=20, turnID=36},

                new Throw{throwID=108, multiplier='S', throwScore=20, turnID=37},
                new Throw{throwID=109, multiplier='S', throwScore=7, turnID=37},
                new Throw{throwID=110, multiplier='T', throwScore=19, turnID=37},

                new Throw{throwID=111, multiplier='S', throwScore=5, turnID=38},
                new Throw{throwID=112, multiplier='T', throwScore=20, turnID=38},
                new Throw{throwID=113, multiplier='S', throwScore=20, turnID=38},

                new Throw{throwID=114, multiplier='S', throwScore=20, turnID=39},
                new Throw{throwID=115, multiplier='S', throwScore=20, turnID=39},
                new Throw{throwID=116, multiplier='S', throwScore=19, turnID=39},

                new Throw{throwID=117, multiplier='S', throwScore=20, turnID=40},
                new Throw{throwID=118, multiplier='S', throwScore=20, turnID=40},
                new Throw{throwID=119, multiplier='T', throwScore=20, turnID=40},

                new Throw{throwID=120, multiplier='T', throwScore=20, turnID=41},
                new Throw{throwID=121, multiplier='S', throwScore=20, turnID=41},
                new Throw{throwID=122, multiplier='T', throwScore=20, turnID=41},

                new Throw{throwID=123, multiplier='S', throwScore=20, turnID=42},
                new Throw{throwID=124, multiplier='T', throwScore=19, turnID=42},
                new Throw{throwID=125, multiplier='T', throwScore=19, turnID=42},

                new Throw{throwID=126, multiplier='S', throwScore=18, turnID=43},
                new Throw{throwID=127, multiplier='S', throwScore=20, turnID=43},
                new Throw{throwID=128, multiplier='D', throwScore=10, turnID=43},

            };
            foreach (Throw t in throws)
            {
                context.throws.Add(t);
            }
            context.SaveChanges();


        }
    }
}
