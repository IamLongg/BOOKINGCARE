import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./HealthFaciality.scss";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";

class HealthFaciality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.data.errCode === 0) {
      this.setState({
        dataClinics: res.data.data ? res.data.data : [],
      });
    }
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };

  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    let { dataClinics } = this.state;
    return (
      <div className="HealthFaciality" id="healthFaciality">
        <div className="container">
          <div className="info">
            <div className="heading">
              {" "}
              <FormattedMessage id="healthyFacialty-home.title" />
            </div>
            <button className="more">
              {" "}
              <FormattedMessage id="healthyFacialty-home.more-info" />
            </button>
          </div>
          <div className="HealthFaciality-main">
            <Slider {...settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div
                      className="img-custom"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div className="box">
                        <div
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HealthFaciality)
);
