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
    public class SetsController : Controller
    {
        private readonly DartContext _context;

        public SetsController(DartContext context)
        {
            _context = context;
        }

        // GET: Sets
        public IEnumerable<Set> Index()
        {
            var sets = _context.sets.Include(s => s.winner).Include(s => s.legs);
            return sets;
        }

        // GET: Sets/Details/5
        public Set Details(int? id)
        {
            var set = _context.sets
                .Include(s => s.winner)
                .Include(s => s.legs)
                .FirstOrDefault(m => m.setID == id);

            return set;
        }

        // POST: Sets/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public void Create([Bind("setID,gameID,winnerID")] Set set)
        {
            if (ModelState.IsValid)
            {
                _context.Add(set);
                _context.SaveChanges();
            }
            ViewData["gameID"] = new SelectList(_context.games, "gameID", "gameID", set.gameID);
            ViewData["winnerID"] = new SelectList(_context.players, "playerID", "playerID", set.winnerID);
        }

        // POST: Sets/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public Set Edit(int id, [Bind("setID,gameID,winnerID")] Set set)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(set);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SetExists(set.setID))
                    {
                        Console.WriteLine($"Set Edit failed, no set with ID: {set.setID}");
                    }
                }
            }
            ViewData["gameID"] = new SelectList(_context.games, "gameID", "gameID", set.gameID);
            ViewData["winnerID"] = new SelectList(_context.players, "playerID", "playerID", set.winnerID);
            return set;
        }

        // POST: Sets/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public void Delete(int id)
        {

            var set = _context.sets.Find(id);
            if (set != null)
            {
                _context.sets.Remove(set);
            }
            
            _context.SaveChanges();
        }

        private bool SetExists(int id)
        {
          return _context.sets.Any(e => e.setID == id);
        }
    }
}
