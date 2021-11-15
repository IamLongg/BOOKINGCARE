import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./HandBook.scss";
import { getAllHandBook } from "../../../services/userService";
import { withRouter } from "react-router";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandBook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandBook();
    if (res && res.data.errCode === 0) {
      this.setState({
        dataHandBook: res.data.data ? res.data.data : [],
      });
    }
  }

  handleViewDetailHandBook = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-handbook/${item.id}`);
    }
  };

  render() {
    let { dataHandBook } = this.state;
    console.log("check state", this.state);
    return (
      <div className="HandBook" id="handbook">
        <div className="container">
          <div className="info">
            <div className="heading">
              <FormattedMessage id="handbook-home.title" />
            </div>
            <button className="more">
              <FormattedMessage id="handbook-home.more-info" />
            </button>
          </div>
          <div className="HandBook-main">
            {dataHandBook &&
              dataHandBook.length > 0 &&
              dataHandBook.map((item, index) => {
                return (
                  <div
                    className="HandBook-main-box"
                    key={index}
                    onClick={() => this.handleViewDetailHandBook(item)}
                  >
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                    <div className="HandBook-main-box-detail">
                      <h2>{item.name}</h2>
                      <p>{item.info}</p>
                      {/* <div className="date-time">
                        <span>
                          <i className="far fa-clock"></i>
                          {item.updatedAt}
                        </span>
                        <span>
                          <i className="far fa-clock"></i>08-10-2021
                        </span>
                      </div> */}
                    </div>
                  </div>
                );
              })}
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
