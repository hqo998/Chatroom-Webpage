interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({children, ...rest}: ButtonProps) {
  return (
    <button
      {...rest}
      className="bg-cyan-600 hover:bg-cyan-500 py-5 px-6 rounded-2xl w-fit justify-center items-center cursor-pointer"
    >
      {children}
    </button>
  );
}