import { useEffect, useState } from 'react';


import * as C from './App.styles'

import logoImage from './assets/devmemory_logo.png'
import restartImage from './svgs/restart.svg'

// Components
import { InfoItem } from './components/InfoItem';
import { Button } from './components/Button';
import { GridItem } from './components/GridItem';

// Type
import { GridItemType } from './types/GridItemTypes';

// Itens do jogo
import { items } from './dados/items'


// HELPERS
import { formatarTempo } from './helpers/formatarTempo';


function App(){
  // Saber se o jogo está rolando:
  const [jogoRolando, setJogoRolando] = useState<boolean>(false);
  // Tempo de jogo
  const [tempoJogo, setTempoJogo] = useState<number>(0);
  // Movimentos
  const [movimentos, setMovimentos] = useState<number>(0);

  // Quantas cartas abriu
  const [cartasExibindo, setCartasExibindo] = useState<number>(0)

  // Grid de fato, cria um type fora para o array
  const [gridItems, setGridItems] = useState<GridItemType[]>([])

  useEffect( () => reiniciarCriarJogo(), [])

  // TEMPO:
  useEffect ( () =>  {
    const timer = setInterval( () => {
      if(jogoRolando){
        setTempoJogo(tempoJogo + 1)
      }
      
    }, 1000);
    return () => clearInterval(timer)

  } ,[jogoRolando, tempoJogo]) 


  // Verificação dos movimentos se os 2 são iguais
  useEffect( () => {
    if(cartasExibindo === 2){ // Só quando tiver 2 itens exibindo
      let aberto = gridItems.filter(item => item.virado === true);
      if(aberto.length === 2){

        // verify 1 -> se são iguais torna eles permanentes
        if(aberto[0].item === aberto[1].item){
          let tempGrid = [...gridItems];

          for(let i in tempGrid){
            if(tempGrid[i].virado){
              tempGrid[i].viradoPermanente = true;
              tempGrid[i].virado = false;
            }
          }
          setGridItems(tempGrid)
          setCartasExibindo(0)

        } else{ // verify 2 -> se diferente só fechar eles 
          setTimeout(() => {
            let tempGrid = [...gridItems];

            for(let i in tempGrid){
              tempGrid[i].virado = false;
            }

            setGridItems(tempGrid)
            setCartasExibindo(0)
          }, 1000)
        }

        setMovimentos(movimentos => movimentos + 1)
      }
    }
  }, [cartasExibindo, gridItems])


  // Verificar se todos os itens estão abertos
  useEffect( () => {
    if(movimentos > 0 && gridItems.every(item => item.viradoPermanente === true)){
      setJogoRolando(false)
    }
  
  }, [movimentos, gridItems])

  function reiniciarCriarJogo(){
    // 1° Resetar, limpar tudo
    setTempoJogo(0)
    setMovimentos(0)
    setCartasExibindo(0)

    // 2° Criar o grid e começar o jogo
    // 2.1 Criar um grid vazio e dps preenche aleatóriamente
    let tempGrid: GridItemType[] = [];
    for(let i=0; i < (items.length * 2); i++){
      tempGrid.push({
        item: null,
        virado: false,
        viradoPermanente: false
      })
    }
    // 2.2 Preencher o grid
    for(let w=0; w < 2; w++){

      // na 1° vez preenche 6 itens aleatoriamente
      for(let i=0; i < items.length; i++){
        let posicao = -1;

        while(posicao < 0 || tempGrid[posicao].item !== null){
          posicao = Math.floor(Math.random() * (items.length * 2))
        }
        tempGrid[posicao].item = i;

      }
      // na 2° vez os outros 6 aleatoriamente
    }

    // 2.3 Jogar no state
    setGridItems(tempGrid)

    // 3° Começar o jogo
    setJogoRolando(true)
  }


  function itemClick(index: number){
    if(jogoRolando && index !== null && cartasExibindo < 2){
      let tempGrid = [...gridItems]

      if(tempGrid[index].viradoPermanente === false && tempGrid[index].virado === false){
        tempGrid[index].virado = true;
        setCartasExibindo(cartasExibindo + 1)
      }
      
      setGridItems(tempGrid)
    }
  }

  return(
    <C.Container>
      <C.Info> 
        <C.LogoLink href='#'> 
          <img src={logoImage} aria-hidden='true' alt="Logo" width='200'/>
        </C.LogoLink>

        <C.InfoArea> 
          <InfoItem titulo='Tempo' valor={formatarTempo(tempoJogo)}/>
          <InfoItem titulo='Movimentos' valor={movimentos.toString()}/>
        </C.InfoArea>

        <Button icone={restartImage} titulo='Reiniciar' onClick={reiniciarCriarJogo} />

      </C.Info>

      <C.GridArea>
        <C.Grid> 
          {gridItems.map((item, index) => (
            <GridItem 
              key={index}
              item={item}
              onClick={() => itemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>

    </C.Container>
  )
}

export default App;