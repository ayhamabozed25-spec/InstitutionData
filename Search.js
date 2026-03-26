import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

export default function Search() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "plans"));
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "plans", id));
    setData(data.filter(item => item.id !== id));
  };

  const handleUpdate = async (id) => {
    const newManager = prompt("أدخل اسم المدير الجديد:");
    if (newManager) {
      await updateDoc(doc(db, "plans", id), { manager: newManager });
      setData(data.map(item => item.id === id ? { ...item, manager: newManager } : item));
    }
  };

  return (
    <div>
      <h2>نتائج البحث</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.institution} - {item.manager}
            <button onClick={() => handleUpdate(item.id)}>تعديل</button>
            <button onClick={() => handleDelete(item.id)}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
