import Button from "../components/button"
import {
    smdAddress, 
    marketAddress,
    landAddress,
    landAbi,
    marketAbi 
} from "../components/contract"
import { useAccount, useConnect} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useBalance, 
        useContractRead, 
        useContractWrite, 
        usePrepareContractWrite } from 'wagmi'
import { useState } from "react"

export default function Main(){

    const { isConnected } = useAccount()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })
   

    return(
        <div className="main_master">
            <div className="main_logo">Square Land Market</div>
            <div className="main_navbar">
                <Button _type="button_standard"  _onClick={() => connect()} _text={isConnected?"connected!":"connect"}/>
                <Button _type="button_standard"  _text="about" _id="button_colorText"/>
            </div>
           {isConnected ? <Sub_main__connected /> : <Sub_main__not_connected />}
        </div>
    )
}

function Sub_main__not_connected() {
    return(
        <div className="main_sub">
        <div className="main_sub_mainPanel">
            <div className="main_sub_mainPanel_marketInfo"></div>
            <div className="main_sub_mainPanel_map"></div>
        </div>
        <div className="main_sub_buttonPanel">
            <span>connected:</span><span id="address"></span>
            <br></br>
            smd balance: 0
        </div>
        <div className="main_sub_askSDM"></div>
        <div className="main_sub_footer"></div>
    </div>
    )
}


function Sub_main__connected() {
    const { address } = useAccount()
    const balance = useBalance({
        address: address,
        token: smdAddress,
        cacheTime: 2_000
      })
    const _balance = balance.data.formatted



    
    const [clicked, setClicked] = useState({
        isClicked: false,
        x: 0,
        y: 0,
    })  

    let squares = [];
    for(let i = 1; i <= 12; i++){
        for(let j = 1; j <= 8; j++){
            let _style = {
                gridColumn: i,
                gridRow: j,
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: 'rgb(211, 25, 0)',
                
                height: '55px',
                width: '55px'
            };
        
            squares.push(
                <div className = "map_main__square" 
                key={i.toString() + j.toString()}
                style={_style}
                onClick={()=>{
                    setClicked({
                        isClicked: true,
                        x: i, 
                        y: j
                });
                }}> 
                </div>
            )    
        }
    }

    return(
        <div className="main_sub">
        <div className="main_sub_mainPanel">
            <div className="main_sub_mainPanel_marketInfo">

                {clicked.isClicked? 
                <LandInfoPanel x = {clicked.x} y = {clicked.y}/> 
                // make here exit button
                : 
                <></>}

            </div>
            <div className="main_sub_mainPanel_map">
                <div id="map_mainText">Buy Square Land on Ethereum blockchain with SMD</div>
                <div className="map_main">
                    {squares}
                </div>
                <div className="map_infoText">Click on the sqare to see detail info.</div>
            </div>
        </div>
        <div className="main_sub_buttonPanel">
            <span>connected:</span><span id="address">{address}</span>
            <br></br>
                smd balance: {_balance}
            <div className="buttonPanel_buttons">
                {/* <Button _type="button_standard"  _onClick={ ()=> write() } _text="buy" _id="button_colorText"/> */}
                <Test />
                <Button _type="button_standard"  _text="set price" _id="button_colorText"/>
                <Button _type="button_standard"  _text="put on/off sale" _id="button_colorText"/>
            </div>
        </div>
        <div className="main_sub_askSDM"></div>
        <div className="main_sub_footer"></div>
    </div>
    )
}

function LandInfoPanel(props){
    const x = props.x
    const y = props.y


    const owner = useContractRead({
      address: landAddress,
      abi: landAbi,
      functionName: 'ownerOf',
      args: [y-1, x-1],
    }).data

    return(
        <div className="marketInfo_landInfo">
            <div className="landInfo__coordinates">
                <span className="coordinates_box">x: {x}</span>
                <span className="coordinates_box">y: {y}</span>
            </div>
            <div className="landInfo__purchaseInfo"></div>
            <div className="landInfo__owner">{owner}</div>
        </div>
    )
}

function Test(){

    const { config } = usePrepareContractWrite({
        address: landAddress,
        abi: landAbi,
        functionName: '_approve',
        args: [marketAddress,1,1],
      })

    const { write } = useContractWrite(config)

    return(
        <Button _type="button_standard"  _onClick={()=>write()} _text="buy"/>
    )
    //
}