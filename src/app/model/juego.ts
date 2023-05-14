
export interface Juego {
    id:          number;
    nombre:      string;
    fecha:       number;
    nota:        number;
    companion:   string;
    nivel:       number;
    generos:     string[];
    plataformas: string[];
    musica:      Array<null | string>;
    imagenes:    Array<null | string>;
}
