export const getImage = (id: number, shiny = false): string => {
    if(shiny){
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
    }
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export const getId = (url: string): number => {
    const host = 'https://pokeapi.co/api/v2/pokemon/';
    const removeHost = url.split(host)[1];
    return  + removeHost.slice(0, -1);
}
