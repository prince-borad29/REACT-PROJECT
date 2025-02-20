import React from "react";

const Input = ({  type = "text" , ...props },ref) => {
    // {} નઈ દેવાના મગજ મારી થાય હે uper
    return (
        <div className="flex flex-col mb-4">
            <input
                ref={ref}
                type={type}
                className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               {...props}
            />
        </div>
    );
};

export default React.forwardRef(Input);