import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { NavbarWithMegaMenu } from "../components/Navbar";

const TABLE_HEAD = ["User Id", "Username", "First Name", "Last Name", "Email", "Phone Number", ""];

const Table = () => {
  const [tableData, setTableData] = useState();
  const [isEditing, setIsEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const newUserIdRef = useRef();
  const newUsernameRef = useRef();
  const newFirstNameRef = useRef();
  const newLastNameRef = useRef();
  const newEmailRef = useRef();
  const newPhoneRef = useRef();
  const userIdRef = useRef();
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/table");
        setTableData(response.data.user);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    const userId = newUserIdRef.current.value;
    const username = newUsernameRef.current.value;
    const firstName = newFirstNameRef.current.value;
    const lastName = newLastNameRef.current.value;
    const email = newEmailRef.current.value;
    const phone = newPhoneRef.current.value;
    try {
      await axios.post("http://localhost:3000/table", { userId, username, firstName, lastName, email, phone });
      window.location.reload();
    }
    catch (err) {
      console.log("Error:", err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/table/${id}`);
      window.location.reload();
    }
    catch (err) {
      console.log("Error:", err);
    }
  }

  const handleUpdate = async (id) => {
    const userId = userIdRef.current.value;
    const username = usernameRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    try {
      await axios.put(`http://localhost:3000/table/${id}`, { userId, username, firstName, lastName, email, phone });
      setIsEditing(false);
      window.location.reload();
    }
    catch (err) {
      console.log("Error:", err);
    }
  }

  const filteredRows = tableData?.filter((table) => {
    const values = Object.values(table).join(" ").toLowerCase();
    return values.includes(searchTerm.toLowerCase());
  });

  const handleEdit = async () => {
    try {
      console.log("called");
      setIsEditing(true);
    }
    catch (err) {
      console.log("Error:", err);
    }
  }

  return (
    <>
      <NavbarWithMegaMenu />
    <Card className="h-full w-full mt-5">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row mt-5">
          <div className="w-full md:w-72">
            <Input
              label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
            <tbody>
              {searchTerm && filteredRows.map((row, index) => (
                <>
                  <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {row.userId}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.username}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.firstName}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.lastName}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.email}
                        </Typography>
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {row.phone}
                        </Typography>
                      </div>
                  </td> 
                  </>
              ))}
            {tableData && !searchTerm && tableData.map(
              (data, index) => {
                const isLast = index === tableData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={data.userId}>
                    {isEditing ? (
                      <>
              <td className="p-4"><input defaultValue={data.userId} ref={userIdRef} type="number" placeholder="User Id" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input defaultValue={data.username} ref={usernameRef} type="text" placeholder="Username" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input defaultValue={data.firstName} ref={firstNameRef} type="text" placeholder="First Name" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input defaultValue={data.lastName} ref={lastNameRef} type="text" placeholder="Last Name" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input defaultValue={data.email} ref={emailRef} type="email" placeholder="Email" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input defaultValue={data.phone} ref={phoneRef} type="number" placeholder="Phone" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
                      </>
                    ) : (
                        <>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.userId}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data.username}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data.firstName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data.lastName}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data.email}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data.phone}
                        </Typography>
                      </div>
                          </td> 
                          </>
                    )}

                    <td className={classes}>
                      {isEditing ? (
                      <Tooltip content="Save User">
                          <IconButton onClick={()=>handleUpdate(data._id)} variant="text">
                            Save
                          </IconButton>
                      </Tooltip>
                      ): (
                      <Tooltip content="Edit User">
                            <IconButton onClick={handleEdit} variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>

                      )}
                      <Tooltip content="Delete User">
                        <IconButton onClick={()=>handleDelete(data._id)} variant="text">
                          <FaTrashAlt />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
            <tr className="p-4">
              <td className="p-4"><input ref={newUserIdRef} type="number" placeholder="User Id" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input ref={newUsernameRef} type="text" placeholder="Username" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input ref={newFirstNameRef} type="text" placeholder="First Name" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input ref={newLastNameRef} type="text" placeholder="Last Name" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input ref={newEmailRef} type="email" placeholder="Email" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><input ref={newPhoneRef} type="number" placeholder="Phone" style={{ border: "solid 1px black", borderRadius: "5px", padding: "5px" }} /></td>
              <td className="p-4"><Button onClick={handleAdd}>Add</Button></td>
            </tr>
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      </Card>
      </>
  );
}

export default Table;