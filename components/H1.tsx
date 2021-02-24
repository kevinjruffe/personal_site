import react, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function H1({ children }: Props) {
  return <h1 className="font-black text-3xl pt-8 pb-4">{children}</h1>;
}
