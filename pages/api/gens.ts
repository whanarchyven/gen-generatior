import {NextApiRequest,NextApiResponse} from "next";
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');


async function openDb() {
    return sqlite.open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
    });
}




export default async function getAllGens(req:NextApiRequest,res:NextApiResponse){
    const getGens=async ()=>{
        try {
            const db=await openDb();
            const gens= await db.all('SELECT * FROM Gen');
            res.json(gens);
        }
        catch (e){
            console.log(e);
        }
    }

    const wrtieNewGen=async ()=>{
        try {
            const db=await openDb();

            const result=await db.run(`INSERT INTO Gen ( gen_name, rarity,str_increase,vit_increase,int_increase,krm_increase,dex_increase) VALUES (?,?,?,?,?,?,?)`,'req.body.gen_name','req.body.rarity','req.body.str_increase', 'req.body.vit_increase', 'req.body.int_increase', 'req.body.krm_increase', 'req.body.dex_increase');
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(req.body);
        }
        catch (e){
            console.log(e);
        }
    }

    if (req.method=='GET'){
        getGens();
    }
    if(req.method=='POST'){
        wrtieNewGen();
    }

}