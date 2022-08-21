import "./styles.css";
import { useEffect, useState } from "react";
import { SIZE_OPTIONS } from "../../constants";
import Dialog from "../dialog/Dialog";

const TableComponent = () => {
  const [usersData, setUsersData] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [open, setOpen] = useState(false);
  const [userInfoData, setUserInfoData] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          `https://hiring-api.simbuka.workers.dev?page=${page}&size=${size}`
        );
        const users = await response.json();
        setUsersData(users);
        console.log(users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [page, size]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleDetails = (id) => {
    const userInfo = usersData.find((user) => {
      return user.id === id;
    });
    setUserInfoData(userInfo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <table className="dataTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button
                    className="moreButton"
                    onClick={() => {
                      handleDetails(user.id);
                    }}
                  >
                    More information
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttonWrap">
        <button onClick={handlePrevious} className="buttonGreen">
          Previous
        </button>
        <button onClick={handleNext} className="buttonGreen">
          Next
        </button>
        <select onChange={handleSize} value={size} className="selectSize">
          {SIZE_OPTIONS.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
      </div>
      <Dialog
        userInfoData={userInfoData}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
export default TableComponent;
