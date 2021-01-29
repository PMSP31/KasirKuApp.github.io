import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from "axios"
import { API_URL } from "../Utils/Constants"

export default class Sukses extends Component {
//setelah klik button bayar maka bagian hasil kembali kosong dengan componentDidMount
    componentDidMount(){
        axios
      .get(API_URL + "keranjangs" )
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function(item){
            axios
            .delete(API_URL+"keranjangs/"+item.id)
            .then((res)=>
                console.log(res)
            )
            .catch((error)=>
                console.log(error)
            )
        })
      })
      .catch((error) => {
        console.log(error);
      });
    }

    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="images/sukses.png" width="500" />
                <h2>Pesanan Anda Sudah Masuk Ke Antrian</h2>
                <p>Terimakasih Sudah Memesan dan Silahkan Tunggu Pelayan Ke Meja Anda!</p>
                <Button variant="primary" as={Link} to="/bayar">
                    Bayar
                </Button>
            </div>
        )
    }
}
