import React from 'react'
import DniLista from './DniLista'
import Container from '@material-ui/core/Container'
import {useState} from 'react';
import DialogOpiekunZ from './DialogOpiekunZ';

function OpiekunZ() {



    const Dzienniczek =[
        {
            id:'1',
            title:'Dzień pierwszy',
            opis:'SzalonyMarek',
        },
        {
            id:'2',
            title:'Dzień drugi',
            opis:'WiktorKot',
        },
        {
            id:'3',
            title:'Dzień trzeci',
            opis:'DużyBob',
        },
        {
            id:'4',
            title:'Dzień trzeci',
            opis:'FranekOrangutan',
        },
        {
            id:'5',
            title:'Dzień trzeci',
            opis:'MichałWafel',
        },
        {
            id:'6',
            title:'Dzień trzeci',
            opis:'KazimierzWielki',
        },
        {
            id:'7',
            title:'Dzień trzeci',
            opis:'JarosławKaczyński',
        },
    ]
  return (
    <>
    <Container style={{paddingTop:'3rem',paddingBottom:'3rem'}}>
        <DniLista Dzienniczek={Dzienniczek}/>
    </Container>
    
    </>
  )
}

export default OpiekunZ