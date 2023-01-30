export type GridItemType = {
    // Começa com um grid sem nada e dps preenche
    item: number | null;
    virado: boolean;
    // Lógica do jogo
// Diferencia o que está exibido agora e os que estão porque acertou
    viradoPermanente: boolean;
}

/*
    se permamente true então já exibe
    se permanente false e o virado true é pq é uma jogada do jogo
    os 2 false não exibe.
    */