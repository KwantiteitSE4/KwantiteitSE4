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
    public class SetsController : ControllerBase
    {
        private readonly DartContext _context;

        public SetsController(DartContext context)
        {
            _context = context;
        }

        // GET: Sets
        // Returns a list of all sets in the database
        [HttpGet]
        public IEnumerable<Set> Index()
        {
            var sets = _context.sets.Include(s => s.winner).Include(s => s.legs);
            return sets;
        }

        // GET: Sets/Details/5
        // Returns full details on a single set
        [HttpGet("Details/{id}")]
        public Set Details(int? id)
        {
            var set = _context.sets
                .Include(s => s.winner)
                .Include(s => s.legs)
                .FirstOrDefault(m => m.setID == id);

            return set;
        }

        // POST: Sets/Create
        // Creates a new set with the given information
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Create")]
        public int Create([Bind("gameID,winnerID")] Set set)
        {
            if (ModelState.IsValid)
            {
                _context.Add(set);
                _context.SaveChanges();
                return set.setID;
            }
            return -1;
        }

        // POST: Sets/Edit
        // Edits the given set with the new data
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit")]
        public Set Edit([Bind("setID,gameID,winnerID")] Set set)
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
            return Details(set.setID);
        }

        // POST: Sets/Delete/5
        // Deletes a specific set from the database
        [HttpPost("Delete/{id}"), ActionName("Delete")]
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
