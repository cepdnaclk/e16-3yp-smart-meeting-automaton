import React, { useState, useEffect } from "react";
import { useTable, useFilters } from "react-table";
import { lecRoomData } from "../data";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddDeviceModal from "../../layout/AddDeviceModal";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const RoomsConfig = () => {
  const params = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [alldata, setData] = useState({ data: [], noofac: 0, noofprojec: 0 });
  const [selectd, setselectd] = useState("AC");
  // const [callback, setcallback] = useState(false);

  const callBackdev = () => {
    console.log("callbacking");
    getDevices();
  };
  const { data, noofac, noofprojec } = alldata;
  // const [user, setUser] = useState({
  //   workerId: "",
  //   password: "",
  // });
  const getDevices = async () => {
    const res = await axios.post("/main/get/roomCompData/", {
      roomName: params.roomName,
    });
    console.log(res.data);
    const acs = res.data.ac;
    const prs = res.data.proj;

    acs.map((ac) => {
      ac.category = "AC";
    });
    prs.map((pr) => {
      pr.category = "PROJECTOR";
    });
    setData({
      data: [...res.data.ac, ...res.data.proj],
      noofac: res.data.ac.length,
      noofprojec: res.data.proj.length,
    });
    console.log(res.data);
    setLoadingData(false);

    console.log("no of ac useefect");
    console.log(noofac, noofprojec);
  };

  useEffect(() => {
    //   if (params._id) {
    console.log("USEEFFECT");
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
        accessor: "compId",
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
  console.log("no of ac bottom");
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

  // const [nextid, setnextid] = useState(`AC0${noofac + 1}`);
  function onChange(event) {
    const value = event.target.value;
    setselectd(value);
    //  setnextid(`${value}0${selectd === "AC" ? noofac + 1 : noofprojec + 1}`);

    // setSelected(nodes.find((node) => node.id === value));
  }

  console.log("NExt compId");
  // console.log(nextid);
  console.log("NExt compId");
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
        <AddDeviceModal
          roomName2={params.roomName}
          callBack={callBackdev}
          cato={selectd}
          _id={params._id}
          nextcompId={`${selectd}0${
            selectd === "AC" ? noofac + 1 : noofprojec + 1
          }`}
        />
        {/* <button className="button-reserve">Add</button> */}
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
