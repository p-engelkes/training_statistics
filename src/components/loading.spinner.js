import * as React from "react";
import {CircularProgress} from "../../node_modules/material-ui/Progress/index";

export const LoadingSpinner = () =>
    <div className="row center-xs">
        <div className="col-sx-2">
            <CircularProgress size={50}/>
        </div>
    </div>;