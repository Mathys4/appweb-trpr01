export interface Movie {
    id : number
    name : string
    producer : string
    releaseDate : string
    duration : number
    category : MovieCategory
    description : string
    stock : number,
    imageUrl : string
}

export type MovieCategory = 'Horreur' | 'Action' | 'Comédie' | 'Science-fiction' | 'Drame' | 'Thriller' | 'Romance';
export type StockFilter = 'Tous' | 'Dispo' | 'Aucun';

export enum MovieCategoryEnum {
    Horreur = 'Horreur',
    Action = 'Action',
    Comedie = 'Comédie',
    ScienceFiction = 'Science-fiction',
    Drame = 'Drame',
    Thriller = 'Thriller',
    Romance = 'Romance'
}

export const movieCategories = Object.values(MovieCategoryEnum) as MovieCategory[]