import {NextApiRequest, NextApiResponse} from "next";
// import sqlite from 'sqlite';
// import sqlite3 from "sqlite3";
// import {open} from "sqlite";
import {MongoClient} from "mongodb";
import * as mongoose from "mongoose";
import NextCors from "nextjs-cors";
import {mongo} from "mongoose";
// async function openDb() {
//     return open({
//         filename: './database.sqlite',
//         driver: sqlite3.Database,
//     });
// }

import initMiddleware from '../../components/init-middleware'

// const cors = initMiddleware(
//     // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
//     Cors({
//         // Only allow requests with GET, POST and OPTIONS
//         methods: ['GET', 'POST', 'OPTIONS'],
//     })
// )

export default async function getAllGens(req:NextApiRequest,res:NextApiResponse){

    // await NextCors(req, res, {
    //     // Options
    //     methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    //     origin: '*',
    //     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    // });
    //
    // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const MongoClient = require('mongodb').MongoClient;
// Connect to the db

    const client= new MongoClient('mongodb://mf_gen_test:vfGxG38Z54501<ia@89.208.208.250/mf_bunnies_generation_test');

    const getTop= async ()=>{
        try{
            await client.connect();
            console.log('Connected successfull');
            // await client.db().createCollection('gens');
            const users=client.db().collection('gens');
            // await users.insertOne({
            //     category: 'eyes',
            //     type: 'gen',
            //     name: 'EY_12_Paint-pink',
            //     short_name:'Paint-pink',
            //     rarity: 'uncommon',
            //     str: 3,
            //     dex: 3,
            // });

            // for(let i=0;i<10;i++){
            //     const user= await users.findOne(function() { if(this.score>=max){max=this.score;return this.score} });
            // }

            const user= await users.find().toArray();
            // console.log(user);

            return res.json(user);
            // return res.json(users);
        } catch (e){
            console.log(e)
        }
    }

    const writeNew=async ()=>{
        try{
            await client.connect();
            console.log('Connected succesfull');
            // await client.db().createCollection('gens');
            const users=client.db().collection('gens');
            // console.log('AUESALUT '+req.body.name+req.body.score)

            const some=await users.findOne({name:req.body.name});

            if(some!=null){
                users.findOneAndUpdate({name:req.body.name}, {$set:{str:req.body.str,dex:req.body.dex,vit:req.body.vit,int:req.body.int,krm:req.body.krm}},{upsert:true})
            }
            else{
                await users.insertOne({
                    category: req.body.category,
                    type: req.body.type,
                    name: req.body.name,
                    short_name:req.body.short_name,
                    rarity: req.body.rarity,
                    str: req.body.str,
                    dex: req.body.dex,
                    int: req.body.int,
                    krm: req.body.krm,
                    vit: req.body.vit,
                });
            }

            return res.status(200).send('ok');


            // await users.insertOne({
            //     category: 'eyes',
            //     type: 'gen',
            //     name: 'TEST2',
            //     short_name:'Paint-pink',
            //     rarity: 'uncommon',
            //     str: 3,
            //     dex: 3,
            //     vit:3,
            //     krm:2,
            //     int:1,
            // });

        } catch (e){
            console.log(e)
        }
    }

    // const db = await openDb();
    if (req.method=='POST'){
        return writeNew();
    }

    if(req.method=='GET'){
        return getTop();
    }
    // const players=await db.all('select * from player')
    // console.log(players);
    // res.json(players)








}