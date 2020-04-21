import React from "react";
import { GlobalProvider } from "./context/GlobalState";
import { Row, Col } from "shards-react";
import { Mbox } from "./components/Map/Map";
import { SideBar } from "./components/SideBar";
function App() {
  return (
    <GlobalProvider>
      <Row className="mx-0">
        <Col md="3" className="p-0 m-0 bg-white">
          <SideBar />
        </Col>
        <Col md="9" className="p-0 m-0">
          <Mbox />
        </Col>
      </Row>
    </GlobalProvider>
  );
}
export default App;
