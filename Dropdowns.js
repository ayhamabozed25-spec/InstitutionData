import { useState } from "react";

export default function Dropdowns() {
  const [selectedMinistry, setSelectedMinistry] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const ministries = {
    "وزارة التربية": ["شعبة التعليم الأساسي", "شعبة التعليم الثانوي"],
    "وزارة الصحة": ["شعبة المستشفيات", "شعبة المراكز الصحية"],
  };

  return (
    <div>
      <select onChange={(e) => setSelectedMinistry(e.target.value)}>
        <option>اختر الوزارة</option>
        {Object.keys(ministries).map(m => <option key={m}>{m}</option>)}
      </select>

      {selectedMinistry && (
        <select onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option>اختر الشعبة</option>
          {ministries[selectedMinistry].map(d => <option key={d}>{d}</option>)}
        </select>
      )}
    </div>
  );
}
