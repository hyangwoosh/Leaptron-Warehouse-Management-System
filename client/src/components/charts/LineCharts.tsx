import { Card, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import config from "../../config/config";
import useWindowSize from "../../hooks/useWindowSize";
import "../../styles/chart.scss";

const LineCharts = ({ title, dataKey, grid }) => {
  const [tloan, setTloan] = useState([]);
  const [rma, setRMA] = useState([]);
  const [date, setDate] = useState(new Date());
  const { viewportwidth } = useWindowSize();

  // Get Total Request Made from TLoan
  const getTloansRequest = async () => {
    const response = await axios.get(`${config.baseURL}/getTloanStats`);

    setTloan(response.data);
    console.log(tloan);
  };

  const getRMARequest = async () => {
    const response = await axios.get(`${config.baseURL}/getRMAStats`);
    setRMA(response.data);
    console.log(rma);
  };

  useEffect(() => {
    getRMARequest();
    getTloansRequest();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={viewportwidth < 1000 ? 12 : 6}>
        <Card sx={{ height: "100%", width: "98%", p: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <h4 style={{ textAlign: "left" }}>Current T-Loan Requests</h4>
            </Grid>
            <Grid item xs={12}>
              <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={tloan}>
                  <XAxis dataKey="Month" stroke="#5550bd" />
                  <YAxis />
                  <Line type="monotone" dataKey="Requests" stroke="#5550bd" />
                  <Tooltip />
                  {dataKey}
                  {grid && (
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12}>
              <h1 className="Date">Last Updated {date.toLocaleTimeString()}</h1>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={viewportwidth < 1000 ? 12 : 6}>
        <Card sx={{ height: "100%", width: "100%", p: 2 }}>
          <Grid container>
            <Grid item xs={12}>
              <h4 style={{ textAlign: "left" }}>Current RMA Requests</h4>
            </Grid>
            <Grid item xs={12}>
              <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={rma}>
                  <XAxis dataKey="Month" stroke="#5550bd" />
                  <YAxis />
                  <Line type="monotone" dataKey="Requests" stroke="#5550bd" />
                  <Tooltip />
                  {dataKey}
                  {grid && (
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12}>
              <h1 className="Date">Last Updated {date.toLocaleTimeString()}</h1>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LineCharts;
