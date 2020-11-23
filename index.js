var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'ghc'
});

//RESTFul client
var app = express();
var publicDir = (__dirname+'/public');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// $$$$$$$$$$$$$$$$$$$$$$$$$ PROFESSEUR $$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//Get all professeur
app.get("/AllProf",(req,res,next)=>{
    con.query('SELECT * FROM professeur',function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(result);
            console.log(result);
        }else{
            res.json(result)
            console.log("Aucun ligne trouvé");
        }
    });
});
//Get  professeur by id

app.post("/ProfbyId",(req,res,next)=>{
    var post_data = req.body;
    var matricule = post_data.matricule;
    con.query('SELECT * FROM professeur WHERE matricule="'+matricule+'"',function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(result);
            console.log(result);
        }else{
            res.json(result)
            console.log("Aucun ligne trouvé");
        }
    });
});

// Update professeur
app.post("/UpdateProf",(req,res,next)=>{
    var post_data = req.body;
    var matricule = post_data.matricule;
    var nom = post_data.nom;
    con.query("UPDATE `professeur` SET `nom` = '"+nom+"' WHERE `matricule` = '"+matricule+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('Update error');
        });
        res.json('Professeur successful updated');
        console.log(result);
    });
});

// Delete professeur
app.post("/DeleteProf",(req,res,next)=>{
    var post_data = req.body;
    var matricule = post_data.matricule;
    con.query("DELETE FROM `professeur` WHERE `matricule` = '"+matricule+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('Update error');
        });
        res.json('Professeur successful deleted');
        console.log(result);
    });
});

// Ajout professeur
app.post("/AddProf",(req,res,next)=>{
    var post_data = req.body;
    var matricule = post_data.matricule;
    var nom = post_data.nom;
    con.query("INSERT INTO `professeur`(`matricule`, `nom`) VALUES('"+matricule+"','"+nom+"') ON DUPLICATE KEY UPDATE nom='"+nom+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('erreur d ajout');
        });
        res.json('Professeur added succesful');
        console.log(result);
    });
});

// $$$$$$$$$$$$$$$$$$$$$$$$$ MATIERE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// Ajout matiere
app.post("/AddMatiere",(req,res,next)=>{
    var post_data = req.body;
    var numero = post_data.numero;
    var designation = post_data.designation;
    var nbheure = post_data.nbheure;
    con.query("INSERT INTO `matiere`(`numero`, `designation`,`nbheure`) VALUES('"+numero+"','"+designation+"','"+nbheure+"') ON DUPLICATE KEY UPDATE designation='"+designation+"',nbheure='"+nbheure+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('erreur d ajout');
        });
        res.json('Matiere added succesful');
        console.log(result);
    });
});

// Update Matiere
app.post("/UpdateMatiere",(req,res,next)=>{
    var post_data = req.body;
    var numero = post_data.numero;
    var designation = post_data.designation;
    var nbheure = post_data.nbheure;
    con.query("UPDATE `matiere` SET `designation` = '"+designation+"', `nbheure`='"+nbheure+"' WHERE `numero` = '"+numero+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('Update error');
        });
        res.json('Matiere successful updated');
        console.log(result);
    });
});

// Delete Matiere
app.post("/DeleteMatiere",(req,res,next)=>{
    var post_data = req.body;
    var numero = post_data.numero;
    con.query("DELETE FROM `matiere` WHERE `numero` = '"+numero+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('Update error');
        });
        res.json('Matiere successful deleted');
        console.log(result);
    });
});
//Get matiere by id
app.get("/MatiereById",(req,res,next)=>{
    var post_data = req.body;
    var numero = post_data.numero;
    con.query('SELECT * FROM matiere WHERE numero="'+numero+'"',function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(result);
            console.log(result);
        }else{
            res.json("Aucun ligne trouvé");
        }
    });
});

//Get all matiere
app.get("/AllMatiere",(req,res,next)=>{
    con.query('SELECT * FROM matiere',function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(result);
            console.log(result);
        }else{
            res.json("Aucun ligne trouvé");
        }
    });
});

// $$$$$$$$$$$$$$$$$$$$$$$$$ VOLUME HORAIRE $$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// ajout volume horaire
app.post("/AddVolume",(req,res,next)=>{
    var post_data = req.body;
    var numero = post_data.numero;
    var matricule = post_data.matricule;
    var taux = post_data.taux;
    con.query("INSERT INTO `volumehoraire`(`numero`, `matricule`,`taux`) VALUES('"+numero+"','"+matricule+"','"+taux+"') ON DUPLICATE KEY UPDATE taux='"+taux+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('erreur d ajout');
        });
        res.json('added succesful');
        console.log(result);
    });
});

// Update volume
app.post("/UpdateVolume",(req,res,next)=>{
    var post_data = req.body;
    var numero = post_data.numero;
    var matricule = post_data.matricule;
    var taux = post_data.taux;
    con.query("UPDATE `volumehoraire` SET `taux` = '"+taux+"' WHERE `numero` = '"+numero+"' AND `matricule` = '"+matricule+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('Update error');
        });
        res.json('succesful updated');
        console.log(result);
    });
});

// delete volume
app.post("/DeleteVolume",(req,res,next)=>{
    var post_data = req.body;
    var numero = post_data.numero;
    var matricule = post_data.matricule;
    con.query("DELETE FROM `volumehoraire` WHERE `numero` = '"+numero+"' AND `matricule` = '"+matricule+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('Update error');
        });
        res.json('succesful deleted');
        console.log(result);
    });
});

//Get volume by id

app.post("/VolumeById",(req,res,next)=>{
    var post_data = req.body;
    var numero = post_data.numero;
    var matricule = post_data.matricule;
    con.query("SELECT * FROM `volumehoraire` WHERE `numero` = '"+numero+"' AND `matricule` = '"+matricule+"'",function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error);
            res.json('Update error');
        });
        if(result && result.length){
            res.json(result);
        }else{
            res.json("aucun ligne trouver!")
        }
    });
});


//Get all volume
app.get("/AllVolume",(req,res,next)=>{
    con.query('SELECT * FROM volumehoraire',function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(result);
        }else{
            res.json("aucun ligne trouver!")
        }
    });
});

// %%%%%%%%%%%%%% BULLETIN DE PAIE %%%%%%%%%%%%%%%%%%%%%%%%%%%%
app.post("/BulletinPaie",(req,res,next)=>{
   var post_data = req.body;
   var matricule = post_data.matricule;
   var sql = "SELECT matiere.designation, volumehoraire.taux, matiere.nbheure, matiere.nbheure*volumehoraire.taux AS Montant FROM matiere INNER JOIN volumehoraire ON volumehoraire.numero = matiere.numero WHERE volumehoraire.matricule = '"+matricule+"'";
   con.query(sql,function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(result);
            console.log(result);
        }else{
            res.json("No data to shows");
        }
   }); 
});
app.get("/profTravailler",(req,res,next)=>{
    var sql = "SELECT professeur.matricule, professeur.nom FROM professeur where professeur.matricule in (select DISTINCT volumehoraire.matricule from volumehoraire)";
    con.query(sql,function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(result);
        }else{
            res.json("aucun ligne trouver!")
        }
    });
});
app.post("/MTpaie",(req,res,next)=>{
    var post_data = req.body;
    var matricule = post_data.matricule;
    var req_sql = "SELECT SUM(x.Mt) Montant FROM (SELECT matiere.nbheure*volumehoraire.taux AS Mt FROM matiere INNER JOIN volumehoraire ON volumehoraire.numero = matiere.numero WHERE volumehoraire.matricule ='"+matricule+"')x";
    con.query(req_sql,function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(JSON.stringify(result));
            console.log(JSON.stringify(result));
        }else{
            res.json("aucun ligne trouver!")
        }
    });
});
//%%%%%%%%%%%%%%%Heure complementaires par professeurs%%%%%%%%%%
//SELECT DISTINCT tt.a, tt.b, SUM(tt.c) from (SELECT volumehoraire.matricule a, professeur.nom b, matiere.nbheure*volumehoraire.taux c FROM professeur INNER JOIN volumehoraire ON volumehoraire.matricule = professeur.matricule INNER JOIN matiere ON matiere.numero = volumehoraire.numero)tt GROUP by tt.a
app.get("/hcParProf",(req,res,next)=>{
    var req_sql = "SELECT DISTINCT tt.a matricule, tt.b nom, SUM(tt.c) montant from (SELECT volumehoraire.matricule a, professeur.nom b, matiere.nbheure*volumehoraire.taux c FROM professeur INNER JOIN volumehoraire ON volumehoraire.matricule = professeur.matricule INNER JOIN matiere ON matiere.numero = volumehoraire.numero)tt GROUP by tt.a";
    con.query(req_sql,function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(result);
        }else{
            res.json("aucun ligne trouver!")
        }
    });
});

app.get("/MThcParProf",(req,res,next)=>{
    var req_sql = "SELECT SUM(X.montant) montant FROM (SELECT DISTINCT tt.a matricule, tt.b nom, SUM(tt.c) montant from (SELECT volumehoraire.matricule a, professeur.nom b, matiere.nbheure*volumehoraire.taux c FROM professeur INNER JOIN volumehoraire ON volumehoraire.matricule = professeur.matricule INNER JOIN matiere ON matiere.numero = volumehoraire.numero)tt GROUP by tt.a)X";
    con.query(req_sql,function(error,result,fields){
        con.on('error',function(error){
            console.log('[MYSQL]ERROR',error)
        });
        if(result && result.length){
            res.json(JSON.stringify(result));
            console.log(JSON.stringify(result));
        }else{
            res.json("aucun ligne trouver!")
        }
    });
});



app.listen(3000,()=>{
            console.log('Connected to Mysql server, server 3000');
})