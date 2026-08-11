// modules/search/components/SearchBar.jsx

import { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useSearch from "../hooks/useSearch";

const TYPES = [
  "all",
  "users",
  "creators",
  "businesses",
  "posts",
  "reels",
  "podcasts",
  "marketplace",
  "creatorHires",
  "businessFinds"
];

export default function SearchBar({

  defaultType = "all",

  placeholder = "Search BLYNK...",

  autoFocus = false,

  className = ""

}) {

  const navigate = useNavigate();

  const inputRef = useRef(null);

  const [query, setQuery] = useState("");

  const [type, setType] = useState(defaultType);

  const {

    search,

    loading

  } = useSearch();

  useEffect(() => {

    if (autoFocus && inputRef.current) {

      inputRef.current.focus();

    }

  }, [autoFocus]);

  const submit = async (e) => {

    e.preventDefault();

    const q = query.trim();

    if (!q) return;

    await search(q, type);

    navigate(

      `/search?q=${encodeURIComponent(q)}&type=${type}`

    );

  };

  const clear = () => {

    setQuery("");

    inputRef.current?.focus();

  };

  return (

    <form

      onSubmit={submit}

      className={`w-full flex items-center gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 ${className}`}

    >

      <FiSearch

        className="text-zinc-500 text-lg shrink-0"

      />

      <input

        ref={inputRef}

        value={query}

        onChange={(e) =>

          setQuery(e.target.value)

        }

        placeholder={placeholder}

        className="flex-1 bg-transparent outline-none text-sm text-zinc-900 dark:text-white"

      />

      <select

        value={type}

        onChange={(e) =>

          setType(e.target.value)

        }

        className="outline-none bg-transparent text-sm"

      >

        {TYPES.map((item) => (

          <option

            key={item}

            value={item}

          >

            {item}

          </option>

        ))}

      </select>

      {query.length > 0 && (

        <button

          type="button"

          onClick={clear}

          className="text-zinc-500"

        >

          <FiX />

        </button>

      )}

      <button

        type="submit"

        disabled={loading}

        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-lg px-5 py-2 transition"

      >

        {loading ? "Searching..." : "Search"}

      </button>

    </form>

  );

}