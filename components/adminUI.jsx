"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./searchBar";
import UserTable from "./userTable";
import Pagination from "./pagination";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useButton } from "@/hooks/useButton";

const AdminUI = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const { toggleModal, user } = useButton();

  useEffect(() => {
    // Fetch data from API
    axios
      .get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data); // Initially, set filtered users to all users
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  useEffect(() => {
    // Fetch data from API
    users.map((alluser) => {
      if (alluser.id === user.id) {
        alluser.name = user.name;
        alluser.email = user.email;
        alluser.role = user.role;
      }
    });
    setUsers(users);
  }, [user]);
  if (users.length === 0) {
    console.log("No users found");
  }
  // Logic for filtering based on search query
  const handleSearch = (query) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  // Functions for delete and edit actions
  const handleRowSelect = (id) => {
    const newSelectedRows = [...selectedRows];
    const index = newSelectedRows.indexOf(id);
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(id);
    }
    setSelectedRows(newSelectedRows);
  };
  const handleDeleteSelected = () => {
    const updatedUsers = filteredUsers.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
  };
  const handleSelectAll = (ids) => {
    setSelectedRows(ids);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]); // Clear selected rows after deletion
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);

    user.id = userToEdit.id;
    user.name = userToEdit.name;
    user.email = userToEdit.email;
    user.role = userToEdit.role;

    toggleModal();
  };

  return (
    <div className="container mx-auto md:mt-6 md:mb-0 mb-8 mt-2">
      <div className="flex justify-between md:flex-row flex-col">
        <SearchBar onSearch={handleSearch} />
        <Button
          variant={"destructive"}
          className="text-white px-4 py-2 rounded md:w-[14%] w-[98%] md:m-0 mb-2"
          onClick={handleDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          <span>Delete Selected</span>
          <Trash className=" mb-1 ml-2" size={16} />
        </Button>
      </div>
      <UserTable
        users={filteredUsers.slice(indexOfFirstUser, indexOfLastUser)}
        onRowSelect={handleRowSelect}
        selectedRows={selectedRows}
        onSelectAll={handleSelectAll}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <div className="flex justify-between  text-slate-400 text-sm md:flex-row flex-col">
        <div className="mt-5">
          <p>{`${selectedRows.length} of ${filteredUsers.length} row(s) selected`}</p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={paginate}
          goToFirstPage={goToFirstPage}
          goToLastPage={goToLastPage}
        />
      </div>
    </div>
  );
};

export default AdminUI;
