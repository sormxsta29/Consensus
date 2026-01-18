"use client"
import React from "react";

export default function Header() {
  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Workbench</h1>
        <div className="text-sm text-war-room-500">Contract Management</div>
      </div>
      <div className="flex items-center gap-4">
        <input placeholder="Search contracts..." className="border rounded px-3 py-1 text-sm" />
        <select className="border rounded px-2 py-1 text-sm">
          <option>Creator</option>
          <option>Reviewer</option>
          <option>Approver</option>
        </select>
      </div>
    </header>
  );
}
