import React from "react";
import {Button, Card} from 'react-bootstrap';
import WatchlistComp from './watchListComp';
import { useNavigate } from "react-router-dom";
import "../register/loginPage.css"

const WatchlistPage = () => {

const navigate = useNavigate();

  return (
          <Card className="text-center"style={{ background: "rgb(50,58,69)", paddingBottom:"600px"}}>
            <Card.Header>
              <h2 style={{ color: "#14A44D" }}>Whole Watchlist</h2>
              <Button variant="outline-success" style={{color: "white"}} onClick={() => navigate("/addWatchlist")}>+</Button>
            </Card.Header>
            <Card.Body>
              <WatchlistComp showPercent={true}show={false}length="20"/>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
  );
};

export default WatchlistPage;