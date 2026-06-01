import React from "react";

interface MyComponentProps {
  title: string;
  myComponent?: () => void;
}

const MyComponent = ({ title }: MyComponentProps) => {
  return <h1>{title}</h1>;
};

export default MyComponent;

// const MyComponent = ({ title })=> {
//   return <h1>{title}</h1>;
// };

// export default MyComponent;
