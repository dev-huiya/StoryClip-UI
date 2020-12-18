import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";

import query from "api";

const animationOptions = {
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
}

function Page() {

    return (
        <React.Fragment>
            <div className="">
                main page
            </div>
        </React.Fragment>
    );
}

export default Page;
