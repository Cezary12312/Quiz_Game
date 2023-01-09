SET IDENTITY_INSERT [dbo].[QuizQuestions] ON
INSERT INTO [dbo].[QuizQuestions] ([Id], [Question], [ImageName], [Answer1], [Answer2], [Answer3], [Answer4], [CorrectAnswer]) 
VALUES 
(1, 'Co to za zwierze?', 'lion.jpg', 'lew', 'pantera', 'tygrys', 'wilk', 0),
(2, 'Co to za ptak?', 'parrot.jpg', 'pingwin', 'paw', 'tukan', 'papuga', 3),
(3, '2 + 6 : 2 * 3 = ', NULL, '11', '3', '12', '-1', 0),
(4, 'Osoba A miala 23 lata, osoba B miala 8 lat. Obecnie osoba A ma dwa razy wiecej lat niz osoba B. Ile lat ma obecnie osoba B?', NULL, '13', '46', '23', '21', 2),
(5, 'W którym roku miala miejsce bitwa pod Grunwaldem', NULL, '1401', '1410', '1500', '1020', 1)
SET IDENTITY_INSERT [dbo].[QuizQuestions] OFF
