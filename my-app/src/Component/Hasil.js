import React, { Component } from "react";
import { Row, Col, ListGroup, Badge ,Card} from "react-bootstrap";
import { numberWithCommas } from "../Utils/Utils";
import TotalBayar from "./TotalBayar";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import swal from "sweetalert";
import {API_URL} from "../Utils/Constants"

export default class Hasil extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetail: false,
      jumlah: 0,
      keterangan: "",
      totalHarga: 0,
    };
  }
//mengoper ke ModalKeranjang.js lalu untuk mengeluarkan modal jika diklik
  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetail: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totalHarga: menuKeranjang.total_harga,
    });
  };
//mengoper ke ModalKeranjang.js lalu untuk close modal jika klik hapus pesanan atau simpan edit pesanan
  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };
//mengoper ke ModalKeranjang.js lalu untuk tambah banyak makanan di ikon plus
  tambah = (jumlah) => {
    this.setState({
      jumlah: this.state.jumlah + 1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah + 1)
    });
  };
//mengoper ke ModalKeranjang.js lalu untuk hapus banyak makanan di ikon minus
  kurang = (jumlah) => {
    if (jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah - 1,
        totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah - 1)
      });
    }
  };
//mensubmit keterangan di modal 
  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value,
    });
  };
//mensubmit edit ke database berupa const data dan component hasil
  handleSubmit = (event) => {
    event.preventDefault();

    this.handleClose();

    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan: this.state.keranjangDetail.keterangan
    };

    axios
      .put(API_URL + "keranjangs/"+this.state.keranjangDetail.id, data)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Update Pesanan",
          text: "Update Pesanan Anda " + data.product.nama + " Sudah TerUpdate " ,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };
//menghapus pesanan dari database berupa id dan list hasil
  hapusPesanan = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "keranjangs/"+id)
      .then((res) => {
        this.props.getListKeranjang();
        swal({
          title: "Hapus Pesanan",
          text: "Pesanan Anda " + this.state.keranjangDetail.product.nama + " Telah Dihapus " ,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  };

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} className="mt-3" > 
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
          <Card className="overflow-auto hasil">
              <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
              >
                <Row>
                  <Col xs="2">
                    <h4>
                      <Badge pill variant="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithCommas(menuKeranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang
              handleClose={this.handleClose}
              {...this.state}
              tambah={this.tambah}
              kurang={this.kurang}
              changeHandler={this.changeHandler}
              handleSubmit={this.handleSubmit}
              hapusPesanan={this.hapusPesanan}
            />
          </ListGroup>
          </Card>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
