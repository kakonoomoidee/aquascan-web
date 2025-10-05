import React from "react";
import { type User } from "@src/models/user";
import { RoleBadge, DropdownMenu } from "@src/components/index";
import { IconKebabMenu } from "@src/components/icons/index";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onDelete: (id: number, name: string) => void;
}

const UserTableRow: React.FC<{
  user: User;
  index: number;
  totalUsers: number;
  onDelete: (id: number, name: string) => void;
}> = ({ user, index, totalUsers, onDelete }) => {
  const isLastRow = index >= totalUsers - 2;

  return (
    <tr className="hover:bg-slate-50">
      <td className="px-6 py-4 text-slate-600">{index + 1}</td>
      <td className="px-6 py-4 font-medium text-slate-800">{user.full_name}</td>
      <td className="px-6 py-4 text-slate-600">{user.email}</td>
      <td className="px-6 py-4">
        <RoleBadge role={user.role} />
      </td>
      <td className="px-6 py-4 text-center">
        <DropdownMenu
          position={isLastRow ? "top" : "bottom"}
          trigger={
            <div className="p-2 rounded-full hover:bg-slate-200">
              <IconKebabMenu />
            </div>
          }
        >
          <a
            href="#"
            className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            Edit
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onDelete(user.id, user.full_name || "");
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
          >
            Delete
          </a>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onDelete,
}) => {
  if (loading) {
    return (
      <tr>
        <td colSpan={5} className="text-center py-10 text-slate-500">
          Loading...
        </td>
      </tr>
    );
  }

  if (users.length === 0) {
    return (
      <tr>
        <td colSpan={5} className="text-center py-10 text-slate-500">
          Tidak ada user ditemukan.
        </td>
      </tr>
    );
  }

  return (
    <>
      {users.map((user, i) => (
        <UserTableRow
          key={user.id}
          user={user}
          index={i}
          totalUsers={users.length}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};
