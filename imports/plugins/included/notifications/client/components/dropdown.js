import { Meteor } from "meteor/meteor";
import React, { Component, PropTypes } from "react";
import moment from "moment";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.noNotification = this.noNotification.bind(this);
    this.markAsRead = this.markAsRead.bind(this);
  }

  noNotification() {
    if (this.props.list.length < 1) {
      return (<li className="notification">
        <div className="media">
          <div className="media-body ">
            <center className="notification-title">No notification</center>
          </div>
        </div>
      </li>);
    }
  }

  markAsRead(notificationId) {
    Meteor.call('markAsRead', notificationId);
  }

  deleteNotification(notificationId) {
    Meteor.call('deleteNotification', notificationId);
  }

  render() {
    const { label, list} = this.props;
    let noNotify = this.noNotification();

    return (<div>
      <ul className="dropdown-notify notifications">
        {noNotify}
        {list.map((notify) => {
          return (<li className="notification" data="{notify._id}" onClick={this.markAsRead.bind(this, notify._id)} key={list.indexOf(notify)} >
            <div className="dismiss-notification" onClick={this.deleteNotification.bind(this, notify._id)}>
              <i className="fa  fa-close"></i></div>
            <a href={notify.url}>
              <div className="media">
                <div className="media-body">
                  <strong className="notification-title">{notify.title}</strong>

                  <div className="notification-meta">
                    <small className="timestamp">{moment(notify.time).fromNow()}</small>
                  </div>
                </div>
              </div>
            </a>

          </li>);
        })}
      </ul>
    </div>);
  }

}

Dropdown.propTypes = {
  label: PropTypes.string,
  list: PropTypes.array
};

export default Dropdown;
