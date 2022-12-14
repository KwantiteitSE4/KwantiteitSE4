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
    public class ThrowsController : ControllerBase
    {
        private readonly DartContext _context;

        public ThrowsController(DartContext context)
        {
            _context = context;
        }

        // GET: Throws
        // Returns a list of all throws in the database
        [HttpGet]
        public IEnumerable<Throw> Index()
        {
            var throws = _context.throws;
            return throws;
        }

        // GET: Throws/Details/5
        // Returns full details on a single throw
        [HttpGet("Details/{id}")]
        public Throw Details(int? id)
        {
            var t = _context.throws
                .FirstOrDefault(m => m.throwID == id);
            
            return t;
        }

        // POST: Throws/Create
        // Creates a new throw with the given information
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Create")]
        public int Create([Bind("turnID,multiplier,throwScore")] Throw t)
        {
            if (ModelState.IsValid)
            {
                _context.Add(t);
                _context.SaveChanges();
                return t.throwID;
            }
            return -1;
        }

        // POST: Throws/EnterThrows
        // Takes a list of throws and inserts them into the database
        [HttpPost("EnterThrows")]
        public void EnterThrows([Bind("turnID,multiplier,throwScore")] IList<Throw> throws)
        {
            if (ModelState.IsValid)
            {
                foreach (Throw t in throws)
                {
                    _context.Add(t);
                }
                _context.SaveChangesAsync();
            }
        }

        // POST: Throws/Edit
        // Edits the given throw with the new data
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit")]
        public Throw Edit([Bind("throwID,turnID,multiplier,throwScore")] Throw t)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(t);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ThrowExists(t.throwID))
                    {
                        Console.WriteLine($"Throw Edit failed, no Throw with ID: {t.throwID}");
                    }
                }
            }
            return Details(t.throwID);
        }

        // POST: Throws/Delete/5
        // Deletes a specific throw from the database
        [HttpPost("Delete/{id}"), ActionName("Delete")]
        public void Delete(int id)
        {
            var t = _context.throws.Find(id);
            if (t != null)
            {
                _context.throws.Remove(t);
            }
            
            _context.SaveChanges();
        }

        private bool ThrowExists(int id)
        {
          return _context.throws.Any(e => e.throwID == id);
        }
    }
}
