export const DropDownButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`w-full p-1 px-3 rounded-sm first:rounded-t-lg last:rounded-b-lg text-left bg-background hover:bg-background-2 ${props.className}`}
    />
  );
};
