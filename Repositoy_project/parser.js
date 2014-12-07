/**
 * Created by les-4-fantastiques on 24/11/2014.
 */



var fs = require('fs');
var myArgs = process.argv.slice(1);
var input_lines = [];
var key = [];
var value = [];
var keyvalue = [];
var nbrContact = 0;
var nbrPhones = 0;



var fullName = [];
var fName = [];
var lName = [];
var email = [];
var title = [];
var org = [];
var numTel = [];
var typeTel = [];
var telMatrix = [];


/*
 *lire  le fichier.
 */

fs.readFile(myArgs[1], 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    input_lines = data.split(/\n/);


    /* appel fonctions */
    parse_key_value();
    createcontact();
    cleanTel();
    writeCSV();

    /*
        Afficher les valeurs enregistrees

     console.log(fullName);
     console.log(email);
     console.log(title);
     console.log(org);
     console.log(telMatrix);
     */




});

//recupere toutes les cles valeurs d'un fichier vCard
function parse_key_value() {
    var imax = input_lines.length;

    var tmp = [];
    var tmp2 = []
    var tmp3 = []


    for (i = 0; i < imax; i++) {
        tmp[i] = input_lines[i].split(':');
        if (tmp[i][0] == "BEGIN") {
            for (i = 0; i < imax; i++) {
                tmp[i] = input_lines[i].split(':');
                if (tmp[i][0] != "END" && tmp[i][0] != imax && tmp[i][0] != undefined) {
                    key[i] = tmp[i][0];
                    value[i] = tmp[i][1];
                    tmp2[i] = key[i].split(';');
                    if (tmp2[i][1] != undefined) {
                        tmp3[i] = tmp2[i][1].split(',');
                        keyvalue[i] = tmp3[i][0];
                    }
                    key[i] = tmp2[i][0];
                }
                if (tmp[i][0] == "END") {
                    key[i] = "END";
                }
            }
        }
    }
}

//cree les contacts avec les informations : nom, prenom, organisation, title, et numéros de téléphones et leurs types
function createcontact() {
    var tmp1 = [];
    var imax = input_lines.length;
    nbrContact = 0;


    for (i = 0; i < imax; i++) {


        //enregistrement des valeurs dans des tableaux
        if (key[i] == "ORG") {
            org[nbrContact] = value[i].replace('\r', "");
        }

        if (key[i] == "TITLE") {
            title[nbrContact] = value[i].replace('\r', "");
        }


        if (key[i] != undefined && key[i] == "N") {

            nbrContact++;


            tmp1[i] = value[i].split(';');
            fName[nbrContact] = tmp1[i][0];
            lName[nbrContact] = tmp1[i][1].replace("\r", "");
            fullName[nbrContact] = lName[nbrContact] + " " + fName[nbrContact];


        }


        while (key[i] == "TEL" && key[i] != "END" && value[i] != undefined) {
            numTel[i] = "(" + value[i].replace('\r', "") + ")" + nbrContact;
            typeTel[i] = "(" + keyvalue[i] + ")" + nbrContact;
            i++;
        }

        if (key[i] == "EMAIL") {
            email[nbrContact] = value[i].replace('\r', "");
        }
    }


}

//clean la variable numTel et Typetel et les mettre dans un telMatrix
function cleanTel() {
    var imax = input_lines.length;
    var tmpPhone = [];
    var j;
    var tmpType = [];


    for (i = 0; i < imax; i++) {
        if (numTel[i] != undefined && typeTel[i] != undefined) {
            tmpPhone[i] = numTel[i].split(')');
            tmpType[i] = typeTel[i].split(')');
            j = tmpPhone[i][1];
            tmpPhone[i] = tmpPhone[i][0].split('(');
            tmpType[i] = tmpType[i][0].split('(');
            telMatrix[nbrPhones] = j + tmpType[i] + tmpPhone[i];
            nbrPhones++;

        }


    }
}

//renvoie les numeros de telephone d'un contact
function phoneOf(contactNbr) {
    var tmpSplit = [];
    var tmpPhone = [];
    var tmp = [];
    var c = [];

    for (j = 0; j <= nbrPhones; j++) {
        if (telMatrix[j] != undefined) {
            tmpSplit[j] = telMatrix[j].split(',');

            if (tmpSplit[j][0] != undefined && tmpSplit[j][1] != undefined && tmpSplit[j][2] != undefined) {
                c[j] = tmpSplit[j][0];
                tmpPhone[j] = tmpSplit[j][2];
            }
        }
    }

    j = 0;
    while (j <= nbrPhones) {
        if (contactNbr == c[j]) {
            tmp[j] = Array(tmpPhone[j]);
        }
        j++;
    }


    tmp = cleanArray(tmp);
    return tmp;
}

//renvoie les types de numeros de telephone d'un contact dans le meme ordre des numeros de la fonction phoneOF()
function phoneTypeOf(contactNbr) {
    var tmpSplit = [];
    var tmpType = [];
    var tmp = [];
    var c = [];

    for (j = 0; j <= nbrPhones; j++) {
        if (telMatrix[j] != undefined) {
            tmpSplit[j] = telMatrix[j].split(',');

            if (tmpSplit[j][0] != undefined && tmpSplit[j][1] != undefined && tmpSplit[j][2] != undefined) {
                c[j] = tmpSplit[j][0];
                //console.log(c[j]);
                tmpType[j] = tmpSplit[j][1];
            }
        }
    }

    j = 0;
    while (j < jmax) {
        if (contactNbr == c[j]) {
            tmp[j] = Array(tmpType[j]);
        }
        j++;
    }

    tmp = cleanArray(tmp);
    return tmp;


}

//Enleve les valeurs NULL ou undefined d'un tableau
function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i]);
        }
    }
    return newArray;
}


function writeCSV() {
    var ligne = [];


    for (i = 1; i <= nbrContact; i++) {
        if (fName[i] != undefined && lName[i] != undefined) {

            ligne[i] = fName[i] + ";" + lName[i] + ";" + org[i] + ";" + title[i] + ";" + phoneOf(i)[0] + ";" + phoneOf(i)[1] + ";" + email[i] + "\n";
            //console.log(ligne[i]);
        }

        fs.appendFile("csvFile.csv", ligne[i], function (err) {
            if (err) {
                console.log(err);
            } else {
                //console.log("le " + i + " a été enregistré ");
            }
        });
    }
}


















