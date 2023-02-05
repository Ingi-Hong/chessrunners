import { ConfigProvider, Layout } from "antd";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import App from "next/app";
import "../styles/globals.css";
// import {get_openings, get_creators} from "../database/static-props"
const { Header, Sider, Content } = Layout;

export default function MyApp({ Component, pageProps, labelOpenings, labelCreators }) {
  const [creators, setCreators] = useState(labelCreators);
  const darkMode = {
    topbarBg: "#333652",
    sidebarBg: "#90adc6",
    secondaryColor: "#90adc6",
    topbarText: "white",
  };

  const lightMode = {
    topbarBg: "#90adc6",
    sidebarBg: "white",
    secondaryColor: "#74BDCB",
    topbarText: "black",
  };

  const [colorMode, setColorMode] = useState(lightMode);

  const [secondaryColor, setSecondaryColor] = useState(
    colorMode.secondaryColor
  );
  const [sidebarBg, setSidebarBg] = useState(colorMode.sidebarBg);
  const [topbarBg, setTopbarBg] = useState(colorMode.topbarBg);
  const [topbarText, setTopbarText] = useState(colorMode.topbarText);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: topbarBg,
        },
      }}
      style={{ margin: "0", padding: "0" }}
    >
      <Layout style={{ height: "100dvh", padding: "0", margin: "0" }}>
        <Header
          style={{ color: topbarText, margin: "0", backgroundColor: topbarBg }}
        >
          <Topbar />
        </Header>
        <Layout>
          <Sider>
            <Sidebar
              setCreators={setCreators}
              creators={creators}
              color={sidebarBg}
              setMax={setMax}
              setMin={setMin}
              min={min}
              max={max}
              creator_list={labelCreators}
              opening_list={labelOpenings}
            />
          </Sider>
          <Content>
            <Component {...pageProps} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async (context) => {
  let appProps = App.getInitialProps(context);

  if (context.ctx.req) {
    // Check if on the server-side
    // Dynamically import `node-fetch-cache` on the server-only
    const { get_openings, get_creators } = await import(
      "../database/static-props"
    );
    const labelOpenings = await get_openings();
    const labelCreators = await get_creators();
    return {
      ...appProps,
      labelOpenings: labelOpenings,
      labelCreators: labelCreators,
    };
  } else {
    // Handle client-side here
    var openings;
    var creators;
    fetch('/api/fetch_start_data')
    .then((res) => res.json())
    .then((data) => {
      labelOpenings = data.openings;
      labelCreators = data.creators;
    })

    return {
      ...appProps,
      poop: "poop",
    };
  }
};
