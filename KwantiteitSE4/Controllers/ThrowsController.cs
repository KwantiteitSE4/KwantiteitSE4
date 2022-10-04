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
        [HttpGet]
        public IEnumerable<Throw> Index()
        {
            var throws = _context.throws;
            return throws;
        }

        // GET: Throws/Details/5
        [HttpGet("Details/{id}")]
        public Throw Details(int? id)
        {
            var t = _context.throws
                .FirstOrDefault(m => m.throwID == id);
            
            return t;
        }

        // POST: Throws/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Create/{throw}")]
        [ValidateAntiForgeryToken]
        public void Create([Bind("throwID,turnID,multiplier,throwScore")] Throw t)
        {
            if (ModelState.IsValid)
            {
                _context.Add(t);
                _context.SaveChanges();
            }
        }

        // POST: Throws/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("Edit/{throw}")]
        [ValidateAntiForgeryToken]
        public Throw Edit(int id, [Bind("throwID,turnID,multiplier,throwScore")] Throw t)
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
            return t;
        }

        // POST: Throws/Delete/5
        [HttpPost("Delete/{id}"), ActionName("Delete")]
        [ValidateAntiForgeryToken]
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
