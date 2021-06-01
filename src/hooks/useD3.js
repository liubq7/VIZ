import React from 'react';
import * as d3 from 'd3';

export const useD3 = (renderNodesFn, dependencies) => {
    const ref = React.useRef();

    React.useEffect(() => {
      renderNodesFn(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}