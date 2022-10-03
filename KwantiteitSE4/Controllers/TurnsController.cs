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
    public class TurnsController : Controller
    {
        private readonly DartContext _context;

        public TurnsController(DartContext context)
        {
            _context = context;
        }

        // GET: Turns
        public IEnumerable<Turn> Index()
        {
            var turns = _context.turns.Include(t => t.player);
            return turns;
        }

        // GET: Turns/Details/5
        public Turn Details(int? id)
        {
            var turn = _context.turns
                .Include(t => t.player)
                .FirstOrDefault(m => m.turnID == id);

            return turn;
        }

        // POST: Turns/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public void Create([Bind("turnID,legID,playerID,endScore")] Turn turn)
        {
            if (ModelState.IsValid)
            {
                _context.Add(turn);
                _context.SaveChanges();
            }
            //ViewData["legID"] = new SelectList(_context.legs, "legID", "legID", turn.legID);
            ViewData["playerID"] = new SelectList(_context.players, "playerID", "playerID", turn.playerID);
        }

        // POST: Turns/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public Turn Edit(int id, [Bind("turnID,legID,playerID,endScore")] Turn turn)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(turn);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TurnExists(turn.turnID))
                    {
                        Console.WriteLine($"Turn Edit Failed, no Turn with ID: {turn.turnID}");
                    }
                }
            }
            //ViewData["legID"] = new SelectList(_context.legs, "legID", "legID", turn.legID);
            ViewData["playerID"] = new SelectList(_context.players, "playerID", "playerID", turn.playerID);
            return turn;
        }

        // POST: Turns/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public void Delete(int id)
        {
            var turn = _context.turns.Find(id);
            if (turn != null)
            {
                _context.turns.Remove(turn);
            }
            
            _context.SaveChanges();
        }

        private bool TurnExists(int id)
        {
          return _context.turns.Any(e => e.turnID == id);
        }
    }
}
