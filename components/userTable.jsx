import { PenLine, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { TableSkeleton } from "./tableSkeleton";

const UserTable = ({
  users,
  onRowSelect,
  selectedRows,
  onSelectAll,
  onEdit,
  onDelete,
}) => {
  const [loading, setLoading] = useState(true);
  const handleCheckboxChange = (id) => {
    onRowSelect(id);
  };
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = users.map((user) => user.id);
      onSelectAll(allIds);
    } else {
      onSelectAll([]);
    }
  };
  useEffect(() => {
    if (users.length > 0) {
      setLoading(false);
    }
  }, [users]);

  if (loading) return <TableSkeleton row={[...Array(10)]} />;

  return (
    <>
      {!loading && (
        <Table className="w-full text-left border rounded-md">
          <TableHeader className="">
            <TableRow className=" text-black/70">
              <TableHead className=" font-medium">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === users.length}
                  className=""
                />
              </TableHead>

              <TableHead className="p-2 font-medium">Name</TableHead>
              <TableHead className="p-2 font-medium">Email</TableHead>
              <TableHead className="p-2 font-medium">Role</TableHead>
              <TableHead className="p-2 font-medium">Acions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className={`
          border font-medium text-black
          ${
            selectedRows.includes(user.id) ? "text-opacity-50 bg-gray-100" : ""
          }`}
              >
                <TableCell className="p-2">
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(user.id)}
                    checked={selectedRows.includes(user.id)}
                    className="ml-2"
                  />
                </TableCell>

                <TableCell className="p-2">{user.name}</TableCell>
                <TableCell className="p-2">{user.email}</TableCell>
                <TableCell className="p-2">{user.role}</TableCell>
                <TableCell className="p-2 py-2 flex">
                  <Button
                    key={user.id}
                    variant={"ghost"}
                    className="border hover:bg-gray-200 p-2 rounded-md mx-2"
                    onClick={() => onEdit(user.id)}
                  >
                    <PenLine className="md:inline-block" size={16} />
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="border hover:bg-gray-200 p-2 rounded-lg text-red-600"
                    onClick={() => onDelete(user.id)}
                  >
                    <Trash className="md:inline-block" size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default UserTable;
