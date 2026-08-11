import { useMemo, useState } from "react";

export default function useSearch(
  items = [],
  fields = []
) {

  const [query, setQuery] = useState("");

  const results = useMemo(() => {

    if (!query.trim()) return items;

    return items.filter(item =>

      fields.some(field =>

        String(item[field] || "")
          .toLowerCase()
          .includes(query.toLowerCase())

      )

    );

  }, [items, fields, query]);

  return {

    query,

    setQuery,

    results

  };

}