import styled from "styled-components";

export const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    width: 200px;
    height: 50px;
    background-color: #1550FF;
    border-radius: 10px;
    cursor: pointer;
    opacity: 1;
    transition: all ease .3s;

    &:hover{
        opacity: .6;
    }
`

export const Icone = styled.img`
    height: 25px;
`

export const Titulo = styled.div`
    color: white;
`