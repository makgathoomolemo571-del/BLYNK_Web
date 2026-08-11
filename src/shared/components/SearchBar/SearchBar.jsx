import "./SearchBar.css";

export default function SearchBar({

  value,

  onChange,

  placeholder="Search..."

}){

  return(

    <div className="search-bar">

      <input

        value={value}

        placeholder={placeholder}

        onChange={(e)=>

          onChange(e.target.value)

        }

      />

    </div>

  );

}