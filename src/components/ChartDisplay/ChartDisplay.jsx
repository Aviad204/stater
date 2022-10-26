import { Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import React, { useState, useContext, useEffect, useCallback } from "react";
import ReactApexChart from "react-apexcharts";
import { Button, Modal } from "react-bootstrap";
import { fieldsNameForPassing, fieldsNameForTouching } from "../../constants";
import { AppContext } from "../../context/context";
import {
  dataGeneratorForPassing,
  dataGeneratorForTouching,
  getAvg,
} from "../../utils/utils";

function ChartDisplay(props) {
  const { showModalGraph, handleCloseModalGraph, playersStats } =
    useContext(AppContext);
  const [playersName, setPlayersName] = useState();
  const [options, setOptions] = useState();
  const [series, setSeries] = useState();
  const [graphMode, setGraphMode] = useState("Touching");
  const [currentSelection, setCurrentSelection] = useState(
    graphMode === "Touching" ? "Min" : "Total"
  );

  // Handeling unchartable fields
  const excludedFields = new Set();
  excludedFields.add("Athlete");
  excludedFields.add("Started");

  const handleSelectionChange = (event) => {
    setCurrentSelection(event.target.value);
  };

  const handleGraphModeChange = (event) => {
    setGraphMode(event);
    if (event === "Touching") setCurrentSelection("Min");
    if (event === "Passing") setCurrentSelection("Total");
  };

  const chartGenerator = useCallback(
    (nameArray) => {
      const dataSet = [];
      let playersData;
      if (graphMode === "Touching") {
        playersData = dataGeneratorForTouching(playersStats);
      }
      if (graphMode === "Passing") {
        playersData = dataGeneratorForPassing(playersStats);
      }
      playersData.forEach((player) => dataSet.push(player[currentSelection]));

      const avg = getAvg(dataSet);

      setSeries([
        {
          name: currentSelection,
          data: dataSet.map((value) => {
            if (value.includes("-")) {
              return value.split("-")[1];
            } else return value;
          }),
        },
      ]);
      setOptions({
        chart: {
          height: 350,
          type: "Column",
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"],
          },
        },
        annotations: {
          yaxis: [
            {
              y: avg,
              borderColor: "#00E396",
              label: {
                borderColor: "#00E396",
                style: {
                  color: "#fff",
                  background: "#00E396",
                },
                text: "Avg. of " + avg,
              },
            },
          ],
        },

        xaxis: {
          categories: nameArray,
          position: "bottom",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: "gradient",
              gradient: {
                colorFrom: "#D8E3F0",
                colorTo: "#BED1E6",
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          show: true,
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "#78909C",
            width: 6,
            offsetX: 0,
            offsetY: 0,
          },
        },
        title: {
          text: currentSelection
            ? `Presenting information for ${currentSelection}`
            : `Please choose a field from the list`,
          floating: true,
          offsetY: 330,
          align: "center",
          style: {
            color: "#444",
          },
        },
      });
    }, [currentSelection, graphMode, playersStats]
  );

  const getPlayersName = useCallback(
    (playersStats) => {
      let nameArray = [];
      const playersData = dataGeneratorForTouching(playersStats);
      playersData.forEach((player) => nameArray.push(player.Athlete));

      chartGenerator(nameArray);
      setPlayersName(nameArray);
    },
    [chartGenerator]
  );

  useEffect(() => {
    const unsub = () => {
      if (playersStats) getPlayersName(playersStats);
    };
    unsub();
    return unsub();
  }, [playersStats, currentSelection, graphMode, chartGenerator, getPlayersName]);

  return (
    <Modal
      show={showModalGraph}
      fullscreen={true}
      onHide={(e) => handleCloseModalGraph(e)}
    >
      {playersName && (
        <div id="chart" className="m-5">
          <RadioGroup
            onChange={handleGraphModeChange}
            value={graphMode}
            className="d-flex justify-content-center align-items-center mb-5"
          >
            <Stack direction="row">
              <Radio value="Touching">Touching</Radio>
              <Radio value="Passing">Passing</Radio>
            </Stack>
          </RadioGroup>
          {graphMode === "Touching" && (
            <Select
              className="mb-3"
              onChange={handleSelectionChange}
              value={currentSelection}
            >
              {fieldsNameForTouching.map((value) => {
                if (!excludedFields.has(value)) {
                  return <option value={value}>{value}</option>;
                }
                return null;
              })}
            </Select>
          )}
          {graphMode === "Passing" && (
            <Select
              className="mb-3"
              onChange={handleSelectionChange}
              value={currentSelection}
            >
              {fieldsNameForPassing.map((value) => {
                if (!excludedFields.has(value)) {
                  return <option value={value}>{value}</option>;
                } else return null;
              })}
            </Select>
          )}
          {playersName && (
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
            />
          )}
        </div>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={(e) => handleCloseModalGraph(e)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChartDisplay;
