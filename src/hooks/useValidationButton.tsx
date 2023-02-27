import React, { useLayoutEffect, useState } from "react";
export const useValidationButton = (
  validationList: boolean[],
  returnWhenTrue: string,
  returnWhenFalse: string
) => {
  const [result, setResult] = useState("disabled");
  useLayoutEffect(() => {
    setResult(
      validationList.includes(false) ? returnWhenFalse : returnWhenTrue
    );
  }, validationList);

  return { result };
};
