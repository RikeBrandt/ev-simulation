import { FC, ReactNode } from "react";
import CloseIcon from "../../assets/close.svg?react";
import { Headline } from "./Headline";

type DrawerProps = {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const Drawer: FC<DrawerProps> = ({ children, open, setOpen }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="bg-zinc-900 p-5 hidden md:flex flex-col gap-4">
        <Headline />
        {children}
      </aside>

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-zinc-900 p-5 z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button onClick={() => setOpen(false)} className="pb-4">
          <CloseIcon />
        </button>
        {children}
      </aside>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50  z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};
