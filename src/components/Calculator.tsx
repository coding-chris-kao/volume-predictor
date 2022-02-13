import { Col, InputNumber, message, Row } from "antd";
import "./Calculator.css";
import React, { useEffect, useState } from "react";
import { getLatestTimeFactor } from "../ts/utils";

export default function Calculator() {
  const [predictedVol, setPredictedVol] = useState(0);
  const [currentTimeFactor, setCurrentTimeFactor] = useState(0);

  useEffect(() => {
    const currentTime = new Date();
    const timeFactor = getLatestTimeFactor(currentTime);
    if (!timeFactor) {
      message.error("Not the served time");
      return;
    }
    setCurrentTimeFactor(timeFactor);
  }, []);

  return (
    <>
      <Row justify="center">
        <Col>
          <InputNumber
            type="tel"
            min={0}
            defaultValue={0}
            size="large"
            onChange={(value) => {
              const tmp = value * currentTimeFactor;
              setPredictedVol(Math.round(tmp));
            }}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <div className="description">
            Current Time Factor: {currentTimeFactor}
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <div className="description"> Predicted Volume: </div>
          <div className="result-display">{predictedVol}</div>
        </Col>
      </Row>
    </>
  );
}
