import React from 'react';
import Image from "next/image";
interface statRequirementBar{
    stat_value:any,
    stat_name:string,
}

const whichStat:any=(stat:any)=>{
    switch (stat) {
        case 'str':
            return 'linear-gradient(90deg, #C74A54 0%, #FF3F4E 100%)'
        case 'dex':
            return 'linear-gradient(90deg, #A34EDF 0%, #EE87FF 100%)'
        case 'vit':
            return 'linear-gradient(90deg, #5F61FF 0%, #49B3FF 100%)'
        case 'int':
            return 'linear-gradient(90deg, #5FD9FF 0%, #7CFFF7 100%)'
        case 'krm':
            return 'linear-gradient(90deg, #65D6CB 0%, #5FFFCF 100%)'
    }
}

export const StatRequirementBar = ({stat_value,stat_name}:statRequirementBar) => (
        <div style={{background:`${whichStat(stat_name)}`}} className={'h-full w-full rounded-full flex items-center'}>
            <div className={'w-5 h-5 rounded-full ml-0.5 flex justify-center items-center relative justify-self-start'}>
                <div className={'absolute bg-white rounded-full w-full h-full opacity-30'}>

                </div>
                <div className={'absolute w-3/5 h-3/5'}>
                    <Image src={'/images/stats_icons/'+stat_name+'_white.svg'} layout={'fill'}></Image>
                </div>
            </div>
            <p className={'justify-self-end ml-0.5 text-white font-bold'}>{stat_value}</p>
            <p className={'justify-self-end ml-2 text-white font-bold'}>{stat_name.toUpperCase()}</p>
        </div>
)

export default StatRequirementBar;