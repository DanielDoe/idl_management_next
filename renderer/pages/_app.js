import React, { useState } from "react";
import { Button, notification, Icon, message } from "antd";
import App, { Container } from "next/app";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);

    this.state = {
      status: null,
    };

    // this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
  }

  componentDidMount() {
    const key = `open${Date.now()}`;
    // if (typeof window == "undefined") {
    window.addEventListener("offline", function(e) {
      console.log("offline");
      // openNotificationWithIcon(true);
      const btn = (
        <Button
          type="primary"
          size="small"
          onClick={() => notification.close(key)}
        >
          Close
        </Button>
      );

      notification.open({
        message: "Network Status",
        className: "notification",
        // style: { top: '2rem'},
        description:
          "Oops! we are having trouble with the connection... Please reconnect",
        duration: 3.5,
        icon: (
          <Icon type="warning" style={{ color: "red", fontSize: "1.5rem" }} />
        ),
        btn,
        key,
        onClose: notification.close(key),
      });
    });
    window.addEventListener("online", function(e) {
      console.log("online");
      // openNotificationWithIcon(false);
      notification.open({
        message: "Network Status",
        className: "notification",
        // style: { top: '2rem' },
        description: "Great! you have a working connection",
        duration: 3.5,
        icon: (
          <Icon
            type="global"
            style={{ color: "lightgreen", fontSize: "1.5rem" }}
          />
        ),
      });
    });
    // }
  }

  // openNotificationWithIcon = status => {
  //   const key = `open${Date.now()}`;

  //   if (status) {
  //   } else {
  //   }
  // };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default MyApp;
