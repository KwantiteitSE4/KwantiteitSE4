--Create database tables:
CREATE TABLE IF NOT EXISTS player (playerID INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(25));
CREATE TABLE IF NOT EXISTS game (gameID INTEGER PRIMARY KEY AUTOINCREMENT, player1ID INTEGER NOT NULL REFERENCES player(playerID), player2ID INTEGER NOT NULL REFERENCES player(playerID), winnerID INTEGER REFERENCES player(playerID), numberOfSets INTEGER NOT NULL, numberOfLegsPerSet INTEGER NOT NULL, numberOfPlayedSets INTEGER, numberOfPlayedLegs INTEGER, averageSetScorePlayer1 INTEGER, averageSetScorePlayer2 INTEGER, gameDateTime DATETIME);
CREATE TABLE IF NOT EXISTS 'set' (setID INTEGER PRIMARY KEY, gameID INTEGER, startPlayerID INTEGER REFERENCES player(playerID), winnerID INTEGER REFERENCES player(playerID), numberOfLegsPlayed INTEGER, averageLegScorePlayer1 INTEGER, averageLegScorePlayer2 INTEGER, FOREIGN KEY(gameID) REFERENCES game(gameID));
CREATE TABLE IF NOT EXISTS leg (legID INTEGER PRIMARY KEY, setID INTEGER, startPlayerID INTEGER REFERENCES player(playerID), winnerID INTEGER REFERENCES player(playerID), averageTurnScorePlayer1 INTEGER, averageTurnScorePlayer2 INTEGER, FOREIGN KEY(setID) REFERENCES 'set'(setID));
CREATE TABLE IF NOT EXISTS turn (turnID INTEGER PRIMARY KEY, legID INTEGER, playerID INTEGER REFERENCES player(playerID), endScore INTEGER, FOREIGN KEY(legID) REFERENCES leg(legID));
CREATE TABLE IF NOT EXISTS throw (throwID INTEGER PRIMARY KEY, turnID INTEGER, multiplier CHAR(1), score INTEGER, FOREIGN KEY(turnID) REFERENCES turn(turnID));

--Insert mock players:
INSERT INTO player (playerID, name) VALUES (1, "Nick de Boer");
INSERT INTO player (playerID, name) VALUES (2, "Patrick Norden");
INSERT INTO player (playerID, name) VALUES (3, "Kobus Hettinga");
INSERT INTO player (playerID, name) VALUES (4, "Musaab Azawi");
INSERT INTO player (playerID, name) VALUES (5, "Jasper Steenhuis");
INSERT INTO player (playerID, name) VALUES (6, "Frank Stekelenburg");
INSERT INTO player (playerID, name) VALUES (7, "Jan Minne Holwerda");
INSERT INTO player (playerID, name) VALUES (8, "Alexander de Haan");

--Insert mock game data:
INSERT INTO game (gameID, player1Id, player2ID, winnerID, numberOfSets, numberOfLegsPerSet, numberOfPlayedSets, numberOfPlayedLegs, averageSetScorePlayer1, averageSetScorePlayer2, gameDateTime) VALUES (1, 1, 2, 1, 5, 5, 5, 25, 46, 38, '2022-09-20 20:26:31');
INSERT INTO game (gameID, player1Id, player2ID, winnerID, numberOfSets, numberOfLegsPerSet, numberOfPlayedSets, numberOfPlayedLegs, averageSetScorePlayer1, averageSetScorePlayer2, gameDateTime) VALUES (2, 3, 6, 3, 3, 5, 3, 15, 94, 69, '2022-09-22 05:31:19');
INSERT INTO game (gameID, player1Id, player2ID, numberOfSets, numberOfLegsPerSet, numberOfPlayedSets, numberOfPlayedLegs, averageSetScorePlayer1, averageSetScorePlayer2, gameDateTime) VALUES (3, 4, 8, 5, 7, 2, 18, 73, 81, '2022-09-24 12:51:38');

--Insert mock set data
--Game 1
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (1, 1, 1, 1, 5, 57, 43);
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (2, 1, 2, 1, 5, 38, 49);
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (3, 1, 1, 2, 5, 73, 82);
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (4, 1, 2, 2, 5, 86, 29);
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (5, 1, 1, 1, 5, 94, 84);

--Game 2
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (6, 2, 3, 3, 5, 87, 32);
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (7, 2, 6, 3, 5, 59, 107);
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (8, 2, 3, 6, 5, 86, 97);

--Game 3
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (9, 3, 4, 8, 7, 94, 57);
INSERT INTO 'set' (setID, gameID, startPlayerID, winnerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (10, 3, 8, 4, 7, 42, 105);
INSERT INTO 'set' (setID, gameID, startPlayerID, numberOfLegsPlayed, averageLegScorePlayer1, averageLegScorePlayer2) VALUES (11, 3, 4, 4, 45, 72);

--Insert mock leg data
--Set 1 (Game 1)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (1, 1, 1, 1, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (2, 1, 2, 1, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (3, 1, 1, 2, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (4, 1, 2, 2, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (5, 1, 1, 1, 89, 75);

--Set 2 (Game 1)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (6, 2, 2, 2, 108, 84);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (7, 2, 1, 1, 108, 84);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (8, 2, 2, 1, 108, 84);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (9, 2, 1, 2, 108, 84);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (10, 2, 2, 1, 108, 84);

--Set 3 (Game 1)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (11, 3, 1, 2, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (12, 3, 2, 1, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (13, 3, 1, 1, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (14, 3, 2, 2, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (15, 3, 1, 2, 89, 75);

--Set 4 (Game 1)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (16, 4, 2, 1, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (17, 4, 1, 1, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (18, 4, 2, 2, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (19, 4, 1, 2, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (20, 4, 2, 2, 89, 75);

--Set 5 (Game 1)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (21, 5, 1, 2, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (22, 5, 2, 1, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (23, 5, 1, 2, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (24, 5, 2, 1, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (25, 5, 1, 1, 89, 75);

--Set 6 (Game 2)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (26, 6, 3, 3, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (27, 6, 6, 6, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (28, 6, 3, 6, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (29, 6, 6, 3, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (30, 6, 3, 3, 89, 75);

--Set 7 (Game 2)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (31, 7, 6, 3, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (32, 7, 3, 6, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (33, 7, 6, 3, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (34, 7, 3, 3, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (35, 7, 6, 3, 89, 75);

--Set 8 (Game 2)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (36, 8, 3, 6, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (37, 8, 6, 6, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (38, 8, 3, 6, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (39, 8, 6, 3, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (40, 8, 3, 6, 89, 75);

--Set 9  (Game 3)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (41, 9, 4, 8, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (42, 9, 8, 4, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (43, 9, 4, 4, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (44, 9, 8, 8, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (45, 9, 4, 4, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (46, 9, 8, 8, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (47, 9, 4, 8, 89, 75);

--Set 10 (Game 3)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (48, 10, 8, 4, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (49, 10, 4, 4, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (50, 10, 8, 8, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (51, 10, 4, 4, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (52, 10, 8, 8, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (53, 10, 4, 8, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (54, 10, 8, 4, 89, 75);

--Set 11 (Game 3)
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (55, 11, 8, 4, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (56, 11, 4, 8, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (57, 11, 8, 8, 89, 75);
INSERT INTO leg (legID, setID, startPlayerID, winnerID, averageTurnScorePlayer1, averageTurnScorePlayer2) VALUES (58, 11, 4, 4, 89, 75);

--Insert mock turn and throw data
--Leg 1 player 1
INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (1, 1, 1, 416);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (1, 1, 's', 18);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (2, 1, 'd', 11);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (3, 1, 't', 15);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (3, 1, 1, 319);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (7, 3, 's', 13);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (8, 3, 'd', 12);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (9, 3, 't', 20);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (5, 1, 1, 248);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (13, 5, 's', 9);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (14, 5, 'd', 16);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (15, 5, 't', 10);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (7, 1, 1, 68);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (19, 7, 't', 20);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (20, 7, 't', 20);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (21, 7, 't', 20);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (9, 1, 1, 0);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (25, 9, 's', 8);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (26, 9, 't', 10);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (27, 9, 'd', 15);

--leg 1 player 2
INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (2, 1, 2, 416);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (4, 2, 's', 18);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (5, 2, 'd', 11);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (6, 2, 't', 15);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (4, 1, 2, 319);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (10, 4, 's', 18);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (11, 4, 'd', 11);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (12, 4, 't', 15);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (6, 1, 2, 248);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (16, 6, 's', 9);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (17, 6, 'd', 16);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (18, 6, 't', 10);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (8, 1, 2, 68);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (22, 8, 't', 20);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (23, 8, 't', 20);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (24, 8, 't', 20);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (10, 1, 2, 0);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (28, 10, 's', 8);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (29, 10, 't', 10);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (30, 10, 'd', 15);

--leg 2 player 1
INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (11, 2, 1, 416);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (31, 11, 's', 18);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (32, 11, 'd', 11);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (33, 11, 't', 15);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (13, 2, 1, 319);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (34, 13, 's', 13);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (35, 13, 'd', 12);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (36, 13, 't', 20);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (15, 2, 1, 248);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (37, 15, 's', 9);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (38, 15, 'd', 16);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (39, 15, 't', 10);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (17, 2, 1, 68);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (40, 17, 't', 20);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (41, 17, 't', 20);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (42, 17, 't', 20);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (19, 2, 1, 0);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (43, 19, 's', 8);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (44, 19, 't', 10);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (45, 19, 'd', 15);


--leg 2 player 2
INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (12, 2, 2, 416);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (46, 12, 's', 18);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (47, 12, 'd', 11);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (48, 12, 't', 15);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (14, 2, 2, 319);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (49, 14, 's', 18);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (50, 14, 'd', 11);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (51, 14, 't', 15);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (16, 2, 2, 248);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (52, 16, 's', 9);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (53, 16, 'd', 16);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (54, 16, 't', 10);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (18, 2, 2, 68);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (55, 18, 't', 20);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (56, 18, 't', 20);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (57, 18, 't', 20);

INSERT INTO turn (turnID, legID, playerID, endScore) VALUES (20, 2, 2, 0);

INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (58, 20, 's', 8);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (59, 20, 't', 10);
INSERT INTO throw (throwID, turnID, multiplier, score) VALUES (60, 20, 'd', 15);
