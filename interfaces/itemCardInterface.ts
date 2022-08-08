export default interface ItemCardInterface {
    item: {
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
}