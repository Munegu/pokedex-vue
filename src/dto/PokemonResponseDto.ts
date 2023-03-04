import {Pokemon} from "@/models/Pokemon";

export interface PokemonResponseDto {
    count: number;
    next: string|null;
    previous: string|null;
    results: Pokemon[];
}
