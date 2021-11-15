// import React, { Component } from "react";
// import { connect } from "react-redux";
// import "./DetailHandBook.scss";
// import { FormattedMessage } from "react-intl";
// import HomeHeader from "../../HomePage/Header/HomeHeader";
// import Footer from "../../HomePage/Footer/Footer";
// import DoctorSchedule from "../Doctor/DoctorSchedule";
// import ProfileDoctor from "../Doctor/ProfileDoctor";
// import {
//   getDetailHandBookByID,
//   getALLCodeSerVice,
// } from "../../../services/userService";
// import _, { result } from "lodash";
// import { LANGUAGES } from "../../../utils";

// class DetailHandBook extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       arrDoctorID: [],
//       dataDetailHandBook: {},
//     };
//   }

//   async componentDidMount() {
//     if (
//       this.props.match &&
//       this.props.match.params &&
//       this.props.match.params.id
//     ) {
//       let id = this.props.match.params.id;

//       let res = await getDetailHandBookByID({
//         id: id,
//       });

//       if (res && res.data.errCode === 0) {
//         let data = res.data.data;
//         let arrDoctorID = [];
//         if (data && !_.isEmpty(res.data.data)) {
//           let arr = data.doctorSpecialty;
//           if (arr && arr.length > 0) {
//             arr.map((item) => {
//               arrDoctorID.push(item.doctorID);
//             });
//           }
//         }

//         this.setState({
//           dataDetailHandBook: res.data.data,
//           arrDoctorID: arrDoctorID,
//         });
//       }
//     }
//   }

//   async componentDidUpdate(preProps, prevState, snapshot) {
//     if (this.props.language !== preProps.language) {
//     }
//   }

//   render() {
//     let { arrDoctorID, dataDetailHandBook } = this.state;
//     let { language } = this.props;
//     console.log("check data detail state", this.state);
//     return (
//       <>
//         <HomeHeader />
//         <div className="DetailHandBook container">
//           <div className="description">
//             {dataDetailHandBook && !_.isEmpty(dataDetailHandBook) && (
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: dataDetailHandBook.descriptionHTML,
//                 }}
//               ></div>
//             )}
//           </div>

//           {arrDoctorID &&
//             arrDoctorID.length > 0 &&
//             arrDoctorID.map((item, index) => {
//               return (
//                 <div className="DetailHandBook-schedule" key={index}>
//                   <div className="infoOfDoctor">
//                     <h2 className="heading">
//                       <FormattedMessage id="page-detail-specialty.infoDoctor" />
//                     </h2>
//                     <ProfileDoctor doctorID={item} isShowLinkDetail={true} />
//                   </div>
//                   <div className="scheduleOfDoctor">
//                     <DoctorSchedule doctorIdFromParent={item} key={index} />
//                   </div>
//                 </div>
//               );
//             })}
//         </div>
//         <Footer />
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     language: state.app.language,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);

import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailHandBook.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import Footer from "../../HomePage/Footer/Footer";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailHandBookByID,
  getALLCodeSerVice,
} from "../../../services/userService";
import _, { result } from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorID: [],
      dataDetailHandBook: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailHandBookByID(id);
      console.log("check data detail hand book", res);
      if (res && res.data.errCode === 0) {
        // let data = res.data.data;
        // let arrDoctorID = [];
        // if (data && !_.isEmpty(res.data.data)) {
        //   let arr = data.doctorSpecialty;
        //   if (arr && arr.length > 0) {
        //     arr.map((item) => {
        //       arrDoctorID.push(item.doctorID);
        //     });
        //   }
        // }

        this.setState({
          dataDetailHandBook: res.data.data,
        });
      }
    }
  }

  async componentDidUpdate(preProps, prevState, snapshot) {
    if (this.props.language !== preProps.language) {
    }
  }

  render() {
    let { arrDoctorID, dataDetailHandBook } = this.state;
    let { language } = this.props;

    return (
      <>
        <HomeHeader />
        <div className="DetailHandBook container">
          <div className="description">
            {dataDetailHandBook && !_.isEmpty(dataDetailHandBook) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailHandBook.descriptionHTML,
                }}
              ></div>
            )}
          </div>

          {arrDoctorID &&
            arrDoctorID.length > 0 &&
            arrDoctorID.map((item, index) => {
              return (
                <div className="DetailHandBook-schedule" key={index}>
                  <div className="infoOfDoctor">
                    <h2 className="heading">
                      <FormattedMessage id="page-detail-specialty.infoDoctor" />
                    </h2>
                    <ProfileDoctor doctorID={item} isShowLinkDetail={true} />
                  </div>
                  <div className="scheduleOfDoctor">
                    <DoctorSchedule doctorIdFromParent={item} key={index} />
                  </div>
                </div>
              );
            })}
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);
