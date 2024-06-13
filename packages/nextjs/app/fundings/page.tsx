const page = ({}) => {
  return (
    <div className="flex items-center justify-center" style={{ height: "calc(100vh - 32px)" }}>
      <div className="bg-background rounded-xl border border-border p-8 flex flex-col items-center gap-2">
        <i className="fa-regular fa-triangle-exclamation text-4xl text-yellow-500"></i>
        <span>Page under development.</span>
      </div>
    </div>
  );
};

export default page;
