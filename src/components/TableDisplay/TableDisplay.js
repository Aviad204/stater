import "./table-display.css";

import { Button as AntdButton, Space, Table } from "antd";
import { AppContext } from "../../context/context";
import React, { useState, useRef, useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Input from "antd/lib/input/Input";
import {
  columnsGeneratorForPassing,
  columnsGeneratorForTouching,
  dataGeneratorForPassing,
  dataGeneratorForTouching,
} from "../../utils/utils";
import { Modal } from "react-bootstrap";

function TableDisplay(props) {
  const { playersStats } = useContext(AppContext);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          name={dataIndex}
          tabIndex="1"
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <AntdButton
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </AntdButton>
          <AntdButton
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </AntdButton>
          <AntdButton
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </AntdButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  return (
    <>
      {props.tableMode === "Touching" && playersStats && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Game Overall Statistics - Touching</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table
              dataSource={dataGeneratorForTouching(playersStats)}
              columns={columnsGeneratorForTouching(getColumnSearchProps)}
            />
          </Modal.Body>
        </>
      )}
      {props.tableMode === "Passing" && playersStats && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Game Overall Statistics - Passing</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table
              dataSource={dataGeneratorForPassing(playersStats)}
              columns={columnsGeneratorForPassing()}
            />
          </Modal.Body>
        </>
      )}
    </>
  );
}

export default TableDisplay;
