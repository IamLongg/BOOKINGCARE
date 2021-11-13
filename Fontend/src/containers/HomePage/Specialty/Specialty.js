import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./Specialty.scss";
import { getAllSpecialty } from "../../../services/userService";
import specialtyImg from "../../../assets/specialty/xuongkhopchau.png";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    console.log("check res", res);
    if (res && res.data.errCode === 0) {
      this.setState({
        dataSpecialty: res.data.data ? res.data.data : [],
      });
    }
  }

  render() {
    let settings = this.props.settings;
    let { dataSpecialty } = this.state;
    return (
      <div className="Specialty">
        <div className="container">
          <div className="info">
            <div className="heading">
              <FormattedMessage id="specialty-home.title" />
            </div>
            <button className="more">
              <FormattedMessage id="specialty-home.more-info" />
            </button>
          </div>
          <div className="Specialty-main">
            <Slider {...settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div className="img-custom" key={index}>
                      <div className="box">
                        <img
                          src={specialtyImg}
                          className="image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                        <h3 className="title">{item.name}</h3>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
