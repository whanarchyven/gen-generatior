import React from 'react';
import Image from "next/image";
import ItemCardInterface from "../interfaces/itemCardInterface";
import StatRequirementBar from "./StatRequirementBar";

const ItemCard = ({item}: ItemCardInterface) => {


    const getProperties = (item: {
                               category: string,
                               type: 'gen' | 'item',
                               name: string,
                               short_name: string,
                               rarity: 'common' | 'uncommon' | 'rare',
                               increase?: {
                                   str?: number,
                                   dex?: number,
                                   krm?: number,
                                   int?: number,
                                   vit?: number
                               }
                           }
    ) => {
        if (item.increase) {
            let data = Object.entries(item.increase)
            return <div className={'grid grid-cols-2 w-48 gap-4'}>{data.map(stat => {
                if(stat[1]!=0){
                    return <StatRequirementBar stat_value={stat[1]} stat_name={stat[0]} key={stat[0]}></StatRequirementBar>
                }
                else{
                    return null
                }
            })}</div>
        }
    }

    return (
        <div className={'w-full h-full border-2 border-white flex flex-col justify-around flex-wrap relative rounded-2xl'} style={{alignItems:'center'}}>
            <div className={'relative h-[228px] w-[170px] bg-white bg-opacity-20 rounded-xl'} >
                <Image src={'/images/' + item.category + '/' + item.name + '.png'} layout={'fill'}></Image>
            </div>
            <p className={'text-white'}>{item.short_name}</p>
            <p className={'absolute rounded-full p-2 bg-white top-2 left-2'}>{item.rarity}</p>
            <p className={'absolute rounded-full p-2 bg-white top-2 right-2'}>{item.category}</p>
            {item.increase!=undefined?getProperties(item):null}
        </div>
    );
};

export default ItemCard;