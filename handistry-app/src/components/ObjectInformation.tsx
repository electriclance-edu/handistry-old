import React, { useState } from 'react';
import '../styles/style.css';

function ObjectInformation() {
    const [data, setData] = useState({
        title:"Water"
    });

    return (
        <div className="ObjectInformation styleGlassBox">
            <h2>{data.title}</h2>
            <p>{}</p>
        </div>
    );
}

export default ObjectInformation;