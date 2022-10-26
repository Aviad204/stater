import "./parser.css";
import React, { useState, useContext } from "react";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import ReactLoading from "react-loading";
import TableDisplay from "../TableDisplay/TableDisplay";
import { AppContext } from "../../context/context";
import papaparse from "papaparse";
import { Form, Button, Card } from "react-bootstrap";
import { RadioGroup, Stack, useRadioGroup } from "@chakra-ui/react";
import RadioCard from "./RadioCard";
import { sleep } from "../../utils/utils";
import ChartDisplay from "../ChartDisplay/ChartDisplay";
import Court from "../Court/Court";
import CarouselHeader from "./CarouselHeader/CarouselHeader";
import { optionsForRadio } from "../../constants";

function CsvParser(props) {
  const {
    showModalTable,
    showModalGraph,
    showModalInsight,
    handleShowModalTable,
    setPlayersStats,
    handleShowModalInsight,
    handleShowModalGraph,
  } = useContext(AppContext);

  const [file, setFile] = useState();
  const [tableMode, setTableMode] = useState();

  // Handle steps proccess
  const [is1Done, setIs1Done] = useState(false);
  const [is2Done, setIs2Done] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleStepTwo = (event) => {
    setTableMode(event);
    setIs2Done(true);
  };

  const { getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (event) => handleStepTwo(event),
  });

  const onFileChange = async (event) => {
    event.preventDefault();
    setIsLoading((pre) => !pre);
    setFile(() => event.target.files[0]);

    // Sleep for handeling loading animation
    await sleep(2000);

    setIs1Done((pre) => !pre);
    setIsLoading((pre) => !pre);
  };

  const onSubmitTable = (event) => {
    event.preventDefault();
    papaparse.parse(file, {
      complete: function (results) {
        setPlayersStats(results.data);
      },
    });
    handleShowModalTable(event);
  };
  const onSubmitGraph = (event) => {
    event.preventDefault();
    papaparse.parse(file, {
      complete: function (results) {
        setPlayersStats(results.data);
      },
    });
    handleShowModalGraph(event);
  };
  const onSubmitInsight = (event) => {
    event.preventDefault();
    papaparse.parse(file, {
      complete: function (results) {
        setPlayersStats(results.data);
      },
    });
    handleShowModalInsight(event);
  };
  return (
    <div>
      <div className="carousel-wrapper">
        <CarouselHeader />
      </div>
      {isLoading && (
        <div className="d-flex w-100 align-items-center flex-column">
          <ReactLoading type="balls" color="green" height="30%" width="30%" />
        </div>
      )}
      {!isLoading && (
        <div className="bottom-page-wrapper">
          <div className="upload-process-wrapper">
            <div className="single-info-card">
              <Card className="actual-card-container">
                {!is1Done && (
                  <Card.Header className="card-header mt-2">
                    STEP #1 Load Your CSV
                  </Card.Header>
                )}
                {is1Done && (
                  <Card.Header className="card-header mt-2">
                    STEP #1 - We have your file!
                  </Card.Header>
                )}
                <Card.Body className="card-body-container d-flex flex-column align-items-center">
                  {!is1Done && (
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Control
                        type="file"
                        onChange={(e) => onFileChange(e)}
                      />
                    </Form.Group>
                  )}
                  {is1Done && <TiTick className="arrow-info-card" />}
                </Card.Body>
              </Card>
            </div>
            {is1Done && (
              <div>
                <BsFillArrowRightSquareFill className="arrow-info-card" />
              </div>
            )}
            {is1Done && (
              <div className="single-info-card">
                <Card className="actual-card-container">
                  <Card.Header className="card-header">
                    STEP #2 Choose filter and load!
                  </Card.Header>
                  <Card.Body className="card-body-container">
                    <RadioGroup
                      onChange={setTableMode}
                      value={tableMode}
                      className="w-100 align-items-center m-0 p-0"
                    >
                      <Stack direction="row" className="stack-prop">
                        {optionsForRadio.map((value) => {
                          const radio = getRadioProps({ value });
                          return (
                            <RadioCard key={value} {...radio}>
                              {value}
                            </RadioCard>
                          );
                        })}
                      </Stack>
                    </RadioGroup>
                  </Card.Body>
                </Card>
              </div>
            )}
            {is1Done && (
              <>
                <div>
                  <BsFillArrowRightSquareFill className="arrow-info-card" />
                </div>
                <div className="single-info-card">
                  <Card className="actual-card-container">
                    <Card.Header className="card-header">
                      STEP #3 Load Stats!
                    </Card.Header>
                    <Card.Body className="card-body-container">
                      {!is2Done && (
                        <div className="text-danger">
                          Please choose filter mode
                        </div>
                      )}
                      {is2Done && (
                        <>
                          {!showModalTable && (
                            <Button
                              disabled={!is2Done}
                              onClick={onSubmitTable}
                              variant="outline-success"
                            >
                              Load Table Stats
                            </Button>
                          )}
                          {showModalTable && (
                            <Button
                              disabled={!is2Done}
                              onClick={onSubmitTable}
                              className="text-success"
                              variant="outline-success"
                            >
                              LOADED
                            </Button>
                          )}
                          <Button
                            disabled={!is2Done}
                            onClick={onSubmitGraph}
                            className="mt-3"
                            variant="outline-success"
                          >
                            Load Graph Stats
                          </Button>

                          <Button
                            disabled={!is2Done}
                            variant="outline-success"
                            className="mt-3"
                            onClick={onSubmitInsight}
                          >
                            Load Smart Insights
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showModalTable && (
        <TableDisplay setTableMode={setTableMode} tableMode={tableMode} />
      )}
      {showModalGraph && <ChartDisplay />}
      {showModalInsight && <Court />}
    </div>
  );
}

export default CsvParser;
