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
    public class PlayersController : ControllerBase
    {
        private readonly DartContext _context;

        public PlayersController(DartContext context)
        {
            _context = context;
        }

        // GET: Players
        // Returns a list of all players in the database
        [HttpGet]
        public IEnumerable<Player> Index()
        {
              return _context.players;
        }

        // GET: Players/Details/5
        // Returns full details on a single player
        [HttpGet("Details/{id}")]
        public Player Details(int? id)
        {
            Player p = _context.players.FirstOrDefault(m => m.playerID == id);
            return p;
        }

        // GET: Players/Games/playerID
        // Returns all games this player has played
        [HttpGet("Games/{id}")]
        public List<Game> Games(int? id)
        {
            if (id.HasValue && PlayerExists(id.Value))
                return _context.games.Where(g => g.player1ID == id || g.player2ID == id)
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
                    .ToList();
            else
                return null;
        }

        // POST: Players/Create
        // Creates a new player with the given information
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Create")]
        public int Create([Bind("name")] Player player)
        {
            if (ModelState.IsValid)
            {
                _context.Add(player);
                _context.SaveChanges();
                return player.playerID;
            }
            return -1;
        }

        // POST: Players/Edit
        // Edits the given player with the new data
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit")]
        public Player Edit([Bind("playerID,name")] Player player)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(player);
                    _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PlayerExists(player.playerID))
                    Console.WriteLine("Player Edit failed, Wrong player ID");
                }
            }
            return Details(player.playerID);
        }

        // POST: Players/Delete/5
        // Deletes a specific player from the database
        [HttpPost("Delete/{id}"), ActionName("Delete")]
        public void Delete(int id)
        {
            var player = _context.players.Find(id);
            if (player != null)
            {
                _context.players.Remove(player);
            }
            _context.SaveChanges();
        }

        private bool PlayerExists(int id)
        {
          return _context.players.Any(e => e.playerID == id);
        }
    }
}
