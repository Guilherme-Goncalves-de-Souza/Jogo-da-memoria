import * as C from './styles'

type Props = {
    titulo: string,
    valor: string,
}

export function InfoItem( {titulo, valor}: Props ){
    return(
        <C.Container>
            <C.Tempo> 
                {titulo} 
            </C.Tempo>

            <C.Movimentos>
                {valor}
            </C.Movimentos>
        </C.Container>
    )
}