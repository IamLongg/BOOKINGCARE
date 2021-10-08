import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.scss";
import "./HandBook.scss";

class HandBook extends Component {
  render() {
    return (
      <div className="HandBook">
        <div className="container">
          <div className="info">
            <div className="heading">cẩm nang</div>
            <button className="more">xem thêm</button>
          </div>
          <div className="HandBook-main">
            <div className="HandBook-main-box">
              <div className="image"></div>
              <div className="HandBook-main-box-detail">
                <h2>
                  10 thương tật thứ cấp thường gặp và các biện pháp dự phòng
                </h2>
                <p>
                  Thương tật thứ cấp là những di chứng để lại sau khi xảy ra của
                  một bệnh lý mà người bệnh mắc phải. Những thương tật này gây
                  ảnh hưởng nghiêm trọng đến sinh...
                </p>
                <div className="date-time">
                  <span>
                    <i className="far fa-clock"></i>08-10-2021
                  </span>
                  <span>
                    <i className="far fa-clock"></i>08-10-2021
                  </span>
                </div>
              </div>
            </div>

            <div className="HandBook-main-box">
              <div className="image"></div>
              <div className="HandBook-main-box-detail">
                <h2>
                  10 thương tật thứ cấp thường gặp và các biện pháp dự phòng
                </h2>
                <p>
                  Thương tật thứ cấp là những di chứng để lại sau khi xảy ra của
                  một bệnh lý mà người bệnh mắc phải. Những thương tật này gây
                  ảnh hưởng nghiêm trọng đến sinh...
                </p>
                <div className="date-time">
                  <span>
                    <i className="far fa-clock"></i>08-10-2021
                  </span>
                  <span>
                    <i className="far fa-clock"></i>08-10-2021
                  </span>
                </div>
              </div>
            </div>

            <div className="HandBook-main-box">
              <div className="image"></div>
              <div className="HandBook-main-box-detail">
                <h2>
                  10 thương tật thứ cấp thường gặp và các biện pháp dự phòng
                </h2>
                <p>
                  Thương tật thứ cấp là những di chứng để lại sau khi xảy ra của
                  một bệnh lý mà người bệnh mắc phải. Những thương tật này gây
                  ảnh hưởng nghiêm trọng đến sinh...
                </p>
                <div className="date-time">
                  <span>
                    <i className="far fa-clock"></i>08-10-2021
                  </span>
                  <span>
                    <i className="far fa-clock"></i>08-10-2021
                  </span>
                </div>
              </div>
            </div>

            <div className="HandBook-main-box">
              <div className="image"></div>
              <div className="HandBook-main-box-detail">
                <h2>
                  10 thương tật thứ cấp thường gặp và các biện pháp dự phòng
                </h2>
                <p>
                  Thương tật thứ cấp là những di chứng để lại sau khi xảy ra của
                  một bệnh lý mà người bệnh mắc phải. Những thương tật này gây
                  ảnh hưởng nghiêm trọng đến sinh...
                </p>
                <div className="date-time">
                  <span>
                    <i className="far fa-clock"></i>08-10-2021
                  </span>
                  <span>
                    <i className="far fa-clock"></i>08-10-2021
                  </span>
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
