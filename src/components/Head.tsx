import { useEffect } from "react";


interface IHeadProps {
  title: string;
}


export const Head = (props: IHeadProps) => {
  useEffect(() => {
    document.title = props.title;
  }, [props]);
  return <></>;
};

