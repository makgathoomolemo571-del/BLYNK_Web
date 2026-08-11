import "./FileUpload.css";

export default function FileUpload({

  accept="*",

  multiple=false,

  onChange

}){

return(

<label className="file-upload">

<input

type="file"

accept={accept}

multiple={multiple}

onChange={onChange}

/>

<span>

Choose File

</span>

</label>

);

}