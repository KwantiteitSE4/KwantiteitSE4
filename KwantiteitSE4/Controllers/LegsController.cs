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
    public class LegsController : ControllerBase
    {
        private readonly DartContext _context;

        public LegsController(DartContext context)
        {
            _context = context;
        }

        // GET: Legs
        [HttpGet]
        public IEnumerable<Leg> Index()
        {
            var legs = _context.legs.Include(l => l.startPlayer).Include(l => l.winner).Include(l => l.turns);
            return legs;
        }

        // GET: Legs/Details/5
        [HttpGet("Details/{id}")]
        public Leg Details(int? id)
        {
            var leg = _context.legs
                .Include(l => l.startPlayer)
                .Include(l => l.winner)
                .Include(l => l.turns)
                .FirstOrDefault(m => m.legID == id);

            return leg;
        }

        // POST: Legs/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Create/{leg}")]
        [ValidateAntiForgeryToken]
        public async void Create([Bind("legID,setID,startPlayerID,winnerID")] Leg leg)
        {
            if (ModelState.IsValid)
            {
                _context.Add(leg);
                await _context.SaveChangesAsync();
            }
        }

        // POST: Legs/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit/{leg}")]
        [ValidateAntiForgeryToken]
        public Leg Edit(int id, [Bind("legID,setID,startPlayerID,winnerID")] Leg leg)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(leg);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!LegExists(leg.legID))
                    {
                        Console.WriteLine($"Leg Edit failed, no leg with ID: {leg.legID}");
                    }
                }
            }
            return leg;
        }

        // POST: Legs/Delete/5
        [HttpPost("Delete/{id}"), ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public void Delete(int id)
        {
            var leg = _context.legs.Find(id);
            if (leg != null)
            {
                _context.legs.Remove(leg);
            }
            
            _context.SaveChanges();
        }

        private bool LegExists(int id)
        {
          return _context.legs.Any(e => e.legID == id);
        }
    }
}
