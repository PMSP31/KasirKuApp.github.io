import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { numberWithCommas } from "../Utils/Utils";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_URL } from "../Utils/Constants";

export default class TotalBayar extends Component {
  //pengiriman dari hasil ke pesanan database
  //memanggil semua props dari home.js dan hasil.js dengan{...this.props}
  submitTotalBayar = (totalbayar) => {
    const pesanan = {
      total_bayar: totalbayar,
      menus: this.props.keranjangs,
    };
    //supaya bisa pindah ke halaman sukses
    axios.post(API_URL + "pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses");
    });
  };

  render() {
    //reduce supaya bisa menambah semua harga ke total bayar
    const totalbayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <>
        {/*web*/}
        <div className="fixed-bottom d-none d-md-block">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-3">
              <h4>
                Total Bayar :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalbayar)}
                </strong>
              </h4>
              <Button
                variant="primary"
                block
                className="mb-2 mt-4 mr-2"
                size="lg"
                onClick={() => this.submitTotalBayar(totalbayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <strong>Pesan</strong>
              </Button>
            </Col>
          </Row>
        </div>

        {/*mobile*/}

        <div className="d-sm-block d-md-none">
          <Row>
            <Col md={{ span: 3, offset: 9 }} className="px-3">
              <h4>
                Total Bayar :{" "}
                <strong className="float-right mr-2">
                  Rp. {numberWithCommas(totalbayar)}
                </strong>
              </h4>
              <Button
                variant="primary"
                block
                className="mb-2 mt-4 mr-2"
                size="lg"
                onClick={() => this.submitTotalBayar(totalbayar)}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <strong>Pesan</strong>
              </Button>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
