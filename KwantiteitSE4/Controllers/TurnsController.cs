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
    public class TurnsController : ControllerBase
    {
        private readonly DartContext _context;

        public TurnsController(DartContext context)
        {
            _context = context;
        }

        // GET: Turns
        [HttpGet]
        public IEnumerable<Turn> Index()
        {
            var turns = _context.turns.Include(t => t.player).Include(t => t.throws);
            return turns;
        }

        // GET: Turns/Details/5
        [HttpGet("Details/{id}")]
        public Turn Details(int? id)
        {
            var turn = _context.turns
                .Include(t => t.player)
                .Include(t => t.throws)
                .FirstOrDefault(m => m.turnID == id);

            return turn;
        }

        // POST: Turns/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Create")]
        public int Create([Bind("legID,playerID,endScore")] Turn turn)
        {
            if (ModelState.IsValid)
            {
                _context.Add(turn);
                _context.SaveChanges();
                return turn.turnID;
            }
            return -1;
        }

        // POST: Turns/Edit
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit")]
        public Turn Edit([Bind("turnID,legID,playerID,endScore")] Turn turn)
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
            return turn;
        }

        // POST: Turns/Delete/5
        [HttpPost("Delete/{id}"), ActionName("Delete")]
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
