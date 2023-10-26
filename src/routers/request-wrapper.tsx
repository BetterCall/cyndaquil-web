import React from "react";
import { useSearchParams } from "react-router-dom";

export const RequestWrapper = ({ component: Children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // force rerender()
  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  React.useEffect(() => {
    forceUpdate();
  }, [searchParams]);

  return <Children searchParams={searchParams} />;
};
