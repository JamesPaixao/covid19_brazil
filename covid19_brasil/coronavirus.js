"use strict";

let DB = [
    {
        "uf": "Brasil",
        "suspeitos": "<div class='spinner orange'></div>",
        "confirmados": "<div class='spinner green'></div>",
        "mortes": "<div class='spinner blue'></div>"
    }
];

const show_data = ( data ) => {
    const panel = `
        <div class='estado'>${ data.uf }</div>
        <div class='card suspeitos'>
            <div class="numeros">${ data.suspeitos }</div>
            <div class="titulo">SUSPEITOS</div>
        </div>
        <div class='card confirmados'>
            <div class="numeros">${ data.confirmados }</div>
            <div class="titulo">CONFIRMADOS</div>
        </div>
        <div class='card mortes'>
            <div class="numeros">${ data.mortes }</div>
            <div class="titulo">MORTES</div>
        </div>
    `;
    const $container = document.createElement ( 'div' );
    $container.innerHTML = panel;
    const $info = document.getElementById( 'info' );
    $info.removeChild ( $info.firstChild );
    $info.appendChild ( $container );
}

const get_corona_brazil = async () => {
    const url = 'https://covid19-brazil-api.now.sh/api/report/v1/brazil';
    const get_api = await fetch ( url );
    const json = await get_api.json();
    const brazil = await {
        "uf": "Brasil",
        "suspeitos": json.data.cases,
        "confirmados": json.data.confirmed,
        "mortes": json.data.deaths
    }
    show_data ( brazil );
}

const get_corona_state = async ( estado ) => {
    const url = 'https://covid19-brazil-api.now.sh/api/report/v1';
    const get_api = await fetch ( url );
    const json = await get_api.json();
    DB = await json.data;
}

const find_state = ( event ) => {
    const uf_map = event.target.parentNode.id;
    const get_state = DB.find ( state => state.uf.match ( uf_map ) );
    const state = {
        "uf": get_state.state,
        "suspeitos": get_state.suspects,
        "confirmados": get_state.cases,
        "mortes": get_state.deaths
    }

    show_data( state );
}

document.querySelector( 'svg' ).addEventListener( 'click', find_state );

show_data ( DB[0] );
get_corona_state();
get_corona_brazil();