import axios from "axios";
import { useState } from "react";

const Create = () => {

    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const module = {title};
        console.log(module);

        axios.post('http://localhost:4000/api/modules',module)
        .then((res)=>{console.log(res.data)})
        .catch();
    }

    return (
        <div>
            <h3>Create component!</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Add Module Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </div>
                <div>
                    <input type="submit" value="Add Module Data"></input>
                </div>
            </form>
        </div>
    );
}
export default Create;