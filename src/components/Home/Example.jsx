import React, { useEffect, useState } from "react";

import Axios from "axios";
import UploadImages from "../Partial/UploadImages";

function Example() {
    const [url, setImageURL] = useState([]);

    const handleChange = (files) => {
        setImageURL(files);
    };

    return (
        <div className="App">
            <UploadImages url={url} handleChange={handleChange} />
        </div>
    );
}

export default Example;
