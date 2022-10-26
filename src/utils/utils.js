import { fieldsNameForPassing, fieldsNameForTouching } from "../constants";

export const dataGeneratorForTouching = (playersStats) => {
  console.log(playersStats);
  // For 0-16
  const touchingStats = [];
  for (let i = 6; i < playersStats.length; i++) {
    let playerObject = {};
    for (let j = 0; j < 17; j++) {
      playerObject[fieldsNameForTouching[j]] = playersStats[i][j];
    }
    touchingStats.push(playerObject);
  }
  console.log(touchingStats);
  return touchingStats;
};

export const dataGeneratorForPassing = (playersStats) => {
  // For 17-27
  const passingStats = [];
  for (let i = 6; i < playersStats.length; i++) {
    let playerObject = {};
    for (let j = 17; j < 28; j++) {
      playerObject[fieldsNameForPassing[j - 17]] = playersStats[i][j];
    }

    // Handeling athlete name case.
    playerObject.Athlete = playersStats[i][0];

    passingStats.push(playerObject);
  }
  return passingStats;
};

export const columnsGeneratorForTouching = (getColumnSearchProps) => {
  const touchingColumns = [];

  // Define which columns to exclue from sorter
  const unSortable = new Set();
  unSortable.add(1);

  // Handeling athlete name alone for search
  touchingColumns.push({
    title: fieldsNameForTouching[0],
    dataIndex: fieldsNameForTouching[0],
    key: fieldsNameForTouching[0],
    ...getColumnSearchProps(fieldsNameForTouching[0]),
  });

  for (let i = 1; i < fieldsNameForTouching.length; i++) {
    if (unSortable.has(i)) {
      touchingColumns.push({
        title: fieldsNameForTouching[i],
        dataIndex: fieldsNameForTouching[i],
        key: fieldsNameForTouching[i],
        filters: [
          {
            text: fieldsNameForTouching[i],
            value: "X",
          },
          {
            text: "Not " + fieldsNameForTouching[i],
            value: "",
          },
        ],
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record[fieldsNameForTouching[i]] === value,
        width: "30%",
      });
    } else {
      touchingColumns.push({
        title: fieldsNameForTouching[i],
        dataIndex: fieldsNameForTouching[i],
        key: fieldsNameForTouching[i],
        sorter: (a, b) =>
          a[fieldsNameForTouching[i]] - b[fieldsNameForTouching[i]],
      });
    }
  }
  return touchingColumns;
};

export const columnsGeneratorForPassing = () => {
  // For 17-27
  const passingColumns = [];

  // Handeling athlete name case.
  passingColumns.push({
    title: "Athlete",
    dataIndex: "Athlete",
  });

  for (let i = 0; i < fieldsNameForPassing.length; i++) {
    passingColumns.push({
      title: fieldsNameForPassing[i],
      dataIndex: fieldsNameForPassing[i],
    });
  }
  return passingColumns;
};

export const getAvg = (dataSet) => {
  let data = dataSet.map((value) => {
    if (value.includes("-")) {
      return value.split("-")[1];
    } else return value;
  });
  const sum = data.reduce((a, b) => parseInt(a) + parseInt(b), 0);
  const average = sum / data.length;
  return average;
};

export const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

