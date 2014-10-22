### README - Verbose POI Format (VPF) Parser - Exercice TP GL02

Description : Fournit un petit parser (descente récursive) en javascript permettant de vérifier la conformité au format non standard VPF.
Ce format permet de décrire des listes de points d'intérêt et de conserver une liste de notes associées à ceux-ci.
Les fichiers sont au format texte et respectent la grammaire suivante.

<liste_poi> ::= (<poi>)* "$$"
<poi> ::= "START_POI" <eol> <body> <eol> "END_POI" <eol>
<body> ::= <name> <eol> <latlng> <eol> <optional>
<optional> ::= (<note>)*
<name> ::= /name: [\w\s]+/
<latlng> ::= /latlng: (\d+(\.\d+/)?), (\d+(\.\d+)?)/
<note> ::= "note: " /[0-5]/
<eol> ::= /\r\n/


### Utilisation :

$ node vpfParser.js <finchier.vpf>

### Version : 0.01

- Parse entièrement les fichiers simples du jeu de test (mais termine avec une erreur)
- Prise en compte des noms de POIs'ils ne comportent pas d'espaces

TODO :

- Prise en charge des notes conformément au format
- Construction d'une liste d'objet POI afin de permettre des traitement ultérieur
- Ajout d'une option pour afficher chaque POI avec sa note moyenne


### Liste des contributeurs
M. Tixier (matthieu.tixier@utt.fr)
E. Jacquot (etienne.jacquot@utt.fr)
J. Rampin (jeremie.rampin@utt.fr)

