import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@src/components/index";
import { useOcr } from "@src/hooks/index";
import { type Customer } from "@src/models/index";

const SearchUser: React.FC = () => {
  const navigate = useNavigate();
  const { searchCustomer, isSearching, searchError } = useOcr();
  const [nosbg, setNosbg] = useState("");
  const [foundCustomer, setFoundCustomer] = useState<Customer | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nosbg) return;
    try {
      const customer = await searchCustomer(nosbg);
      setFoundCustomer(customer);
    } catch (err) {
      setFoundCustomer(null);
      console.error(err);
    }
  };

  if (foundCustomer) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-bold text-slate-800">
              Pelanggan Ditemukan
            </h2>
            <div className="mt-4 text-left p-4 bg-slate-50 rounded-lg">
              <p>
                <span className="font-semibold">No. SBG:</span>{" "}
                {foundCustomer.nosbg}
              </p>
              <p>
                <span className="font-semibold">Nama:</span>{" "}
                {foundCustomer.nama}
              </p>
              <p>
                <span className="font-semibold">Alamat:</span>{" "}
                {foundCustomer.alamat}
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setFoundCustomer(null)}
                className="flex-1 py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition"
              >
                Cari Lagi
              </button>
              <button
                onClick={() =>
                  navigate(`/ocr-test/${foundCustomer.nosbg}`, {
                    state: { customer: foundCustomer },
                  })
                }
                className="flex-1 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition"
              >
                Mulai Baca Meteran
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSearch}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-center text-slate-800">
              Cari Pelanggan
            </h2>
            <p className="text-center text-slate-500 mt-2 mb-6">
              Masukkan No. Sambungan (SBG) pelanggan.
            </p>
            <input
              type="text"
              value={nosbg}
              onChange={(e) => setNosbg(e.target.value)}
              className="w-full text-center text-lg bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none transition"
              placeholder="21080000XXXX"
              required
            />
            {searchError && (
              <p className="text-red-500 text-center mt-2 text-sm">
                Pelanggan tidak ditemukan.
              </p>
            )}
            <button
              type="submit"
              disabled={isSearching}
              className="w-full mt-4 bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition disabled:opacity-50"
            >
              {isSearching ? "Mencari..." : "Cari"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SearchUser;
