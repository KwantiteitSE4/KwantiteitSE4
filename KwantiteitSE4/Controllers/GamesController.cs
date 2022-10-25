using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using KwantiteitSE4;
using KwantiteitSE4.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace KwantiteitSE4.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly DartContext _context;

        public GamesController(DartContext context)
        {
            _context = context;
        }

        // GET: Games
        [HttpGet]
        public IEnumerable<Game> Index()
        {
            var games = _context.games
                .Include(g => g.player1)
                .Include(g => g.player2)
                .Include(g => g.winner)
                .Include(g => g.sets)
                    .ThenInclude(s => s.legs)
                    .ThenInclude(l => l.turns)
                    .ThenInclude(t => t.throws)
                .Include(g => g.sets)
                    .ThenInclude(s => s.legs)
                    .ThenInclude(l => l.turns)
                    .ThenInclude(t => t.player);
            return games;
        }

        // GET: Games/Details/5
        [HttpGet("Details/{id}")]
        public Game Details(int? id)
        {
            var game = _context.games
                .Include(g => g.player1)
                .Include(g => g.player2)
                .Include(g => g.winner)
                .Include(g => g.sets)
                    .ThenInclude(s => s.legs)
                    .ThenInclude(l => l.turns)
                    .ThenInclude(t => t.throws)
                .Include(g => g.sets)
                    .ThenInclude(s => s.legs)
                    .ThenInclude(l => l.turns)
                    .ThenInclude(t => t.player)
                .FirstOrDefault(m => m.gameID == id);

            return game;
        }

        // POST: Games/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Create")]
        public int Create([Bind("player1ID,player2ID,winnerID,numberOfSets,numberOfLegs,gameDateTime")] Game game)
        {
            
            if (ModelState.IsValid)
            {
                _context.Add(game);
                _context.SaveChanges();
                return game.gameID;
            }
            return -1;
        }

        // POST: Games/Edit
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit")]
        public Game Edit([Bind("gameID,player1ID,player2ID,winnerID,numberOfSets,numberOfLegs,gameDateTime")] Game game)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(game);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!GameExists(game.gameID))
                    {
                        Console.WriteLine($"Game Edit failed, no game with ID:{game.gameID}");
                    }
                }
            }
            return Details(game.gameID);
        }

        public class EditPlayer
        {
            public int gameID { get; set; }
            public int player1New { get; set; }
            public int player2New { get; set; }
        }

        [HttpPost("EditPlayers")]
        public void EditPlayers([Bind("gameID, player1New, player2New")] EditPlayer edit)
        {
            int gameID = edit.gameID;
            int player1New = edit.player1New;
            int player2New = edit.player2New;
            Game game = _context.games
                .Include(g => g.player1)
                .Include(g => g.player2)
                .Include(g => g.winner)
                .Include(g => g.sets)
                    .ThenInclude(s => s.legs)
                    .ThenInclude(l => l.turns)
                    .ThenInclude(t => t.throws)
                .Include(g => g.sets)
                    .ThenInclude(s => s.legs)
                    .ThenInclude(l => l.turns)
                    .ThenInclude(t => t.player)
                .FirstOrDefault(m => m.gameID == gameID);
            if (game == null) return;

            game.sets.ForEach(s => {
                s.legs.ForEach(l => {
                    l.turns.FindAll(t => t.playerID == game.player1ID).ForEach(t => t.playerID = player1New);
                    l.turns.FindAll(t => t.playerID == game.player2ID).ForEach(t => t.playerID = player2New);

                    if (l.startPlayerID == game.player1ID) l.startPlayerID = player1New;
                    else if (l.startPlayerID == game.player2ID) l.startPlayerID = player2New;


                    if (l.winnerID != null && l.winnerID == game.player1ID) l.winnerID = player1New;
                    else if (l.winnerID != null && l.winnerID == game.player2ID) l.winnerID = player2New;
                });
                if (s.winnerID!= null && s.winnerID == game.player1ID) s.winnerID = player1New;
                else if (s.winnerID != null && s.winnerID == game.player2ID) s.winnerID = player2New;
            });
            if (game.winnerID != null && game.winnerID == game.player1ID) game.winnerID = player1New;
            else if (game.winnerID != null && game.winnerID == game.player2ID) game.winnerID = player2New;

            game.player1ID = player1New;
            game.player2ID = player2New;

            _context.turns.UpdateRange(game.sets.SelectMany(s => s.legs.SelectMany(l => l.turns)).ToList());
            _context.legs.UpdateRange(game.sets.SelectMany(s => s.legs).ToList());
            _context.sets.UpdateRange(game.sets);
            _context.games.Update(game);
            _context.SaveChanges();
        }


        // POST: Games/Delete/5
        [HttpPost("Delete/{id}"), ActionName("Delete")]
        public void Delete(int id)
        {
            var game = _context.games.Find(id);
            if (game != null)
            {
                _context.games.Remove(game);
            }
            
            _context.SaveChanges();
        }

        private bool GameExists(int id)
        {
          return _context.games.Any(e => e.gameID == id);
        }
    }
}
