# Présentation #
Cette application récupère les contacts stockés dans les smartphones des vendeurs itinérants de ClearWater, sous le format universel vCard, puis convertit ces fichiers dans un format prédéfini, conçu pour le stockage de ces contacts dans une base de données. L’utilité première de cette fonctionnalité est, pour la société ClearWater, de garder une trace de tous ses clients, de manière centralisée, et ce même après le départ d’un vendeur ; ceci afin de permettre plus facilement le suivi de tous les clients.


# Utilisation #
Pré requis :
  * node.js
  * un fichier contact au format .vcf.
Le programme s'exécute via l'invite de commande avec la commande suivante :
    * **node parser.js <nom fichier d'entrée> <nom fichier de sortie>**
Il génère un fichier contact au format .csv : _<nom fichier de sortie>.csv_

# Organisation des ressources #

  * **Parser.js**, programme principal
  * **README.txt**, version condensée expliquant comment lancer l'exécutable
  * Plusieurs fichiers test au format .vcf