import React, { useState } from "react";
import { type UserPayload } from "@src/models";
import {
  IconClients,
  IconMail,
  IconLock,
  IconRole,
  IconEye,
  IconEyeSlash,
} from "@src/components/icons/index";
import { CustomSelect } from "@src/components/customSelect";

interface AddUserFormProps {
  loading: boolean;
  onSubmit: (payload: UserPayload) => Promise<void>;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({
  loading,
  onSubmit,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const roleOptions = [
    { value: "staf", label: "Staf" },
    { value: "admin", label: "Admin" },
  ];
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      full_name: fullName,
      email,
      password,
      role: selectedRole.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IconClients />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-10 pr-3 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
              placeholder="Contoh: Budi Setiawan"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IconMail />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-10 pr-3 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
              placeholder="contoh@email.com"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IconLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-10 pr-10 py-2.5 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition" // <-- pr-10 biar ada space buat ikon
              placeholder="Minimal 8 karakter"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition"
            >
              {showPassword ? (
                <IconEye className="w-5 h-5" />
              ) : (
                <IconEyeSlash className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="md:col-span-2">
          <CustomSelect
            label="Role"
            options={roleOptions}
            selected={selectedRole}
            onChange={setSelectedRole}
            leadingIcon={<IconRole className="w-5 h-5 text-slate-400" />}
          />
        </div>
      </div>

      <div className="mt-8 border-t pt-6 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Menyimpan..." : "Simpan User"}
        </button>
      </div>
    </form>
  );
};
