import React, {useState} from 'react';
import ItemCardInterface from "../interfaces/itemCardInterface";
import ItemCard from "./ItemCard";

interface generatePopInterface{
    item:ItemCardInterface;
    togglePop:()=>any;
}
const GeneratePop = ({item,togglePop}:generatePopInterface) => {

    const getRandomArbitrary=(min:number, max:number)=> {
        return Math.round(Math.random() * (max - min) + min);
    }

    const generateFirstStage=(rarity:'common'|'uncommon'|'rare')=>{
        let result=0;
        switch (rarity){
            case 'common':
                result=getRandomArbitrary(1,2);
                return result;
                break;
            case "uncommon":
                result=getRandomArbitrary(2,4);
                return result;
                break;
            case "rare":
                result=getRandomArbitrary(4,8);
                return result;
                break;
        }
    }

    const generateSecondStage=(rarity:'common'|'uncommon'|'rare')=>{
        const stats: ('str' | 'dex' | 'int' | 'krm' | 'vit')[] = [
            'str', 'dex', 'vit', 'int',
        ]
        let times=0;
        let generated_stats:('str' | 'dex' | 'int' | 'krm' | 'vit')[]=[]
        switch (rarity){
            case "common":times=1;break;
            case "uncommon":times=2;break;
            case "rare":times=3;break;
        }
        for(let i=0;i<times;i++){
            let stat = stats[Math.floor(Math.random() * stats.length)]
            if(generated_stats.find(stat_temp=>stat_temp==stat)){
                console.log('TWINK')
            }
            else{
                generated_stats.push(stat);
            }
        }
        console.log(generated_stats)
        setSecondScore([...generated_stats]);
    }

    const generateThirdScore=()=>{
        let result:{stat_name:'vit'|'dex'|'int'|'str'|'krm',stat_score:number}[]=[];
        let increaselimit=firstScore;
        let times=secondScore.length;
        for(let i=0;i<times;i++){
            let increase=0;
            if(i+1==times){
                increase=increaselimit
            }
            else{
                increase=getRandomArbitrary(1,increaselimit-1);
                increaselimit=increaselimit-increase;
            }
            let obj:{stat_name:'vit'|'dex'|'int'|'str'|'krm',stat_score:number}={
                stat_name:secondScore[i],
                stat_score:increase,
            }
            result.push(obj);
        }
        if(result.findIndex(proverka=>proverka.stat_score==0)!=-1){
            let max=0;
            let max_index=0;
            result.map((item,item_index)=>{
                if(item.stat_score>max){
                    max=item.stat_score;
                    max_index=item_index;
                }
            })
            result[max_index].stat_score--;
            result[result.findIndex(proverka=>proverka.stat_score==0)].stat_score+=1;
        }
        setThirdScore(result);
    }

    const generateThirstScore=()=>{
        let temp={...item}
        // temp.item.increase={}

        let temp_increase:{str?:number,dex?:number,vit?:number,int?:number,krm?:number}={}

        thirdScore.map(stat=>{
            temp_increase[stat.stat_name]=stat.stat_score
        })
        temp.item.increase=temp_increase;
        setThirstScore({...temp.item})
    }


    const saveResult=()=>{

        let object={
            category: thirstScore.category,
            type: thirstScore.type,
            name: thirstScore.name,
            short_name:thirstScore.short_name,
            rarity: thirstScore.rarity,
            str: 0,
            dex: 0,
            int: 0,
            krm: 0,
            vit: 0,
        }

        if(thirstScore.increase?.str){
            object.str=thirstScore.increase?.str
        }
        if(thirstScore.increase?.dex){
            object.dex=thirstScore.increase?.dex
        }
        if(thirstScore.increase?.int){
            object.int=thirstScore.increase?.int
        }
        if(thirstScore.increase?.vit){
            object.vit=thirstScore.increase?.vit
        }
        if(thirstScore.increase?.krm){
            object.krm=thirstScore.increase?.krm
        }

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                alert(xhr.responseText);
            }
        }
        xhr.open("POST", 'https://gen-generatior.vercel.app/api/gens', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(object));
    }


    const [currentStage,setCurrentStage]=useState(0)
    const [firstScore,setFirstScore]=useState(0)

    const second_temp:('str'|'dex'|'vit'|'int'|'krm')[]=['str','dex']

    const [secondScore,setSecondScore]=useState(second_temp)

    const third_temp:{stat_name:'vit'|'dex'|'int'|'str'|'krm',stat_score:number}[]=[
        {stat_name:'vit',stat_score:0},{stat_name:'vit',stat_score:0}
    ]

    const [thirdScore,setThirdScore]=useState(third_temp)
    const [thirstScore,setThirstScore]=useState({...item.item})


    if(currentStage==0){
        return (
            <div className={'w-full h-[100vh] top-0 left-0 fixed z-50 bg-black flex justify-around flex-col w-full items-center'}>
                    <div className={'w-[400px] h-[600px]'}>
                    <ItemCard item={item.item}></ItemCard>
                </div>
                <button className={'bg-white rounded-2xl w-48 h-10'} onClick={()=>{setCurrentStage(1);setFirstScore(generateFirstStage(item.item.rarity))}}>Generate</button>
                <p className={'text-3xl cursor-pointer absolute top-2 right-2 text-white'} onClick={()=>{togglePop()}}>X</p>
            </div>
        );
    }
    else if(currentStage==1){
        return <div className={'w-full h-[100vh] top-0 left-0 fixed z-50 bg-black flex items-center flex-wrap flex-col justify-around'}>
            <p className={'text-white text-5xl'}>You are generating points for {item.item.rarity} item now:</p>
            <p className={'text-white text-5xl'}>{firstScore}</p>
            <button className={'bg-white rounded-2xl w-48 h-10'} onClick={()=>{setFirstScore(generateFirstStage(item.item.rarity))}}>Regenerate</button>
            <button className={'bg-white rounded-2xl w-48 h-10'} onClick={()=>{setCurrentStage(2);generateSecondStage(item.item.rarity)}}>Next</button>
            <p className={'text-3xl cursor-pointer absolute top-2 right-2 text-white'} onClick={()=>{togglePop()}}>X</p>
        </div>
    }
    else if(currentStage==2){
        return <div className={'w-full h-[100vh] top-0 left-0 fixed z-50 bg-black flex items-center flex-wrap flex-col justify-around'}>
            <p className={'text-white text-5xl'}>You are generated this stats for {item.item.rarity} item</p>
            {secondScore.map(stat=>{return <p className={'text-white text-5xl'} key={stat}>{stat}</p>})}
            {/*{generateSecondStage(item.item.rarity)}*/}
            <button className={'bg-white rounded-2xl w-48 h-10'} onClick={()=>{generateSecondStage(item.item.rarity)}}>Regenerate</button>
            <button className={'bg-white rounded-2xl w-48 h-10'} onClick={()=>{setCurrentStage(3);generateThirdScore()}}>Next</button>
            <p className={'text-3xl cursor-pointer absolute top-2 right-2 text-white'} onClick={()=>{togglePop()}}>X</p>
        </div>
    }
    else if(currentStage==3){
        return <div className={'w-full h-[100vh] top-0 left-0 fixed z-50 bg-black flex items-center flex-wrap flex-col justify-around'}>
            <p className={'text-white text-5xl'}>You are managing your points to your stats for {item.item.rarity} item now:</p>
            {thirdScore.map(stat=>{return <p className={'text-white text-5xl'} key={stat.stat_name}>{stat.stat_name} ---- {stat.stat_score}</p>})}
            {/*{generateSecondStage(item.item.rarity)}*/}
            <button className={'bg-white rounded-2xl w-48 h-10'} onClick={()=>{generateThirdScore()}}>Regenerate</button>
            <button className={'bg-white rounded-2xl w-48 h-10'} onClick={()=>{setCurrentStage(4);generateThirstScore()}}>Next</button>
            <p className={'text-3xl cursor-pointer absolute top-2 right-2 text-white'} onClick={()=>{togglePop()}}>X</p>
        </div>
    }
    else if(currentStage==4){
        return <div className={'w-full h-[100vh] top-0 left-0 fixed z-50 bg-black flex items-center flex-wrap flex-col justify-around'}>
            <p className={'text-white text-5xl'}>Your generated Item:</p>
            <div className={'w-[400px] h-[600px]'}>
                <ItemCard item={thirstScore}></ItemCard>
            </div>
            <button className={'bg-white rounded-2xl w-48 h-10'} onClick={()=>{saveResult();console.log('sended');togglePop()}}>Finish</button>
            {/*<button className={'bg-white rounded-2xl w-48 h-10'}>Save</button>*/}
            <p className={'text-3xl cursor-pointer absolute top-2 right-2 text-white'} onClick={()=>{togglePop()}}>X</p>
        </div>
    }
    else{
        return <div></div>
    }
};

export default GeneratePop;