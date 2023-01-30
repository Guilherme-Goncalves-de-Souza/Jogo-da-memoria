export function formatarTempo(segundos: number): string{
    let minutos = Math.floor(segundos / 60) // Só pega o inteiro
    segundos -= (minutos * 60)

    let segundosString = `${segundos < 10 ? '0'+segundos : segundos}`
    let minutosString = `${minutos < 10 ? '0'+minutos : minutos}`

    return `${minutosString}:${segundosString}`
}