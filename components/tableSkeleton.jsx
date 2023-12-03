"use client";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";

export const TableSkeleton = ({ row }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <Skeleton className="w-full h-12 my-2" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {row.map((i) => (
            <TableRow key={i}>
              <Skeleton className="w-full h-12 my-1 p-4" />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
