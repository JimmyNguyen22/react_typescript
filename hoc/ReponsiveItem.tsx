import React, { useState } from "react";

type Props = {
  Component: React.FC;
  ComponentMobile: React.FC | undefined;
};

type Screen = {
  width: number;
  height: number;
};

export const ReponsiveItem = ({
  Component,
  ComponentMobile,
}: Props): JSX.Element => {
  const [screen, setScreen] = useState<Screen>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  if (screen.width < 768 && ComponentMobile) {
    Component = ComponentMobile;
  }
  return (
    <>
      <Component></Component>
    </>
  );
};
