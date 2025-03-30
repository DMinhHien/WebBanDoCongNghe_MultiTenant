import React from 'react';

export default function ShopForm() {
  return (
    <div className="flex p-4">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Cập nhật thông tin cửa hàng</h1>
        <form className="space-y-4 w-full p-4 md:p-8 bg-white h-auto border border-gray-300 rounded-lg shadow-md bg-opacity-40">
          <div className="mb-4">
            <label className="block mb-2 text-gray-800 font-medium">Profile picture</label>
            <input type="file" className="w-full" />
          </div>
          <div>
            <label className="block mb-2 text-gray-800 font-medium">Tên cửa hàng</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-800 font-medium">Địa chỉ cửa hàng</label>
            <input
              type="text"
              className="px-4 py-2 border border-gray-300 w-full rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div>
            <button className="bg-black text-white px-6 py-2 rounded-md mt-6 hover:bg-gray-800 transition-colors duration-200 w-full md:w-auto">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
