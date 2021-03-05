import React, { useState, useEffect } from "react";
import { useTable, useFilters } from "react-table";
import { lecRoomData } from "../data";
import { useParams } from "react-router-dom";
import axios from "axios";

const RoomsConfig = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [noofac, setnoofac] = useState(0);
  const [noofprojec, setnoofprojec] = useState(0);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    //   if (params._id) {
    const getDevices = async () => {
      const res = await axios.get(`/main/room/${params._id}`, {
        //  headers: { Authorization: token },
      });
      // setData([
      //   {
      //     componentId: "AC01",
      //     category: "Air Conditioner",
      //     brand: "Hitachi",
      //     model: "HT02",
      //   },
      //   {
      //     componentId: "PR01",
      //     category: "Projector",
      //     brand: "Panasonic",
      //     model: "P58418278790810",
      //   },
      //   {
      //     componentId: "AC02",
      //     category: "Air Conditioner",
      //     brand: "Sony",
      //     model: "SAC4530",
      //   },
      //   {
      //     componentId: "PR02",
      //     category: "Projector",
      //     brand: "Hitachi",
      //     model: "P5002",
      //   },
      // ]);
      setData([...res.data.ac, ...res.data.projector]);
      console.log(res.data);
      setLoadingData(false);
      setnoofac(res.data.ac.length);
      setnoofprojec(res.data.projector.length);
    };
    if (loadingData) getDevices();

    //setCallback(false);
    //  } else {
    //  console.log("wrong");
    //     setOnEdit(false);
    //     setCustomer(initialState);
    // }
  }, []);

  // const data = React.useMemo(
  //   () => [
  //     {
  //       componentId: "AC01",
  //       category: "Air Conditioner",
  //       brand: "Hitachi",
  //       model: "HT02",
  //     },
  //     {
  //       componentId: "PR01",
  //       category: "Projector",
  //       brand: "Panasonic",
  //       model: "P58418278790810",
  //     },
  //     {
  //       componentId: "AC02",
  //       category: "Air Conditioner",
  //       brand: "Sony",
  //       model: "SAC4530",
  //     },
  //     {
  //       componentId: "PR02",
  //       category: "Projector",
  //       brand: "Hitachi",
  //       model: "P5002",
  //     },
  //   ],
  //   []
  // );

  const columns = React.useMemo(
    () => [
      {
        Header: "Component ID",
        accessor: "componentId",
      },
      {
        Header: "Category",
        accessor: "category",
      },

      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Model",
        accessor: "model",
      },
    ],

    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: TextFilter,
    }),
    []
  );
  console.log(noofac, noofprojec);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data, defaultColumn }, useFilters);

  // const [lecRooms, setLecRooms] = useState(lecRoomData);

  function TextFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }

  const [selectd, setselectd] = useState("AC");
  function onChange(event) {
    const value = event.target.value;
    setselectd(value);

    // setSelected(nodes.find((node) => node.id === value));
  }

  console.log("czczxczxcz");
  console.log("czczxczxcz" + selectd);
  return (
    <>
      <div className="title-room">
        <h2>Device Configuration</h2>
        <h3>{params.roomName}</h3>
      </div>

      <section className="div-room-config">
        <div>
          <label className="lbl" htmlFor="devices">
            Add device:
          </label>

          <select
            onChange={onChange}
            className="list-dropdown"
            name="devices"
            id="devices"
          >
            <option value="AC">Air Conditioner</option>
            <option value="PR">Projector</option>
          </select>
        </div>
        <button className="button-reserve">Add</button>
      </section>

      <div className="config-devices-table-div">
        <table className="table-devices" {...getTableProps()}>
          <thead className="table-device-header">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="table-device-header-data"
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="table-device-data"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RoomsConfig;
