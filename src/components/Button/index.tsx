import * as C from './styles'


type Props = {
    icone?: any;
    titulo: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button( {icone, titulo, onClick}: Props ){
    return(
        <C.Button onClick={onClick}> 
            {icone && 
                <C.Icone src={icone} />
            }
            <C.Titulo> {titulo} </C.Titulo>
        </C.Button>
    )
}