import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { generalDefensiveRate, playerFakeData } from "../../constants";

function Stats() {
  const [defensiveRate, setDefensiveRate] = useState();
  const [centerBalance, setCenterBalance] = useState();
  const [playerCloseToGoaly, setPlayerCloseToGoaly] = useState();
  useEffect(() => {
    const populateData = () => {
      // Defense rate
      const numberOfPlayersInDef = playerFakeData.filter(
        ({ Xaxis }) => Xaxis > 50
      ).length;
      let rate = numberOfPlayersInDef / playerFakeData.length;
      setDefensiveRate(Math.round(rate * 100));

      // Center balance
      const center = playerFakeData.filter(({ Yaxis }) => Yaxis > 32).length;
      //Check how many players were positioned on the left
      let centerRate = center / playerFakeData.length;
      setCenterBalance(Math.round(centerRate * 100));

      // How close to the enemy goaly
      let closest = playerFakeData.sort(
        (a, b) => parseInt(b.Xaxis) - parseInt(a.Xaxis)
      )[playerFakeData.length - 1];
      console.log(closest);
      setPlayerCloseToGoaly(closest);
    };
    populateData();

    return populateData;
  }, []);

  return (
    <div className=" d-flex flex-column align-items-center w-75 justify-content-center">
      <div className="mb-3">
        <Text fontSize="3xl">So how well did you play?</Text>
      </div>
      <div className="d-flex flex-row">
        {defensiveRate > generalDefensiveRate + 10 && (
          <Card>
            <Card.Header>Defensive Rate - {defensiveRate}%</Card.Header>
            <Card.Body>
              <Card.Title className="text-danger">
                Attention Required
              </Card.Title>
              <Card.Text>
                This rate is pretty high compare to teams on your league.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {defensiveRate < generalDefensiveRate + 10 &&
          defensiveRate > generalDefensiveRate - 10 && (
            <Card>
              <Card.Header>Defensive Rate - {defensiveRate}%</Card.Header>
              <Card.Body>
                <Card.Title className="text-success">Good job!</Card.Title>
                <Card.Text>This rate is pretty common </Card.Text>
              </Card.Body>
            </Card>
          )}
        {defensiveRate < generalDefensiveRate - 10 && (
          <Card>
            <Card.Header>Defensive Rate - {defensiveRate}%</Card.Header>
            <Card.Body>
              <Card.Title className="text-danger">
                Attention Required
              </Card.Title>
              <Card.Text>
                this rate is pretty low. Consider more defensive approach{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {centerBalance < 40 && (
          <Card>
            <Card.Header>Defensive Rate</Card.Header>
            <Card.Body>
              <Card.Title className="text-danger">
                Attention Required
              </Card.Title>
              <Card.Text>
                Most of your players were on the right side on the field with
                only {centerBalance}% presents on the LEFT.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {centerBalance > 60 && (
          <Card>
            <Card.Header>Defensive Rate</Card.Header>
            <Card.Body>
              <Card.Title className="text-danger">
                Attention Required
              </Card.Title>
              <Card.Text>
                Most of your players were on the left side on the field with
                only {100 - centerBalance}% presents on the RIGHT.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
        {centerBalance > 40 && centerBalance < 60 && (
          <Card>
            <Card.Header>Defensive Rate</Card.Header>
            <Card.Body>
              <Card.Title className="text-success">Good job!</Card.Title>
              <Card.Text>Your team has a great center balance.</Card.Text>
            </Card.Body>
          </Card>
        )}
        {playerCloseToGoaly && (
          <Card>
            <Card.Header>Distance from enemy goaly</Card.Header>
            <Card.Body>
              <Card.Title>{playerCloseToGoaly.Xaxis}m distance</Card.Title>
              <Card.Text>
                {playerCloseToGoaly.playerName} was the closest player to the
                enemy goaly.
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Stats;
