import "./Dropdown.css";

export default function Dropdown({

options=[],

value,

onChange,

placeholder="Select"

}){

return(

<select
className="dropdown"
value={value}
onChange={(e)=>onChange(e.target.value)}
>

<option value="">

{placeholder}

</option>

{

options.map(option=>(

<option
key={option.value}
value={option.value}
>

{option.label}

</option>

))

}

</select>

);

}