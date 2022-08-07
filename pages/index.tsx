import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from "react";
import it from "node:test";

const Home: NextPage = () => {

    const data:{category:string,type:'gen'|'item',name:string,rarity:'common'|'uncommon'|'rare',increase?:{str?:number,dex?:number,krm?:number,int?:number,vit?:number}}[]=[
        {
            category:'eyes',
            type:'gen',
            name:'EY_01_Pixel-Happy',
            rarity:'common',
        },
        {
            category:'eyes',
            type:'gen',
            name:'EY_02_Pixel-sad',
            rarity:'common',
        },
        {
            category:'eyes',
            type:'gen',
            name:'EY_03_Pixel-love',
            rarity:'rare',
            increase:{
                str: 5,
                dex:2,
                int:2,
            }
        },
        {
            category:'eyes',
            type:'gen',
            name:'EY_12_Paint-pink',
            rarity:'uncommon',
            increase:{
                str:3,
                dex:3,
            }
        },
    ]

    const [workData,setWorkData]=useState(data);

    const stats:('str'|'dex'|'int'|'krm'|'vit')[]=[
        'str','dex','vit','int','krm'
    ]

    const rarities=[
        {
            rarity:'common',
            categories:1,
            increase:3,
        },
        {
            rarity:'uncommon',
            categories:2,
            increase:6,
        },
        {
            rarity:'rare',
            categories:3,
            increase:9,
        }
    ]

    const getProperties=(item:{category:string,type:'gen'|'item',name:string,rarity:'common'|'uncommon'|'rare',increase?:{str?:number,dex?:number,krm?:number,int?:number,vit?:number}})=>{
        if(item.increase){
            let data=Object.entries(item.increase)
            return <div className={'flex flex-col'}>{data.map(stat=>{
                return<div className={'text-white'} key={stat[0]}>
                    {stat[0]} - {stat[1]}
                </div>
            })}</div>
        }
    }

    const calculateProperties=(rarity_p:string)=>{
        let result:{stat_res:'str'|'dex'|'int'|'krm'|'vit',stat_value:number}[]=[];
        let rar=rarities.find(item=>item.rarity==rarity_p);
        let stat_temps=stats;
        if(rar){
            const getRandomArbitrary=(max:number)=> {
                return Math.floor(Math.random() * (max - 1) + 1);
            }
            let increase_limit=rar.increase;
            for(let i=0;i<rar.categories;i++){
                let stat=stat_temps[Math.floor(Math.random() * stat_temps.length)]
                let delIndex=stat_temps.indexOf(stat);
                if(delIndex!=-1){
                    stat_temps.splice(delIndex,1);
                }
                let stat_increase=0;
                if(i+1==rar.categories){
                    stat_increase=increase_limit;
                }
                else{
                    stat_increase=getRandomArbitrary(increase_limit);
                    increase_limit= increase_limit-stat_increase;
                }
                let obj={
                    stat_res:stat,
                    stat_value:stat_increase,
                }
                result.push(obj);
            }
        }
        return result;
    }


    const setProperties=(index:number,res_item:{category:string,type:'gen'|'item',name:string,rarity:'common'|'uncommon'|'rare',increase?:{str?:number,dex?:number,krm?:number,int?:number,vit?:number}})=>{
        let temp=[...workData];
        let get_categories=calculateProperties(temp[index].rarity);
        let temp_obj= {...res_item};
        let increase:{str?:number,
            dex?:number,
            vit?:number,
            int?:number,
            krm?:number,}={}
        get_categories.map(item=>{
            increase[item.stat_res]=item.stat_value;
        })
        temp_obj.increase=increase;
        temp[index]=temp_obj;
        setWorkData([...temp])
    }


  return (
    <div className={'bg-black'}>
      <Head>
        <title>GEN GENERATOR</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <div className={'w-full'}>
              {workData.map((item,item_index)=>{
                  return <div className={'grid-cols-8 gap-4 w-full grid border-2 border-white'} key={item.name}>
                      <div className={'h-16 relative'}>
                          <Image src={'/images/'+item.category+'/'+item.name+'.png'} layout={'fill'}></Image>
                      </div>
                      <div className={'text-white'}>
                          {item.type}
                      </div>
                      <div className={'text-white'}>
                          {item.category}
                      </div>
                      <div className={'text-white'}>
                          {item.name}
                      </div>
                      <div className={'text-white'}>
                          {item.rarity}
                      </div>
                      {item.increase!=undefined?getProperties(item):null}
                      <div className={'col-start-8 p-2 '}>
                          <button className={'bg-white text-2xl w-full h-full rounded-xl'} onClick={()=>{setProperties(item_index,item)}}>{item.increase!=undefined?'Regenerate':'Generate'}</button>
                      </div>
                  </div>
              })}
          </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
