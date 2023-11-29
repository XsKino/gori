"use client";
import React, { useState } from "react";
import Preset from "@/components/presets";
import Own from "@/components/own";
import Selection from "@/components/selection";

const Page = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  let componentToRender;
  switch (selectedComponent) {
    case "Preset":
      componentToRender = <Preset />;
      break;
    case "Own":
      componentToRender = <Own />;
      break;
    default:
      componentToRender = (
        <Selection setSelectedComponent={setSelectedComponent} />
      );
      break;
  }

  return <div>{componentToRender}</div>;
};

export default Page;
