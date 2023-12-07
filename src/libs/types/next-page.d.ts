import { NextPage } from "next";
import React from "react";

export type CustomNextPage = NextPage & {
  title: string;
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
