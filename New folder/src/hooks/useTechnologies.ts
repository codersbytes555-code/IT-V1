import { useState, useEffect } from "react";
import { getTechnologies } from "../services/techService";

export const useTechnologies = (limit: number = 10, page: number = 1) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<any>(null);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      const response = await getTechnologies(limit, page);
      setData(response.data);
      setMeta(response.meta);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch technologies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, [limit, page]);

  return { data, loading, error, meta, refresh: fetchTechnologies };
};
