using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using KwantiteitSE4;
using KwantiteitSE4.Models;

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
            return game;
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
