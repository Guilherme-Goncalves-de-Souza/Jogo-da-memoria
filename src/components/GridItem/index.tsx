import { GridItemType } from '../../types/GridItemTypes'
import * as C from './styles'

import iconePadraoB7 from '../../svgs/b7.svg'
import { items } from '../../dados/items'

type Props = {
    item: GridItemType,
    onClick: () => void
}

export function GridItem( {item, onClick}: Props){
    return(
        <C.Container 
            backgroundVirado={item.viradoPermanente || item.virado}
            onClick={onClick}
        > 
            {item.viradoPermanente === false && item.virado === false &&
                <C.Icone src={iconePadraoB7} opacity={.5}/> 
            }

            {(item.viradoPermanente || item.virado) && item.item !== null &&
                <C.Icone src={items[item.item].icon} /> 
            }
        </C.Container>
    )
}