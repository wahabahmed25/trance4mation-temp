"use client";

import React, { useEffect, useState } from "react";
import { getUserCount } from "@/lib/api/getUserCount";
const TotalUser = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const total = await getUserCount();
      setCount(total);
    }
    fetchCount();
  }, []);

  return (
    <div className="text-xl font-bold">
      Total Users: {count ?? "Loading..."}
    </div>
  );
};

export default TotalUser;
