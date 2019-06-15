import React, { useState } from "react";
import { Button, notification, Icon } from "antd";
import App, { Container } from "next/app";

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const openNotificationWithIcon = status => {
  //    const [visible, setvisible] = useState()
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Close
    </Button>
  );

  if (status) {
    notification.open({
      message: "Network Status",
      className: "notification",
      // style: { top: '2rem'},
      description:
        "Oop! we are having trouble with the connection... Please reconnect",
      duration: 0,
      icon: (
        <Icon type="warning" style={{ color: "red", fontSize: "1.5rem" }} />
      ),
      btn,
      key,
      onClose: close,
    });
  } else {
    notification.open({
      message: "Network Status",
      className:"notification",
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
  }
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    // if (typeof window == "undefined") {
    window.addEventListener("offline", function(e) {
      console.log("offline");
      openNotificationWithIcon(true);
    });
    window.addEventListener("online", function(e) {
      console.log("online");
      openNotificationWithIcon(false);
    });
    // }
  }

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
