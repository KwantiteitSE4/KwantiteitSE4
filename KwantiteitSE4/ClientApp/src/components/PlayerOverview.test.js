it('correct search', async () => {
  const players = [
    {
      playerID: 1,
      name: "Nick de Boer"
    },
    {
      playerID: 2,
      name: "Patrick Norden"
    },
    {
      playerID: 3,
      name: "Musaab Azawi"
    },
    {
      playerID: 4,
      name: "Alexander de Haan"
    },
    {
      playerID: 5,
      name: "Frank Stekelenburg"
    },
    {
      playerID: 6,
      name: "Kobus Hettinga"
    },
    {
      playerID: 7,
      name: "Jan Minne Holwerda"
    },
    {
      playerID: 8,
      name: "Jasper Steenhuis"
    }
  ];

  // Mock of searchPlayerName in PlayerOverview.js
  const searchPlayerName = (event) => {
    const newDisplayed = players.filter(player => player.name.toLowerCase().includes(event.target.value.toLowerCase()));
    return newDisplayed
  }
    
  expect(searchPlayerName({target: { value: "kobus" }})).toEqual([
    {
      playerID: 6,
      name: "Kobus Hettinga"
    }
  ]);
});