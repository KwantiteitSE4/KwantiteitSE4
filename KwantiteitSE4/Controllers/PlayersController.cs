﻿using System;
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
    public class PlayersController : Controller
    {
        private readonly DartContext _context;

        public PlayersController(DartContext context)
        {
            _context = context;
        }

        // GET: Players
        public IEnumerable<Player> Index()
        {
              return _context.players;
        }

        // GET: Players/Details/5
        public Player Details(int? id)
        {
            Player p = _context.players.FirstOrDefault(m => m.playerID == id);
            return p;
        }

        // POST: Players/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public void Create([Bind("playerID,name")] Player player)
        {
            if (ModelState.IsValid)
            {
                _context.Add(player);
                _context.SaveChangesAsync();
            }
        }

        // POST: Players/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public Player Edit(int id, [Bind("playerID,name")] Player player)
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
                    if (player.playerID != id)
                    Console.WriteLine("Player Edit failed, Wrong player ID");
                }
            }
            return player;
        }

        // POST: Players/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
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